/// xlsx (~800KB gzipped) is imported dynamically so it does NOT ship in the
/// initial bundle. It only downloads the first time an admin clicks an
/// "Exporteren" button, which shaves ~800KB gzipped off first-paint.
type XLSXNamespace = typeof import('xlsx');
let xlsxPromise: Promise<XLSXNamespace> | null = null;
async function loadXlsx(): Promise<XLSXNamespace> {
  if (!xlsxPromise) xlsxPromise = import('xlsx');
  return xlsxPromise;
}

export interface XlsxColumn<T> {
  header: string;
  /// Either a key on T or a function that derives the value from T.
  value: keyof T | ((row: T) => string | number | null | undefined);
  /// Optional column width in characters (default 18).
  width?: number;
}

export interface ExportOptions<T> {
  filename: string;
  sheetName?: string;
  columns: XlsxColumn<T>[];
  rows: T[];
  /// Optional title row shown above the headers (e.g. "Vast rooster — week 24").
  title?: string;
  /// Optional function returning a hex color (e.g. "#0365C4") for the row background.
  rowColor?: (row: T) => string | undefined;
}

const HEADER_FILL = 'FF0365C4';
const HEADER_FONT = 'FFFFFFFF';

function toRgb(hex?: string): string | undefined {
  if (!hex) return undefined;
  const h = hex.replace('#', '').toUpperCase();
  if (h.length === 6) return `FF${h}`;
  if (h.length === 8) return h;
  return undefined;
}

export async function exportToXlsx<T>(opts: ExportOptions<T>): Promise<void> {
  const XLSX = await loadXlsx();
  const { filename, sheetName = 'Sheet1', columns, rows, title, rowColor } = opts;

  // Build sheet data as array-of-arrays so we can position headers below an optional title.
  const aoa: (string | number | null)[][] = [];
  if (title) {
    aoa.push([title]);
    aoa.push([]);
  }
  aoa.push(columns.map(c => c.header));
  for (const r of rows) {
    aoa.push(columns.map(c => {
      const v = typeof c.value === 'function' ? c.value(r) : (r[c.value] as unknown);
      if (v === null || v === undefined) return '';
      if (typeof v === 'number') return v;
      return String(v);
    }));
  }

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const headerRowIdx = title ? 2 : 0;

  // Apply column widths
  ws['!cols'] = columns.map(c => ({ wch: c.width ?? 18 }));

  // Style header row
  for (let c = 0; c < columns.length; c++) {
    const addr = XLSX.utils.encode_cell({ r: headerRowIdx, c });
    if (!ws[addr]) continue;
    (ws[addr] as Record<string, unknown>).s = {
      font: { bold: true, color: { rgb: HEADER_FONT }, sz: 11 },
      fill: { fgColor: { rgb: HEADER_FILL } },
      alignment: { horizontal: 'left', vertical: 'center' },
      border: {
        bottom: { style: 'medium', color: { rgb: 'FF1A1A2E' } },
      },
    };
  }

  // Style title row
  if (title) {
    const addr = XLSX.utils.encode_cell({ r: 0, c: 0 });
    if (ws[addr]) {
      (ws[addr] as Record<string, unknown>).s = {
        font: { bold: true, sz: 14, color: { rgb: 'FF1A1A2E' } },
      };
    }
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } }];
  }

  // Apply per-row color (e.g. by location)
  if (rowColor) {
    for (let i = 0; i < rows.length; i++) {
      const rowFill = toRgb(rowColor(rows[i]));
      if (!rowFill) continue;
      for (let c = 0; c < columns.length; c++) {
        const addr = XLSX.utils.encode_cell({ r: headerRowIdx + 1 + i, c });
        if (!ws[addr]) continue;
        const tinted = `${rowFill.slice(0, 2)}${rowFill.slice(2)}`;
        const existingStyle = ((ws[addr] as Record<string, unknown>).s as Record<string, unknown> | undefined) ?? {};
        (ws[addr] as Record<string, unknown>).s = {
          ...existingStyle,
          fill: { fgColor: { rgb: tinted } },
          font: { color: { rgb: 'FF1A1A2E' }, sz: 10 },
        };
      }
    }
  }

  // Freeze header row
  ws['!freeze'] = { xSplit: 0, ySplit: headerRowIdx + 1 } as never;
  (ws as Record<string, unknown>)['!views'] = [{ state: 'frozen', ySplit: headerRowIdx + 1 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const safeName = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
  XLSX.writeFile(wb, safeName, { cellStyles: true, bookType: 'xlsx' });
}

/// Tint a hex color toward white for soft row backgrounds.
export function tintHex(hex: string, ratio = 0.85): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const tr = Math.round(r + (255 - r) * ratio);
  const tg = Math.round(g + (255 - g) * ratio);
  const tb = Math.round(b + (255 - b) * ratio);
  return `#${tr.toString(16).padStart(2, '0')}${tg.toString(16).padStart(2, '0')}${tb.toString(16).padStart(2, '0')}`.toUpperCase();
}
