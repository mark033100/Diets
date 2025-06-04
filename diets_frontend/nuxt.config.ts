// https://nuxt.com/docs/api/configuration/nuxt-config
import Theme from '@primevue/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    modules: ['@primevue/nuxt-module', '@nuxtjs/tailwindcss', '@nuxt/icon', '@vueuse/nuxt', '@pinia/nuxt'],
    srcDir: 'src/',
    css: [
        '/assets/styles.scss',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    primevue: {
        options: {
            ripple: true,
            theme: {
                preset: Theme,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }
    },
    plugins: ['~/plugins/primevue.js'],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'DIETS 2.0'
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api'],
                },
            }
        }
    },
    runtimeConfig: {
        AUTH_API: process.env.AUTHENTICATION_API,
        BACKEND_API: process.env.BACKEND_API || 'http://127.0.0.1:8000',
        public: {
            AUTH_API: process.env.AUTHENTICATION_API || 'http://localhost:8003',
            BACKEND_API: process.env.BACKEND_API || 'http://127.0.0.1:8000',
        },
    }

})