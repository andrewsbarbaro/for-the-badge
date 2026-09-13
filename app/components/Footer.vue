<template>
    <footer class="footer">
        <!-- Animated particles background -->
        <div class="particles-container">
            <div
                v-for="(particle, index) in particles"
                :key="index"
                :class="['particle', particle.type]"
                :style="{ left: particle.x + '%', top: particle.y + '%', animationDelay: particle.delay + 'ms', background: particle.color }"
            />
        </div>

        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="nav-brand">
                        <img
                            src="/logo_black.svg"
                            alt="For the Badge Logo"
                            class="logo"
                        >
                    </div>
                    <p class="brand-tagline">
                        Badges for badges sake.
                    </p>
                    <div class="social-links">
                        <a
                            href="https://github.com/forthebadge/for-the-badge"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="social-link github"
                            aria-label="Visit For the Badge on GitHub"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/company/realforthebadge"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="social-link linkedin"
                            aria-label="Visit For the Badge on LinkedIn"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div class="footer-links">
                    <div class="link-group">
                        <h4 class="link-title">
                            Product
                        </h4>
                        <NuxtLink
                            to="/generator"
                            class="footer-link"
                        >Badge Generator</NuxtLink>
                        <NuxtLink
                            to="/badges"
                            class="footer-link"
                        >All Badges</NuxtLink>
                        <NuxtLink
                            to="/api"
                            class="footer-link"
                        >API Docs</NuxtLink>
                        <a
                            v-if="isHomePage"
                            href="#featured"
                            class="footer-link"
                        >Featured</a>
                        <NuxtLink
                            v-else
                            to="/#featured"
                            class="footer-link"
                        >Featured</NuxtLink>
                    </div>

                    <div class="link-group">
                        <h4 class="link-title">
                            Company
                        </h4>
                        <a
                            href="/company/about"
                            class="footer-link"
                        >About Us</a>
                        <a
                            href="/company/contact"
                            class="footer-link"
                        >Contact</a>
                    </div>

                    <div class="link-group">
                        <h4 class="link-title">
                            Legal
                        </h4>
                        <a
                            href="/legal/privacy"
                            class="footer-link"
                        >Privacy Policy</a>
                        <a
                            href="/legal/terms"
                            class="footer-link"
                        >Terms of Service</a>
                        <a
                            href="/legal/cookies"
                            class="footer-link"
                        >Cookie Policy</a>
                        <a
                            href="/legal/gdpr"
                            class="footer-link"
                        >GDPR</a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-disclaimer">
                    <p class="disclaimer-text">
                        © {{ currentYear }} For the Badge. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const particles = ref([]);
const route = useRoute();
const currentYear = new Date().getFullYear();

// Check if we're on the home page
const isHomePage = computed(() => route.path === "/");

// Generate particles for the background
const generateParticles = () =>
{
    const particleCount = 80;
    const newParticles = [];
    const colors = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#FFA07A",
        "#98D8C8",
        "#F7DC6F",
        "#BB8FCE",
        "#85C1E2",
        "#F8B739",
        "#52B788",
    ];

    for (let i = 0; i < particleCount; i++)
    {
        const types = [
            "small",
            "medium",
            "large",
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        newParticles.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            type,
            color,
            delay: Math.random() * 3000,
        });
    }

    particles.value = newParticles;
};

onMounted(() =>
{
    generateParticles();
});
</script>

<style scoped>
.footer {
  background: #f8fafb;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

/* Particles background */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: particleFade 6s infinite;
}

.particle.small {
  width: 4px;
  height: 4px;
}

.particle.medium {
  width: 6px;
  height: 6px;
}

.particle.large {
  width: 8px;
  height: 8px;
}

@keyframes particleFade {
  0%, 90%, 100% { opacity: 0; }
  45% { opacity: 0.4; }
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-brand {
  max-width: 300px;
}

.logo {
  width: 10rem;
  height: auto;
  filter: grayscale(1) opacity(0.7);
}

.brand-tagline {
  color: #6b7280;
  margin: 1.5rem 0;
  line-height: 1.5;
}

.love-chicago {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  display: inline-block;
}

.social-links {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.social-link.github {
  background: #24292e;
  box-shadow: 0 2px 8px rgba(36, 41, 46, 0.3);
}

.social-link.github:hover {
  background: #1a1e22;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(36, 41, 46, 0.4);
}

.social-link.linkedin {
  background: #0077b5;
  box-shadow: 0 2px 8px rgba(0, 119, 181, 0.3);
}

.social-link.linkedin:hover {
  background: #005885;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 119, 181, 0.4);
}

.social-link svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.link-group {
  display: flex;
  flex-direction: column;
}

.link-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

.footer-link {
  color: #6b7280;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #000000;
}

.footer-bottom {
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
  text-align: center;
}

.ai-disclaimer {
  color: #6b7280;
  font-size: 0.8rem;
  font-style: italic;
  margin: 0 0 1rem 0;
}

.disclaimer-text {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    padding-bottom: 80px; /* Account for mobile bottom nav (64px) + extra spacing */
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>