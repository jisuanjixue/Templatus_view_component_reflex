import { defineConfig } from 'vite';
import { splitVendorChunkPlugin } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import FullReload from 'vite-plugin-full-reload';
import StimulusHMR from 'vite-plugin-stimulus-hmr';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    splitVendorChunkPlugin(),
    RubyPlugin(),
    StimulusHMR(),
    FullReload(['config/routes.rb', 'app/views/**/*', 'app/components/**/*']),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app/javascript/src', import.meta.url)),
    },
  },
  server: {
    hmr: {
      host: 'vite.templatus_view_component_reflex.test',
      usePolling: true,
      clientPort: 443,
    },
  },
});
