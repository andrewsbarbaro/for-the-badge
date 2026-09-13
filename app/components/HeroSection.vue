<template>
    <section class="hero">
        <!-- Animated Dot Matrix Background -->
        <div ref="dotMatrix" class="dot-matrix">
            <div
                v-for="(dot, index) in dots"
                :key="index"
                :class="['dot', dot.type]"
                :style="{ left: dot.x + '%', top: dot.y + '%', animationDelay: dot.delay + 'ms', background: dot.color }"
            />
        </div>

        <div class="hero-container">
            <div class="hero-content">
                <!-- New Feature Spotlight: AI Background Remover -->
                <NuxtLink to="/remove-background" class="launch-card launch-card-removebg">
                    <div class="launch-badge launch-badge-removebg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9.64,7.64C10.45,6.84 11.6,6.5 12.66,6.73C14.5,7.13 15.7,8.88 15.41,10.74C15.24,11.8 14.68,12.71 13.87,13.32L21.41,20.86L20,22.27L12.45,14.73C11.65,15.07 10.76,15.16 9.88,14.96L7.5,17.36C6.9,17.96 5.96,17.96 5.36,17.36C4.76,16.76 4.76,15.82 5.36,15.22L7.73,12.85C7.08,11.35 7.32,9.63 8.5,8.5L10.5,10.5L12.5,8.5L11,7L9.64,7.64M12,8.5A1.5,1.5 0 0,0 10.5,10A1.5,1.5 0 0,0 12,11.5A1.5,1.5 0 0,0 13.5,10A1.5,1.5 0 0,0 12,8.5M19.5,2C20.05,2 20.5,2.45 20.5,3V5.5L18,8L16,6V4.5C16,3.12 17.12,2 18.5,2H19.5Z"/>
                    </svg>
                        <span>New: BG Remover</span>
                    </div>
                    <div class="launch-content">
                        <p>remove.bg is shutting down — remove image backgrounds free, right here.</p>
                    </div>
                </NuxtLink>
                
                <h1 class="hero-title">
                    <span class="title-line-1">Badges for badges sake.</span>
                    <span class="title-line-2"><span class="highlight">Because your project deserves flair</span></span>
                </h1>

                <p class="hero-subtitle">
                    Create custom SVG badges for your projects with precision and style.
                    From featured designs to full customization, make your README stand out.
                </p>

                <div class="hero-actions">
                    <NuxtLink
                        to="/generator"
                        class="cta-button primary"
                    >
                        Create Your Badge
                    </NuxtLink>
                    <NuxtLink
                        to="/badges"
                        class="cta-button secondary"
                    >
                        Browse Collection
                    </NuxtLink>
                </div>

                <!-- As Seen On Carousel -->
                <div class="as-seen-on">
                    <p class="as-seen-label">AS SEEN ON</p>
                    <div class="carousel-wrapper">
                        <div class="carousel-track">
                            <div
                                v-for="copyIndex in 3"
                                :key="`partner-copy-${copyIndex}`"
                                class="carousel-group"
                                :aria-hidden="copyIndex > 1 ? 'true' : null"
                            >
                                <a
                                    v-for="(partner, index) in partners"
                                    :key="`${copyIndex}-${index}`"
                                    :href="partner.link"
                                    :title="partner.alt"
                                    class="logo-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    :tabindex="copyIndex > 1 ? -1 : null"
                                >
                                    <img
                                        :src="partner.url"
                                        :alt="partner.alt"
                                        class="logo-image"
                                    >
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const dotMatrix = ref(null);
const dots = ref([]);

// Partner logos for "As Seen On" carousel
const partners = [
    {
        url: "/press-logos/yahoo-finance.png",
        link: `https://finance.yahoo.com/news/badge-unveils-first-line-merchandise-212400846.html`,
        alt: "Yahoo Finance",
    },
    {
        url: "/press-logos/associated-press.png",
        link: `https://apnews.com/press-release/newsfile/illinois-chicago-design-marketing-and-advertising-9598bd632b094b9ba8f100dd5a844e91`,
        alt: "Associated Press",
    },
    {
        url: "/press-logos/business-insider.png",
        link: `https://markets.businessinsider.com/news/stocks/for-the-badge-unveils-first-line-of-merchandise-featuring-customizable-badges-1033413383`,
        alt: "Business Insider",
    },
    {
        url: "/press-logos/marketwatch.png",
        link: `https://www.marketwatch.com/press-release/for-the-badge-unveils-first-line-of-merchandise-featuring-customizable-badges-3337b24f?mod=search_headline`,
        alt: "MarketWatch",
    },
    {
        url: "/press-logos/lead-dev.png",
        link: `https://leaddev.com`,
        alt: "Lead Dev",
    },
    {
        url: "/press-logos/web-creator-box.png",
        link: `https://www.webcreatorbox.com`,
        alt: "Web Creator Box",
    },
];

