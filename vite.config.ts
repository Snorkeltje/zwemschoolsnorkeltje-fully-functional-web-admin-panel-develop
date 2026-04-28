import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/// Resolves `figma:asset/<hash>.png` imports (left over from Figma export)
/// to actual files at `src/assets/<hash>.png`.
function figmaAssetResolver() {
  const PREFIX = 'figma:asset/';
  return {
    name: 'figma-asset-resolver',
    enforce: 'pre' as const,
    resolveId(source: string) {
      if (source.startsWith(PREFIX)) {
        const filename = source.slice(PREFIX.length);
        return path.resolve(__dirname, 'src/assets', filename);
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
