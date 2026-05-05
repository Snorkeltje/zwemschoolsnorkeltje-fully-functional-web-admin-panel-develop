#!/usr/bin/env node
// Walter 2026-05-05: static check for missing lucide-react imports.
// Vite/esbuild doesn't catch undefined JSX components — they crash at runtime
// (e.g. "ReferenceError: Wallet is not defined"). This script scans every
// `.tsx` file that imports from lucide-react and verifies every JSX/icon-prop
// reference is in the import block.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '..', 'src');

// Local React components / TS types / props that look capitalized but aren't
// from lucide. Add to this set when introducing new local component names.
const NOT_LUCIDE = new Set([
  'Card', 'PageHeader', 'StatCard', 'StatusBadge', 'DataTable', 'AdminLayout',
  'Toggle', 'CalendarView', 'RosterView', 'MessagesView', 'ReportsView',
  'SettingsView', 'ProfileView', 'AdminNotificationsList', 'CurriculumStepCard',
  'ReservationDetailView', 'AdvancedReservationForm', 'BarChart', 'Bar',
  'AreaChart', 'Area', 'PieChart', 'Pie', 'Cell', 'XAxis', 'YAxis',
  'CartesianGrid', 'Tooltip', 'ResponsiveContainer', 'Legend', 'ComposedChart',
  'LineChart', 'Line', 'Sparklines', 'SectionHeader', 'PhaseCircles',
  'BDiplomaPhaseTimeline', 'AdminView', 'Customer', 'Reservation', 'Icon', 'Ic',
  'SnorkeltjeLogo', 'RequireAdmin', 'InputField', 'FieldLabel', 'StepIndicator',
  'Row', 'DetailRow', 'SidebarContent', 'PageErrorBoundary', 'ErrorBoundary',
  'Outlet', 'Suspense', 'Toaster', 'Navigate', 'BrowserRouter', 'Route', 'Routes',
  'RouterProvider', 'AuthProvider', 'LanguageProvider',
  // TS DOM types
  'HTMLDivElement', 'HTMLInputElement', 'HTMLTextAreaElement', 'HTMLSelectElement',
  'HTMLFormElement', 'React',
]);

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile() && full.endsWith('.tsx')) yield full;
  }
}

let errorCount = 0;
let fileCount = 0;

for (const file of walk(SRC_DIR)) {
  // Skip legacy mock folders — not part of the live admin path:
  //  - "screens copy/": old backup of legacy Figma mocks
  //  - "screens/" (top-level, not under "screens/admin/"): legacy mobile mocks
  //  - "screens/website/": Walter's website mockups (not routed)
  if (file.includes('screens copy')) continue;
  const rel = path.relative(SRC_DIR, file);
  if (rel.startsWith('app/screens/website/')) continue;
  if (rel.startsWith('app/components/website/')) continue;
  // Top-level legacy mocks (anything in app/screens/* but NOT in app/screens/admin/)
  if (rel.startsWith('app/screens/') && !rel.startsWith('app/screens/admin/') &&
      rel !== 'app/screens/AdminLoginScreen.tsx' && rel !== 'app/screens/MobileInstallScreen.tsx') {
    continue;
  }

  const src = fs.readFileSync(file, 'utf8');
  if (!src.includes("from 'lucide-react'")) continue;
  fileCount++;

  // Collect imports
  const importMatch = src.match(/import\s*\{([^}]+)\}\s*from\s*'lucide-react'/s);
  const imported = new Set();
  if (importMatch) {
    for (const name of importMatch[1].split(/[,\n\s]+/)) {
      const n = name.trim();
      if (n && !n.startsWith('//')) imported.add(n);
    }
  }

  // Collect usages
  const used = new Set();
  // JSX element: <Name space|/|> but NOT <Name>( which is a TS generic call.
  // Simplest filter: skip when the closing > is immediately followed by (.
  for (const m of src.matchAll(/<([A-Z][A-Za-z0-9]+)([\s/>])/g)) {
    const closer = m[2];
    if (closer === '>') {
      // peek next char — if `(` it's TS generic like useState<X>(), not JSX
      const idx = m.index + m[0].length;
      if (src[idx] === '(') continue;
    }
    used.add(m[1]);
  }
  for (const m of src.matchAll(/icon:\s*([A-Z][A-Za-z0-9]+)/g)) used.add(m[1]);
  for (const m of src.matchAll(/icon\s*=\s*\{([A-Z][A-Za-z0-9]+)\}/g)) used.add(m[1]);

  // Filter to likely lucide refs — strip known non-lucide identifiers
  const filtered = [...used].filter(n => !NOT_LUCIDE.has(n));
  const missing = filtered.filter(n => !imported.has(n));

  if (missing.length) {
    const rel = path.relative(SRC_DIR, file);
    console.error(`✗ ${rel}: missing imports → ${missing.join(', ')}`);
    errorCount += missing.length;
  }
}

if (errorCount > 0) {
  console.error(`\n❌ ${errorCount} missing import${errorCount === 1 ? '' : 's'} across ${fileCount} files. Add them to the lucide-react import block.`);
  process.exit(1);
}

console.log(`✓ Checked ${fileCount} .tsx files — all lucide-react references are imported.`);
