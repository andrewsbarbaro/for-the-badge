<template>
    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-left">
                <NuxtLink to="/" class="footer-logo">
                    <img src="/logo_black.svg" alt="For the Badge" class="footer-logo-img">
                </NuxtLink>

                <div class="footer-manifesto">
                    <p class="manifesto-line">For the Badge is a</p>
                    <p class="manifesto-line struck">Grassroots Movement</p>
                    <p class="manifesto-line struck">Scientific Endeavor</p>
                    <p class="manifesto-line struck">Humanitarian Society</p>
                    <p class="manifesto-line struck">Literary Masterpiece</p>
                    <p class="manifesto-line struck">Knitting Club</p>
                    <p class="manifesto-line punchline">Complete Joke.</p>
                    <p class="manifesto-body">
                        We don't develop for the money, power, fame, or codebabes.
                        <em class="manifesto-tagline">We do it For the Badge.</em>
                    </p>
                </div>
            </div>

            <div class="footer-links">
                <div class="link-col">
                    <span class="link-col-head">Make stuff</span>
                    <NuxtLink to="/generator" class="flink">Badge Generator</NuxtLink>
                    <NuxtLink to="/badges" class="flink">All Badges</NuxtLink>
                    <NuxtLink to="/api" class="flink">API Docs</NuxtLink>
                </div>
                <div class="link-col">
                    <span class="link-col-head">Us</span>
                    <NuxtLink to="/company/about" class="flink">About</NuxtLink>
                    <NuxtLink to="/awards" class="flink">Awards</NuxtLink>
                    <a href="https://github.com/forthebadge/for-the-badge" target="_blank" rel="noopener noreferrer" class="flink">GitHub</a>
                </div>
                <div class="link-col">
                    <span class="link-col-head">Legal</span>
                    <NuxtLink to="/legal/privacy" class="flink">Privacy</NuxtLink>
                    <NuxtLink to="/legal/terms" class="flink">Terms</NuxtLink>
                    <NuxtLink to="/legal/cookies" class="flink">Cookies</NuxtLink>
                    <NuxtLink to="/legal/gdpr" class="flink">GDPR</NuxtLink>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© {{ year }} For the Badge. Not responsible for external content. Badge images © respective owners.</p>
        </div>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
    background: #0a0a0a;
    border-top: 1px solid #1a1a1a;
    padding: 3.5rem 2rem 1.5rem;
}

.footer-inner {
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    gap: 4rem;
    justify-content: space-between;
    flex-wrap: wrap;
}

.footer-left {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 320px;
}

.footer-logo {
    display: block;
    text-decoration: none;
}

.footer-logo-img {
    height: 20px;
    width: auto;
    display: block;
    filter: invert(1);
}

.footer-manifesto {
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.manifesto-line {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.7;
    margin: 0;
}

.struck {
    text-decoration: line-through;
    text-decoration-color: rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.22);
}

.punchline {
    color: #fff;
    font-weight: 700;
    font-size: 0.9375rem;
    margin-top: 0.25rem;
}

.manifesto-body {
    font-size: 0.8125rem;
    color: rgba(255,255,255,0.35);
    line-height: 1.65;
    margin: 0.5rem 0 0;
}

.manifesto-tagline {
    font-style: italic;
    color: rgba(255,255,255,0.6);
}

.footer-links {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
}

.link-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.link-col-head {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.3);
    margin-bottom: 0.25rem;
}

.flink {
    font-size: 0.8125rem;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: color 0.12s;
    white-space: nowrap;
}

.flink:hover { color: rgba(255,255,255,0.9); }

.footer-bottom {
    max-width: 1600px;
    margin: 2.5rem auto 0;
    padding-top: 1.5rem;
    border-top: 1px solid #1a1a1a;
}

.footer-bottom p {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.3);
    margin: 0;
}

@media (max-width: 768px) {
    .footer { padding: 2.5rem 1.25rem 1.25rem; }
    .footer-inner { gap: 2.5rem; }
    .footer-left { max-width: 100%; }
    .footer-links { gap: 2rem; }
}
</style>
