import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Compacte verwijzing naar de subsidiepagina. Wordt hergebruikt op de
 * relevante dienstenpagina's en de offertepagina.
 */
export function SubsidieCTA({ className = '' }: { className?: string }) {
  return (
    <div className={`card p-6 ${className}`}>
      <p className="font-medium text-ink-900">Uw dak verduurzamen?</p>
      <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">
        Voor dakisolatie en andere verduurzamingsmaatregelen zijn mogelijk subsidies beschikbaar.
      </p>
      <Link
        href="/subsidies-verduurzaming"
        className="btn-link mt-4 text-sm"
      >
        Bekijk subsidies &amp; regelingen
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
