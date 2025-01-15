import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    // Base URL for the project
    base: '/',

    // Server configuration
    server: {
        // Port number for the development server
        port: 4000,

        // Enable or disable SSL/TLS encryption
        https: false,

        // Enable or disable CORS
        cors: true,
    },

    // Build configuration
    build: {
        // Output directory for the built project
        outDir: 'dist',

        // Enable or disable minification
        minify: true,

        // Enable or disable sourcemaps
        sourcemap: true,
    },

    // Plugin configuration
    plugins: [
        // Enable React plugin
        react(),
    ],

    // Define aliases for imports
    resolve: {
        alias: {
            // Alias for the src directory
            '@': './src',
        },
    },
})