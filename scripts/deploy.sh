#!/bin/bash
# Deploy script: bouwt de Next.js static export en pusht naar gh-pages branch
# Gebruik: bash scripts/deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo "▶ Bouwen..."
rm -rf .next out
npm run build

echo "▶ Kopieren naar tijdelijke folder..."
TMP=$(mktemp -d)
cp -r out/. "$TMP/"
touch "$TMP/.nojekyll"

cd "$TMP"
git init -b main > /dev/null 2>&1
git checkout -b gh-pages > /dev/null 2>&1
git config user.name "Semdesnoo"
git config user.email "Semdesnoo@q4s.nl"
git add -A > /dev/null 2>&1
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" > /dev/null 2>&1

echo "▶ Pushen naar gh-pages..."
git remote add origin https://github.com/Semdesnoo/lkdakwerken.git 2>/dev/null || true
git push -u origin gh-pages --force

cd "$PROJECT_DIR"
rm -rf "$TMP"

echo "✓ Klaar. Live op https://semdesnoo.github.io/lkdakwerken/"
echo "  (Pages build duurt ~30 seconden)"
