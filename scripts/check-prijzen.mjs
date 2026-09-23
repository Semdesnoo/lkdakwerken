/**
 * Controles op het prijsmodel in lib/prijzen.ts.
 * Draaien met: node --experimental-strip-types scripts/check-prijzen.mjs
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  berekenIndicatie,
  formatEuro,
  leesOppervlakte,
  tarieven,
} from '../lib/prijzen.ts';

test('oppervlakte lezen uit vrije invoer', () => {
  assert.equal(leesOppervlakte('120'), 120);
  assert.equal(leesOppervlakte('120 m²'), 120);
  assert.equal(leesOppervlakte('120m2'), 120);
  assert.equal(leesOppervlakte('1.200'), 1200, 'punt is een duizendtal');
  assert.equal(leesOppervlakte('85,5'), 85.5, 'komma is de decimaal');
  assert.equal(leesOppervlakte(''), null);
  assert.equal(leesOppervlakte('geen idee'), null);
  assert.equal(leesOppervlakte('0'), null);
  assert.equal(leesOppervlakte('-40'), null);
  assert.equal(leesOppervlakte('9000'), null, 'buiten het bereik van het model');
});

test('geen indicatie zonder bruikbare invoer', () => {
  assert.equal(berekenIndicatie('', '120'), null, 'zonder dienst geen indicatie');
  assert.equal(berekenIndicatie('bitumen-daken', ''), null, 'zonder m² geen indicatie');
  assert.equal(berekenIndicatie('onzin', '120'), null, 'onbekende dienst');
});

test('bitumen van 120 m² valt in de bandbreedte uit de FAQ', () => {
  const r = berekenIndicatie('bitumen-daken', '120');
  assert.ok(r);
  // 120 x 75 = 9000, 120 x 110 = 13200
  assert.equal(r.van, 9000);
  assert.equal(r.tot, 13200);
  assert.equal(r.minimumGehaald, false);
});

test('een klein dak wordt opgetrokken naar het minimumbedrag', () => {
  const r = berekenIndicatie('bitumen-daken', '5');
  assert.ok(r);
  assert.equal(r.minimumGehaald, true);
  assert.equal(r.van, tarieven['bitumen-daken'].minimum);
  assert.ok(r.tot > r.van, 'de bovengrens blijft boven de ondergrens');
});

test('ondergrens ligt nooit boven de bovengrens', () => {
  for (const dienst of Object.keys(tarieven)) {
    for (const m2 of ['1', '20', '120', '850', '4999']) {
      const r = berekenIndicatie(dienst, m2, ['isolatie', 'verwijderen']);
      assert.ok(r, `${dienst} bij ${m2} m² geeft een indicatie`);
      assert.ok(r.van <= r.tot, `${dienst} bij ${m2} m²: ${r.van} > ${r.tot}`);
      assert.ok(r.van > 0);
    }
  }
});

test('toeslagen verhogen het bedrag', () => {
  const kaal = berekenIndicatie('renovatie', '200');
  const metIsolatie = berekenIndicatie('renovatie', '200', ['isolatie']);
  const metBeide = berekenIndicatie('renovatie', '200', ['isolatie', 'verwijderen']);
  assert.ok(kaal && metIsolatie && metBeide);
  assert.ok(metIsolatie.van > kaal.van, 'isolatie maakt het duurder');
  assert.ok(metBeide.van > metIsolatie.van, 'twee toeslagen stapelen');
  assert.equal(metBeide.regels.length, 3, 'elke toeslag krijgt een eigen regel');
});

test('lekkage rekent per bezoek en negeert oppervlakte', () => {
  const zonder = berekenIndicatie('lekkage', '');
  const met = berekenIndicatie('lekkage', '450');
  assert.ok(zonder && met);
  assert.deepEqual(zonder, met, 'oppervlakte verandert een spoedbezoek niet');
  assert.equal(zonder.eenheid, 'per bezoek');
});

test('onderhoud is een jaarbedrag', () => {
  const r = berekenIndicatie('onderhoud', '300');
  assert.ok(r);
  assert.equal(r.eenheid, 'per jaar');
});

test('bedragen zijn afgerond op vijftigtallen', () => {
  for (const m2 of ['37', '113', '689']) {
    const r = berekenIndicatie('bitumen-daken', m2);
    assert.ok(r);
    assert.equal(r.van % 50, 0, `${r.van} is geen vijftigtal`);
    assert.equal(r.tot % 50, 0, `${r.tot} is geen vijftigtal`);
  }
});

test('elk voorbehoud past bij het soort dienst', () => {
  const perM2 = berekenIndicatie('renovatie', '120');
  const spoed = berekenIndicatie('lekkage', '');
  assert.ok(perM2 && spoed);
  assert.match(perM2.voorbehoud, /inspectie op locatie/);
  assert.match(spoed.voorbehoud, /ter plaatse/);
  assert.doesNotMatch(
    spoed.voorbehoud,
    /vergelijkbare daken/,
    'bij spoed is er geen dak opgemeten'
  );
  for (const dienst of Object.keys(tarieven)) {
    const r = berekenIndicatie(dienst, '120');
    assert.ok(r.voorbehoud.includes('btw'), `${dienst} noemt btw`);
  }
});

test('euro-opmaak is Nederlands', () => {
  assert.equal(formatEuro(9000), '€ 9.000');
  assert.equal(formatEuro(950), '€ 950');
});