// Generate random dots for the matrix background
const generateDots = () =>
{
    const dotCount = 150;
    const newDots = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'];

    for (let i = 0; i < dotCount; i++)
    {
        const types = [
            "small",
            "medium",
            "large",
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        newDots.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            type,
            color,
            delay: Math.random() * 2000,
        });
    }

    dots.value = newDots;
};

onMounted(() =>
{
    generateDots();
});
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background: #f8fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  padding-top: 6rem;
  position: relative;
  overflow: hidden;
  width: 100%;
}

/* Animated dot matrix background */
.dot-matrix {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.dot {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: dotFade 4s infinite;
}

.dot.small {
  width: 3px;
  height: 3px;
}

.dot.medium {
  width: 5px;
  height: 5px;
}

.dot.large {
  width: 7px;
  height: 7px;
}

@keyframes dotFade {
  0%, 90%, 100% { opacity: 0; }
  45% { opacity: 0.6; }
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  z-index: 1;
  position: relative;
  box-sizing: border-box;
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Launch Announcement Card */
.launch-card {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #FFFBEB 0%, rgba(255, 255, 255, 0.8) 100%);
  border: 2px solid #fbbf24;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: slideInDown 0.6s ease-out;
}

.launch-card:hover {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #FEF3C7 0%, rgba(255, 255, 255, 0.9) 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(251, 191, 36, 0.25);
}

/* New-feature (BG Remover) variant */
.launch-card-removebg {
  background: linear-gradient(135deg, #EFF6FF 0%, rgba(255, 255, 255, 0.8) 100%);
  border-color: #60a5fa;
}

.launch-card-removebg:hover {
  border-color: #2563eb;
  background: linear-gradient(135deg, #DBEAFE 0%, rgba(255, 255, 255, 0.9) 100%);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
}

.launch-badge-removebg {
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  color: #ffffff;
}

.launch-card-removebg .launch-content p {
  color: #1e3a8a;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.launch-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #000000;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.launch-badge-awards {
  background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%);
  color: #000000;
}

.launch-badge svg {
  flex-shrink: 0;
}

.launch-content {
  flex: 1;
}

.launch-content p {
  margin: 0;
  color: #4b5563;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.4;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1f2937;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.hero-title .title-line-1,
.hero-title .title-line-2 {
  display: block;
}

.hero-title .highlight {
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #FFA07A 75%, #F7DC6F 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-weight: 400;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
}

.cta-button.primary {
  background: #000000;
  color: white;
  border: 2px solid #000000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cta-button.primary:hover {
  background: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.cta-button.secondary {
  background: transparent;
  color: #000000;
  border: 2px solid #000000;
}

.cta-button.secondary:hover {
  background: #000000;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* As Seen On Carousel */
.as-seen-on {
  margin-top: 4rem;
  padding-top: 2rem;
}

.as-seen-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-align: center;
  color: #999999;
  margin-bottom: 2rem;
}

.carousel-wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.carousel-track {
  display: flex;
  width: max-content;
  animation: scroll 30s linear infinite;
}

.carousel-group {
  display: flex;
  gap: 4rem;
  flex-shrink: 0;
  padding-right: 4rem;
}

.carousel-track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333333%);
  }
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.9;
  filter: none;
  transition: all 0.3s ease;
}

.logo-link:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.logo-image {
  height: 32px;
  width: auto;
  object-fit: contain;
}

@media (max-width: 768px) {
  .hero {
    padding-top: 5rem;
    padding-bottom: 2rem;
    min-height: auto;
    padding-left: 0;
    padding-right: 0;
  }

  .hero-container {
    padding: 0 1rem;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .hero-content {
    max-width: 100%;
    width: 100%;
  }
  
  .launch-card {
    flex-direction: column;
    padding: 1rem 1.25rem;
    gap: 0.75rem;
    text-align: center;
    max-width: 90%;
  }
  
  .launch-content p {
    font-size: 0.875rem;
  }

  .hero-title {
    font-size: clamp(1.75rem, 7vw, 2.5rem);
    margin-bottom: 1rem;
    line-height: 1.3;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .hero-title .title-line-1,
  .hero-title .title-line-2 {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .hero-title .highlight {
    display: inline;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .cta-button {
    width: 100%;
    max-width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  .as-seen-on {
    margin-top: 3rem;
    padding-top: 1.5rem;
  }

  .as-seen-label {
    font-size: 0.7rem;
    margin-bottom: 1.5rem;
  }

  .carousel-group {
    gap: 3rem;
    padding-right: 3rem;
  }

  .logo-image {
    height: 24px;
  }
}
</style>