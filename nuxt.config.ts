/* eslint-disable nuxt/nuxt-config-keys-order */
import fs from "node:fs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(
    {
        modules: [
            "@nuxt/eslint",
            "@nuxthub/core",
            "nuxt-auth-utils",
            "nuxt-security",
            "@nuxtjs/seo",
            "nuxt-skew-protection",
            "@nuxtjs/sitemap",
            "@nuxtjs/robots",
            "@unlok-co/nuxt-stripe",
        ],
        stripe: {
            server: {
                key: process.env.STRIPE_SECRET_KEY || "",
                options: {},
            },
            client: {
                key: process.env.STRIPE_PUBLISHABLE_KEY || "",
                options: {},
            },
        },
        ssr: true,
        app: {
            head: {
                title: "For the Badge - Badges for badges sake",
                htmlAttrs: { lang: "en" },
                meta: [],
                link: [],
            },
        },
        prerender: false,
        // prerender: {
        //     crawlLinks: true,
        //     routes: [
        //         "/",
        //         "/sitemap.xml",
        //         "/robots.txt",
        //         "/company/about",
        //         "/company/contact",
        //         "/company/roadmap",
        //         "/legal/cookies",
        //         "/legal/gdpr",
        //         "/legal/privacy",
        //         "/legal/terms",
        //         "/viewer",
        //     ],
        //     ignore: ["/api", "/admin"],
        // },
        devtools: { enabled: true },
        debug: process.env.NODE_ENV === "development",
        css: ["~/assets/css/scroll-improvements.css"],

        runtimeConfig: {
            passwordPepper: process.env.PASSWORD_PEPPER,
            accountHmacSecret: process.env.ACCOUNT_HMAC_SECRET,
            badgeEncryptionKey: process.env.BADGE_ENCRYPTION_KEY,
            stripeSecretKey: process.env.STRIPE_SECRET_KEY,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            stripeProductId: process.env.STRIPE_PRODUCT_ID || "prod_V9ak0eT9rNimJa",
            cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
            cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID,
            public: {
                stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
            },
        },

        // Route-specific security rules and rendering modes
        routeRules: {
            ...(process.env.NODE_ENV === "development" ? { ["/__nuxt_devtools__/**"]: { security: false }, ["/_nuxt/**"]: { security: false } } : {}),

            // === RENDERING MODES ===
            ["/"]: { prerender: false },

            ["/admin"]: { ssr: true },

            ["/app"]: { ssr: false },
            ["/app/**"]: { ssr: false },

            ["/account"]: { ssr: false },
            ["/account/**"]: { ssr: false },

            ["/account-capture"]: { ssr: false },

            ["/viewer"]: { ssr: false },

            ["/homepage-success"]: { ssr: false },

            ["/company/**"]: { prerender: false },
            ["/legal/**"]: { prerender: false },
            ["/images/badges/**"]: {
                redirect: {
                    to: "/badges/**",
                    statusCode: 301,
                },
            },
            ["/api/_auth/**"]: { csurf: false },
            ["/api/feedback"]: { csurf: false },
            ["/api/homepage/webhook"]: { csurf: false },
            ["/api/homepage/visit"]: { csurf: false },
            ["/api/homepage/checkout"]: {
                security: {
                    xssValidator: false, // body contains SVG markup which trips the XSS validator
                },
            },
            ["/api/badges"]: {
                security: {
                    xssValidator: false,
                },
            },
            ["/api/account/generate"]: {
                security: {
                    rateLimiter: process.env.NODE_ENV === "development"
                        ? false
                        : {
                            tokensPerInterval: 3,
                            interval: 604800000, // 7 days (7 * 24 * 60 * 60 * 1000)
                            throwError: true,
                        },
                    requestSizeLimiter: {
                        maxRequestSizeInBytes: 1024, // Small requests only
                        throwError: true,
                    },
                },
            },

            // Strict rate limiting for PIN challenge endpoint (brute force protection)
            ["/api/account/login/challenge"]: {
                security: {
                    rateLimiter: process.env.NODE_ENV === "development"
                        ? false
                        : {
                            tokensPerInterval: 5,
                            interval: 900000, // 15 minutes - longer window for failed PIN attempts
                            throwError: true,
                        },
                },
            },
            // Account management endpoints (disabled in dev)
            ["/api/account/**"]: {
                security: {
                    rateLimiter: process.env.NODE_ENV === "development"
                        ? false
                        : {
                            tokensPerInterval: 30,
                            interval: 300000, // 5 minutes
                            throwError: true,
                        },
                },
            },
            // Developer awards submission - strict rate limiting
            ["/api/awards/submit"]: {
                security: {
                    rateLimiter: process.env.NODE_ENV === "development"
                        ? false
                        : {
                            tokensPerInterval: 3,
                            interval: 86400000, // 24 hours
                            throwError: true,
                        },
                },
            },
        },
        sourcemap: process.env.NODE_ENV === "development",
        compatibilityDate: "2025-07-15",
        nitro: {
            preset: "cloudflare-module",
            experimental: {
                wasm: true,
                openAPI: true,
            },
            cloudflare: {
                pages: {
                    routes: {
                        exclude: ["/api/*"],
                    },
                },
            },
            compatibilityFlags: ["nodejs_compat"],
        },
        hub:
        {
            database: true,
            kv: true,
        },
        vite: { server: { watch: { usePolling: true } } },
        devServer: {
            https: !(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem"))
                ? false
                : {
                    key: "./key.pem",
                    cert: "./cert.pem",
                },
            port: 3000,
            host: "localhost",
        },
        auth:
        {
            sessionMaxAge: 60 * 15, // 15 minutes
            sessionRefresh: 60 * 60 * 2, // 2 hours max refresh
        },
        eslint: {
            config: {
                stylistic: {
                    indent: 4,
                    semi: true,
                    quotes: "double",
                    jsx: false,
                    braceStyle: "allman",
                    arrowParens: true,
                    commaDangle: "only-multiline",
                    quoteProps: "consistent-as-needed",
                    blockSpacing: false,
                    severity: "warn",
                },
            },
        },
        security:
        {
            // Enhanced security mode - start with false, can enable later
            strict: false,

            // Comprehensive security headers
            headers:
            {
                crossOriginResourcePolicy: process.env.NODE_ENV === "development" ? false : "same-origin",
                crossOriginOpenerPolicy: process.env.NODE_ENV === "development" ? false : "same-origin",
                crossOriginEmbedderPolicy: process.env.NODE_ENV === "development" ? false : "credentialless",
                contentSecurityPolicy:
                {
                    ["base-uri"]: ["'none'"],
                    ["font-src"]: [
                        "'self'",
                        "https:",
                        "data:",
                    ],
                    ["form-action"]: ["'self'"],
                    ["frame-ancestors"]: ["'self'"],
                    ["img-src"]: [
                        "'self'",
                        "data:",
                        "blob:",
                        "https:",
                    ],
                    ["object-src"]: ["'none'"],
                    ["script-src-attr"]: ["'none'"],
                    ["style-src"]: [
                        "'self'",
                        "https:",
                        "'unsafe-inline'",
                    ],
                    ["script-src"]: [
                        "'self'",
                        "https:",
                        "'unsafe-inline'",
                        "'strict-dynamic'",
                        "'nonce-{{nonce}}'",
                    ],
                    ["upgrade-insecure-requests"]: true,
                    ["connect-src"]: process.env.NODE_ENV === "development"
                        ? [
                            "'self'",
                            "https:",
                            "wss:",
                            "ws://localhost:*",
                            "http://localhost:*",
                        ]
                        : [
                            "'self'",
                            "https:",
                            "wss:",
                        ],
                    ["media-src"]: [
                        "'self'",
                        "data:",
                        "blob:",
                    ],
                    ["worker-src"]: ["'self'", "blob:"], // For web workers
                },
                originAgentCluster: "?1",
                referrerPolicy: "strict-origin-when-cross-origin",
                strictTransportSecurity: {
                    maxAge: 31536000, // 1 year
                    includeSubdomains: true,
                    preload: true,
                },
                xContentTypeOptions: "nosniff",
                xDNSPrefetchControl: "off",
                xDownloadOptions: "noopen",
                xFrameOptions: "SAMEORIGIN",
                xPermittedCrossDomainPolicies: "none",
                xXSSProtection: "0",
                permissionsPolicy: {
                    camera: [],
                    ["display-capture"]: [],
                    fullscreen: [],
                    geolocation: [],
                    microphone: [],
                    payment: ["'self'"],
                    usb: [],
                    serial: [],
                    bluetooth: [],
                },
            },

            rateLimiter: process.env.NODE_ENV === "development"
                ? false
                : {
                    tokensPerInterval: 100,
                    interval: 300000, // 5 minutes
                    headers: true,
                    driver: {
                        name: "cloudflare-kv-binding",
                        options: {
                            binding: "KV",
                            base: "rate-limiter:",
                        },
                    },
                    throwError: true,
                    ipHeader: "cf-connecting-ip",
                },

            // Request size limiting for file uploads
            requestSizeLimiter: {
                maxRequestSizeInBytes: 10485760, // 10MB
                maxUploadFileRequestInBytes: 10485760, // 10MB
                throwError: true,
            },

            // XSS protection
            xssValidator: {
                throwError: true,
                methods: [
                    "POST",
                    "PUT",
                    "PATCH",
                ],
            },

            // CORS configuration
            corsHandler: {
                origin: process.env.NODE_ENV === "production"
                    ? ["https://forthebadge.com"]
                    : "*",
                methods: [
                    "GET",
                    "HEAD",
                    "PUT",
                    "PATCH",
                    "POST",
                    "DELETE",
                ],
                preflight: { statusCode: 204 },
                credentials: true,
            },

            // HTTP methods restriction
            allowedMethodsRestricter: {
                methods: [
                    "GET",
                    "HEAD",
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE",
                ],
                throwError: true,
            },

            // Hide server information
            hidePoweredBy: true,

            // Basic auth (disabled - using nuxt-auth-utils instead)
            basicAuth: false,

            // CSRF protection - enabled with proper token generation
            csrf: {
                enabled: true,
                methodsToProtect: [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE",
                ],
                cookie: {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                },
                excludedUrls: ["/api/feedback"],
            },

            nonce: true,

            removeLoggers: process.env.NODE_ENV === "production",

            ssg: {
                meta: true,
                hashScripts: true,
                hashStyles: true,
                nitroHeaders: true,
                exportToPresets: true,
            },

            sri: true,
        },

        skewProtection: {
            debug: process.env.NODE_ENV !== "production",
            // Skew protection cannot use KV with nuxt hub, as there is no way for it to see the KV namespace AOT. Thats fine, it will still work 100% without it
            // storage: {
            //     driver: "cloudflare-kv-binding",
            //     binding: "KV",
            // },
        },
        robots: {
            metaTag: true,
            header: true,
            blockNonSeoBots: true,
            blockAiBots: false,
            allow: [
                "/",
                "/company/about",
                "/company/contact",
                "/company/roadmap",
                "/legal/cookies",
                "/legal/gdpr",
                "/legal/privacy",
                "/legal/terms",
                "/viewer",
            ],
            disallow: [
                "/api",
                "/admin",
                "/account-capture",
                "/mobile-scan",
            ],
            debug: process.env.NODE_ENV === "development",
        },
        site: {
            url: "https://forthebadge.com",
            name: "For the Badge - Badges for badges sake",
            indexable: process.env.NODE_ENV === "production",
            debug: process.env.NODE_ENV === "development",
            trailingSlash: true,
        },
    });