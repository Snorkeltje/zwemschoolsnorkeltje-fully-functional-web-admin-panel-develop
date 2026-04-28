#!/usr/bin/env bash
# One-time Vercel deployment for the Snorkeltje admin panel.
# Usage: bash deploy-vercel.sh
#
# Steps:
#   1. Login to Vercel (browser opens)
#   2. Link the project (creates a new Vercel project on first run)
#   3. Set Supabase env vars
#   4. Deploy to production

set -euo pipefail

cd "$(dirname "$0")"

echo "🔐 Logging in to Vercel (browser opens)..."
vercel login

echo ""
echo "🔗 Linking project..."
vercel link --yes

echo ""
echo "🔑 Setting environment variables on Vercel..."
# Read from local .env so we don't bake secrets into the repo
SUPA_URL="$(grep '^VITE_SUPABASE_URL=' .env | cut -d= -f2-)"
SUPA_KEY="$(grep '^VITE_SUPABASE_ANON_KEY=' .env | cut -d= -f2-)"

# Set per environment (production + preview + development)
vercel env add VITE_SUPABASE_URL production <<<"$SUPA_URL" 2>/dev/null || true
vercel env add VITE_SUPABASE_URL preview    <<<"$SUPA_URL" 2>/dev/null || true
vercel env add VITE_SUPABASE_URL development <<<"$SUPA_URL" 2>/dev/null || true
vercel env add VITE_SUPABASE_ANON_KEY production <<<"$SUPA_KEY" 2>/dev/null || true
vercel env add VITE_SUPABASE_ANON_KEY preview    <<<"$SUPA_KEY" 2>/dev/null || true
vercel env add VITE_SUPABASE_ANON_KEY development <<<"$SUPA_KEY" 2>/dev/null || true

echo ""
echo "🚀 Deploying to production..."
vercel deploy --prod --yes

echo ""
echo "✅ Done! URL above is your production link to share with Walter."
