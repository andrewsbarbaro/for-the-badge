<template>
    <div class="awards-page">
        <!-- Desktop Navigation -->
        <NavBar v-if="!isMobile" />

        <!-- Mobile Navigation -->
        <MobileNavBar v-if="isMobile" />

        <!-- Falling confetti for the winners announcement -->
        <FallingConfetti />

        <SubPageHeader
            title="Developer Awards"
            subtitle="Winners — spotlighting young developers building open-source projects that champion privacy and push the web in a better direction."
        >
            <div class="awards-header-actions">
                <button
                    type="button"
                    class="awards-cta-btn"
                    @click="showEligibilityAndTermsModal = true"
                >
                    Eligibility + Terms
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                    </svg>
                </button>

                <a
                    class="awards-follow-link"
                    href="https://www.linkedin.com/company/realforthebadge"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Follow for next year
                </a>
            </div>
        </SubPageHeader>

        <!-- Winners -->
        <section class="winners-section">
            <div class="section-container">
                <h2 class="section-title">Winners</h2>
                <p class="section-subtitle">
                    Huge congratulations to our Developer Awards winners.
                </p>

                <div class="winners-grid">
                    <article class="winner-card grand">
                        <div class="winner-header">
                            <img
                                class="winner-avatar"
                                src="https://github.com/sancho1952007.png"
                                alt="Sancho Godinho"
                                loading="lazy"
                            >
                            <div class="winner-title-block">
                                <p class="winner-badge">Grand Prize Winner</p>
                                <h3 class="winner-name">Sancho Godinho</h3>
                            </div>
                        </div>

                        <div class="winner-body">
                            <p>
                                Over the past year, we had the chance to watch Sancho consistently build and share thoughtful side projects here on LinkedIn.
                                What stands out isn’t just the quality of the work — it’s the intention behind it.
                            </p>
                            <p>
                                He’s been awarded <strong>$1,000 USD</strong> cash to put directly into his projects and the communities he’s building.
                            </p>
                            <p>
                                Well deserved. The consistency, the courage to build in public, and the commitment to privacy-first development truly paid off.
                            </p>
                        </div>

                        <div class="winner-links">
                            <a
                                class="winner-link"
                                href="https://www.linkedin.com/in/sancho-godinho-a1b58127a/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                            <a
                                class="winner-link"
                                href="https://github.com/sancho1952007"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                            <a
                                class="winner-link"
                                href="https://lnkd.in/gRmpARpd"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Portfolio
                            </a>
                        </div>
                    </article>

                    <article class="winner-card winner">
                        <div class="winner-header">
                            <img
                                class="winner-avatar"
                                src="https://dreckiez.github.io/images/6854_ORmr1H8w.png"
                                alt="Xuân Hưng (Dreckiez) Mai"
                                loading="lazy"
                            >
                            <div class="winner-title-block">
                                <p class="winner-badge">Runner-Up</p>
                                <h3 class="winner-name">Xuân Hưng (Dreckiez) Mai</h3>
                            </div>
                        </div>

                        <div class="winner-body">
                            <p>
                                We deeply admire your drive to better understand software, your ability to bridge the gap between development and DevOps, and your commitment to building solutions that are not only privacy-first, but truly purpose-built.
                            </p>
                            <p>
                                Your willingness to learn in public and your focus on creating robust, resilient systems even when the design challenges become complex embody exactly what the Developer Awards are meant to celebrate.
                            </p>
                        </div>

                        <div class="winner-links">
                            <a
                                class="winner-link"
                                href="https://www.linkedin.com/in/xu%C3%A2n-h%C6%B0ng-mai-44960a334/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                            <a
                                class="winner-link"
                                href="https://github.com/Dreckiez"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                            <a
                                class="winner-link"
                                href="https://dreckiez.github.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Portfolio
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="about-section">
            <div class="section-container">
                <h2 class="section-title">About the Awards</h2>
                <div class="about-content">
                    <div class="about-card">
                        <div class="about-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
                            </svg>
                        </div>
                        <h3>Privacy First</h3>
                        <p>We spotlight projects that champion user privacy and data protection — work that aligns with our mission of building a more private web.</p>
                    </div>
                    <div class="about-card">
                        <div class="about-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                            </svg>
                        </div>
                        <h3>Young Developers</h3>
                        <p>These awards are for emerging developers aged 13–35 who are building in public and moving the web in a better direction.</p>
                    </div>
                    <div class="about-card">
                        <div class="about-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.5,21H2V9H7.5V21M22,9H16.5V21H22V9M14.5,9H9V21H14.5V9Z" />
                            </svg>
                        </div>
                        <h3>Open Source</h3>
                        <p>Projects should be open source and publicly accessible — transparency and community-driven development matter.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stay tuned -->
        <section class="next-year-section">
            <div class="section-container">
                <div class="next-year-card">
                    <h2 class="next-year-title">Stay tuned for next year</h2>
                    <p class="next-year-subtitle">
                        We’ll share dates, prizes, and submission details here when the next Developer Awards open.
                    </p>
                    <div class="next-year-actions">
                        <a
                            class="next-year-btn"
                            href="https://www.linkedin.com/company/realforthebadge"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Follow on LinkedIn
                        </a>
                        <button
                            type="button"
                            class="next-year-btn secondary"
                            @click="showEligibilityAndTermsModal = true"
                        >
                            Eligibility + Terms
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sponsors Section -->
        <section class="sponsors-section">
            <div class="section-container">
                <h2 class="section-title">Our Sponsors</h2>
                <p class="sponsors-intro">Thank you to our amazing sponsors who make these awards possible</p>
                <div class="sponsors-grid">
                    <a href="https://hofflabs.org" target="_blank" rel="noopener noreferrer" class="sponsor-card">
                        <img src="https://hofflabs.org/hofflabs.png" alt="Hoff Labs" class="sponsor-logo" />
                        <h3>Hoff Labs</h3>
                        <p>Building the future of privacy first technology</p>
                    </a>
                </div>
                <div class="sponsor-cta">
                    <p>Want to become a sponsor? Email us at <a href="mailto:hello@forthebadge.com">hello@forthebadge.com</a></p>
                </div>
            </div>
        </section>

        <!-- Eligibility + Terms Modal -->
        <div
            v-if="showEligibilityAndTermsModal"
            class="eligibility-terms-modal-overlay"
            role="dialog"
            aria-modal="true"
            @click.self="showEligibilityAndTermsModal = false"
        >
            <div class="eligibility-terms-modal">
                <div class="modal-top">
                    <h2>Eligibility + Terms</h2>
                    <button
                        type="button"
                        class="modal-close"
                        aria-label="Close"
                        @click="showEligibilityAndTermsModal = false"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </div>

                <div class="modal-body">
                    <h3>Eligibility Requirements</h3>
                    <div class="requirements-list">
                        <div class="requirement-item">
                            <div class="requirement-number">1</div>
                            <div class="requirement-content">
                                <h4>Age</h4>
                                <p>Must be between 13 and 35 years old at the time of submission</p>
                            </div>
                        </div>
                        <div class="requirement-item">
                            <div class="requirement-number">2</div>
                            <div class="requirement-content">
                                <h4>Project Type</h4>
                                <p>Must be an open-source software project with a public repository</p>
                            </div>
                        </div>
                        <div class="requirement-item">
                            <div class="requirement-number">3</div>
                            <div class="requirement-content">
                                <h4>Privacy Focus</h4>
                                <p>Project must demonstrate a clear commitment to user privacy and data protection</p>
                            </div>
                        </div>
                        <div class="requirement-item">
                            <div class="requirement-number">4</div>
                            <div class="requirement-content">
                                <h4>Original Work</h4>
                                <p>You must be the primary creator or a core contributor to the project</p>
                            </div>
                        </div>
                    </div>

                    <h3 style="margin-top: 2.5rem;">Terms & Agreements</h3>
                    <div class="terms-list">
                        <p>I confirm that I meet all eligibility requirements (age 13-35, open-source project, privacy-focused) and that all information provided is accurate and truthful. *</p>
                        <p>I understand that the winner will be determined solely by the For the Badge team, which may consider starboard votes as one of many factors, but starboard votes are not the final deciding factor. *</p>
                        <p>I consent to being contacted via email regarding this application and agree that my submission may be reviewed and used by For the Badge for the purposes of this awards program. *</p>
                    </div>

                    <div class="legal-disclaimer" style="margin-top: 2rem;">
                        <p><strong>Privacy & Data Protection:</strong> All information collected for this awards program is stored with end-to-end encryption and is never shared or sold with any third parties. Your data is used solely for the purpose of administering this awards program. After the conclusion of the awards program, all submission data will be permanently deleted from our systems.</p>
                    </div>

                    <div class="legal-disclaimer">
                        <p><strong>Legal Disclaimer:</strong> By submitting this application, you acknowledge that: (1) For the Badge reserves the right to disqualify any submission that violates the eligibility requirements or terms; (2) prize distribution is subject to verification of eligibility; (3) no purchase or payment is necessary to enter or win; (4) void where prohibited by law; (5) For the Badge is not responsible for lost, late, incomplete, or misdirected submissions; (6) all decisions regarding winner selection are final and binding; (7) winners may be required to sign additional documentation before receiving prizes; and (8) For the Badge reserves the right to modify, suspend, or cancel the awards program at any time.</p>
                    </div>
                </div>

                <div class="modal-actions">
                    <button type="button" class="hero-apply-btn primary" @click="showEligibilityAndTermsModal = false">
                        Close
                    </button>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { isMobileDevice } from '~/utils/deviceDetection';

const showEligibilityAndTermsModal = ref(false);

const isMobile = computed(() => {
    if (import.meta.client) {
        return isMobileDevice();
    }
    return false;
});

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
        showEligibilityAndTermsModal.value = false;
    }
}

onMounted(() => {
    if (!import.meta.client) return;
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    if (!import.meta.client) return;
    window.removeEventListener('keydown', handleKeydown);
});

definePageMeta({
    layout: false,
});
</script>

<style scoped>
.awards-page {
    min-height: 100vh;
    background: #ffffff;
}

/* Header actions (inside SubPageHeader) */
.awards-header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.awards-cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    border: 1px solid #000000;
    background: #000000;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
}

.awards-cta-btn:hover {
    transform: translateY(-1px);
    background: #111827;
    border-color: #111827;
}

.awards-follow-link {
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    color: #000000;
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease;
}

.awards-follow-link:hover {
    transform: translateY(-1px);
    border-color: #000000;
}

/* Winners */
.winners-section {
    padding: 6rem 2rem;
    background: #ffffff;
}

.section-subtitle {
    text-align: center;
    font-size: 1.125rem;
    color: #666666;
    margin-top: -2rem;
    margin-bottom: 3rem;
}

.winners-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
}

.winner-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.winner-card.grand {
    border: 2px solid rgba(245, 158, 11, 0.7);
    box-shadow: 0 14px 40px rgba(245, 158, 11, 0.18);
}

.winner-card.winner {
    border: 2px solid rgba(0, 0, 0, 0.1);
}

.winner-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid #f1f5f9;
}

.winner-avatar {
    width: 68px;
    height: 68px;
    border-radius: 14px;
    object-fit: cover;
    border: 1px solid #e5e7eb;
    background: #ffffff;
}

.winner-title-block {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.winner-badge {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #d97706;
}

.winner-name {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
    color: #000000;
    line-height: 1.2;
}

.winner-body p {
    margin: 0 0 0.9rem;
    color: #374151;
    line-height: 1.7;
}

.winner-body p:last-child {
    margin-bottom: 0;
}

.winner-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
}

.winner-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    color: #000000;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
}

.winner-link:hover {
    transform: translateY(-1px);
    border-color: #000000;
}

/* Next year */
.next-year-section {
    padding: 6rem 2rem;
    background: #ffffff;
}

.next-year-card {
    max-width: 900px;
    margin: 0 auto;
    background: linear-gradient(135deg, #f8fafb 0%, #ffffff 100%);
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    padding: 2.5rem;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.next-year-title {
    margin: 0 0 0.75rem;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #000000;
}

.next-year-subtitle {
    margin: 0 0 1.75rem;
    color: #6b7280;
    font-size: 1.05rem;
    line-height: 1.7;
}

.next-year-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.next-year-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    border: 1px solid #000000;
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.next-year-btn:hover {
    transform: translateY(-1px);
    background: #111827;
    border-color: #111827;
}

.next-year-btn.secondary {
    background: #ffffff;
    color: #000000;
    border-color: #e5e7eb;
}

.next-year-btn.secondary:hover {
    border-color: #000000;
    background: #ffffff;
}

/* Hero Section */
.hero-section {
    position: relative;
    padding: 10rem 2rem 6rem;
    background: #000000;
    overflow: hidden;
    color: white;
    text-align: center;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    overflow: hidden;
}

.floating-badge {
    position: absolute;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    border-radius: 8px;
    animation: float 15s infinite ease-in-out;
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.badge-1 {
    width: 60px;
    height: 25px;
    left: 10%;
    animation-delay: 0s;
}

.badge-2 {
    width: 80px;
    height: 30px;
    left: 30%;
    animation-delay: -3s;
}

.badge-3 {
    width: 70px;
    height: 28px;
    left: 50%;
    animation-delay: -6s;
}

.badge-4 {
    width: 90px;
    height: 32px;
    left: 70%;
    animation-delay: -9s;
}

.badge-5 {
    width: 65px;
    height: 26px;
    left: 90%;
    animation-delay: -12s;
}

@keyframes float {
    0%, 100% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    50% {
        transform: translateY(-20vh) rotate(180deg);
    }
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    margin: 0 auto;
}

.anniversary-badge {
    display: inline-block;
    position: relative;
    margin-bottom: 2rem;
}

.pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 3px solid #fbbf24;
    border-radius: 50%;
    animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
    }
}

.anniversary-text {
    display: inline-block;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-weight: 800;
    font-size: 0.875rem;
    letter-spacing: 0.1em;
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.4);
}

.hero-intro {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.75rem;
}

.hero-title {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title-main {
    display: block;
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #B8860B 0%, #FFD700 25%, #FFA500 50%, #FFD700 75%, #D4AF37 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    margin-bottom: 3rem;
    opacity: 0.95;
}

.prize-highlights {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.prize-highlight {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 1rem 1.5rem;
    animation: prize-float 3s ease-in-out infinite;
}

.prize-divider {
    font-size: 1.75rem;
    font-weight: 900;
    color: #fbbf24;
    text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
}

@keyframes prize-float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.trophy-icon {
    color: #ffd700;
    filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3));
}

.trophy-icon svg {
    width: 48px;
    height: 48px;
}

.prize-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.prize-amount {
    font-size: 1.75rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 0.25rem;
}

.prize-subtitle {
    font-size: 0.875rem;
    opacity: 0.9;
}

.prize-disclaimer {
    font-size: 0.625rem;
    opacity: 0.7;
    margin-top: 0.125rem;
}

.hoodie-icon {
    color: #60a5fa;
    filter: drop-shadow(0 4px 8px rgba(96, 165, 250, 0.3));
}

.hero-cta {
    margin-top: 3rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.hero-apply-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 3rem;
    font-size: 1.25rem;
    font-weight: 800;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

/* Eligibility + Terms Modal */
.eligibility-terms-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.eligibility-terms-modal {
    width: min(900px, 100%);
    max-height: min(85vh, 900px);
    overflow: hidden;
    background: white;
    border-radius: 20px;
    border: 2px solid rgba(251, 191, 36, 0.3);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
}

.modal-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem 1.75rem;
    border-bottom: 1px solid #f1f5f9;
}

.modal-top h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 900;
}

.modal-close {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: #fafafa;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #111827;
}

.modal-close:hover {
    background: #f3f4f6;
}

.modal-body {
    padding: 1.5rem 1.75rem;
    overflow: auto;
}

.modal-body h3 {
    font-size: 1.125rem;
    font-weight: 900;
    margin: 0 0 1rem;
}

.modal-body h4 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 800;
}

.terms-list p {
    margin: 0 0 0.75rem;
    line-height: 1.6;
    color: #374151;
}

.modal-actions {
    padding: 1.25rem 1.75rem;
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: flex-end;
}

@media (max-width: 768px) {
    .eligibility-terms-modal-overlay {
        padding: 1rem;
    }

    .modal-top {
        padding: 1.25rem 1.25rem;
    }

    .modal-body {
        padding: 1.25rem 1.25rem;
    }

    .modal-actions {
        padding: 1.25rem 1.25rem;
    }
}

.hero-apply-btn.primary {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    box-shadow: 0 8px 24px rgba(251, 191, 36, 0.4);
}

.hero-apply-btn.primary:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 16px 40px rgba(251, 191, 36, 0.6);
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.hero-apply-btn.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.hero-apply-btn.secondary:hover {
    transform: translateY(-4px) scale(1.05);
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

/* Countdown Section */
.countdown-section {
    padding: 4rem 2rem;
    background: #000000;
    color: white;
}

.countdown-container {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
}

.countdown-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    letter-spacing: 0.05em;
}

.countdown-timer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem 1rem;
    min-width: 100px;
}

.time-value {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 0.5rem;
    animation: pulse-number 2s infinite;
}

@keyframes pulse-number {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.time-label {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.7;
}

.time-separator {
    font-size: 2rem;
    font-weight: 700;
    opacity: 0.5;
}

.deadline-text {
    font-size: 1rem;
    opacity: 0.7;
}

/* Sections */
.section-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    text-align: center;
    margin-bottom: 3rem;
    color: #000000;
}

/* About Section */
.about-section {
    padding: 6rem 2rem;
    background: #fafafa;
}

.about-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.about-card {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
}

.about-card:hover {
    transform: translateY(-8px);
}

.about-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    border-radius: 20px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);
}

.about-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #000000;
}

.about-card p {
    font-size: 1rem;
    line-height: 1.6;
    color: #666666;
}

/* Prizes Section */
.prizes-section {
    padding: 6rem 2rem;
    background: white;
}

.prizes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.prize-card {
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
    color: white;
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    border: 2px solid #fbbf24;
    box-shadow: 0 8px 32px rgba(251, 191, 36, 0.2);
}

.prize-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    animation: shine 3s infinite;
}

@keyframes shine {
    0% {
        transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
        transform: translateX(100%) translateY(100%) rotate(45deg);
    }
}

.prize-badge {
    font-size: 4rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.prize-card h3 {
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 1rem;
}

.prize-value {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 2rem;
}

.prize-list {
    list-style: none;
    padding: 0;
    text-align: left;
}

.prize-list li {
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
    font-size: 1rem;
    line-height: 1.5;
}

.prize-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    font-weight: 900;
    color: #ffd700;
}

/* Sponsors Section */
.sponsors-section {
    padding: 6rem 2rem;
    background: white;
}

.sponsors-intro {
    text-align: center;
    font-size: 1.125rem;
    color: #666666;
    margin-bottom: 3rem;
    margin-top: -1rem;
}

.sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.sponsor-card {
    background: #fafafa;
    border-radius: 16px;
    padding: 2.5rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.sponsor-card:hover {
    transform: translateY(-8px);
    border-color: #fbbf24;
    box-shadow: 0 12px 40px rgba(251, 191, 36, 0.2);
}

.sponsor-logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 1.5rem;
}

.sponsor-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000000;
    margin-bottom: 0.75rem;
}

.sponsor-card p {
    font-size: 1rem;
    color: #666666;
    line-height: 1.6;
}

.sponsor-cta {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e5e5;
}

.sponsor-cta p {
    font-size: 1.125rem;
    color: #666666;
}

.sponsor-cta a {
    color: #d97706;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
}

.sponsor-cta a:hover {
    color: #b45309;
    text-decoration: underline;
}

/* Starboard Info Section */
.starboard-info-section {
    padding: 6rem 2rem;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
    color: white;
}

.starboard-info-section .section-title {
    color: white;
}

.starboard-info-content {
    max-width: 1000px;
    margin: 0 auto;
}

.starboard-intro {
    font-size: 1.25rem;
    line-height: 1.8;
    text-align: center;
    margin-bottom: 3rem;
    opacity: 0.95;
}

.starboard-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.starboard-feature {
    text-align: center;
    padding: 2rem;
}

.feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.4);
}

.starboard-feature h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #fbbf24;
}

.starboard-feature p {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.9;
}

.starboard-cta {
    text-align: center;
}

.starboard-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 3rem;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    font-size: 1.125rem;
    font-weight: 700;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px rgba(251, 191, 36, 0.4);
}

.starboard-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(251, 191, 36, 0.6);
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

/* Requirements Section */
.requirements-section {
    padding: 6rem 2rem;
    background: #fafafa;
}

.requirements-list {
    max-width: 900px;
    margin: 0 auto;
}

.requirement-item {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.requirement-number {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    font-size: 1.75rem;
    font-weight: 900;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);
}

.requirement-content h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #000000;
}

.requirement-content p {
    font-size: 1rem;
    line-height: 1.6;
    color: #666666;
}

/* Form Section */
.form-section {
    padding: 6rem 2rem;
    background: white;
}

.form-container {
    max-width: 800px;
    margin: 0 auto;
}

.form-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    text-align: center;
    margin-bottom: 1rem;
    color: #000000;
}

.form-subtitle {
    text-align: center;
    font-size: 1.125rem;
    color: #666666;
    margin-bottom: 3rem;
}

.application-form {
    background: #fafafa;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.form-group-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e5e5e5;
}

.form-group-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #000000;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    color: #333333;
    margin-bottom: 0.5rem;
    font-size: 0.9375rem;
}

.char-count {
    font-size: 0.75rem;
    color: #999999;
    font-weight: 400;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e5e5e5;
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.2s;
    background: white;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}

.form-group textarea {
    resize: vertical;
}

.checkbox-group {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    cursor: pointer;
    font-weight: 400;
}

.checkbox-label input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    flex-shrink: 0;
    margin: 0;
}

.checkbox-label span {
    font-size: 0.9375rem;
    line-height: 1.5;
    color: #333333;
}

.checkbox-description {
    font-size: 0.875rem;
    color: #666666;
    margin-top: 0.5rem;
    margin-left: 2rem;
    line-height: 1.5;
}

/* Starboard Toggle Card */
.starboard-toggle-card {
    background: white;
    border: 2px solid #e5e5e5;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
}

.starboard-toggle-card:hover {
    border-color: #fbbf24;
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.15);
    transform: translateY(-2px);
}

.starboard-toggle-card.active {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
    border-color: #fbbf24;
    box-shadow: 0 4px 20px rgba(251, 191, 36, 0.2);
}

.toggle-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
}

.toggle-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    border-radius: 12px;
    color: #000000;
    flex-shrink: 0;
    transition: transform 0.3s ease;
}

.starboard-toggle-card:hover .toggle-card-icon {
    transform: scale(1.1) rotate(5deg);
}

.starboard-toggle-card.active .toggle-card-icon {
    animation: icon-bounce 0.5s ease;
}

@keyframes icon-bounce {
    0%, 100% {
        transform: scale(1) rotate(0deg);
    }
    50% {
        transform: scale(1.2) rotate(10deg);
    }
}

.toggle-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.toggle-card-content h4 {
    font-size: 1rem;
    font-weight: 700;
    color: #000000;
    margin: 0;
}

.recommended-badge {
    display: inline-block;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.625rem;
    border-radius: 50px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    width: fit-content;
}

.toggle-switch {
    width: 52px;
    height: 28px;
    background: #cccccc;
    border-radius: 50px;
    position: relative;
    transition: background 0.3s ease;
    flex-shrink: 0;
}

.toggle-switch.on {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.toggle-slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.on .toggle-slider {
    transform: translateX(24px);
}

.toggle-card-description {
    font-size: 0.875rem;
    line-height: 1.5;
    color: #666666;
    margin: 0;
}

.legal-header {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #e5e5e5;
}

.legal-disclaimer {
    background: #f8f9fa;
    border: 2px solid #e5e5e5;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
}

.legal-disclaimer p {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: #555555;
    margin: 0;
}

.legal-disclaimer strong {
    color: #000000;
    font-weight: 700;
}

.error-message {
    background: #fee;
    border: 2px solid #fcc;
    color: #c33;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    font-size: 0.9375rem;
}

.submit-button {
    width: 100%;
    padding: 1.25rem;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    border: none;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);
}

.submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(251, 191, 36, 0.5);
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-top: 3px solid #000000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/* Success State */
.success-state {
    background: #fafafa;
    border-radius: 20px;
    padding: 4rem 3rem;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.success-animation {
    margin-bottom: 2rem;
}

.checkmark-circle {
    display: inline-flex;
    color: #10b981;
    animation: scale-in 0.5s ease-out;
}

@keyframes scale-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.success-state h3 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: #000000;
}

.success-state p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #666666;
    margin-bottom: 1rem;
}

.success-note {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
}

/* Rejection Notice */
.rejection-notice {
    background: #fafafa;
    border-radius: 20px;
    padding: 4rem 3rem;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 2px solid #ef4444;
}

.rejection-icon {
    display: inline-flex;
    color: #dc2626;
    animation: scale-in 0.5s ease-out;
    margin-bottom: 2rem;
}

.rejection-notice h3 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: #dc2626;
}

.rejection-notice p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #666666;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.reapply-button {
    padding: 1rem 2.5rem;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    border: none;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);
}

.reapply-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(251, 191, 36, 0.5);
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

/* Starboard Notice in Success State */
.starboard-notice {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
    border: 2px solid #3b82f6;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    text-align: center;
}

.starboard-notice p {
    color: #2563eb;
    font-weight: 600;
    margin-bottom: 1rem;
}

.show-starboard-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
}

.show-starboard-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.show-starboard-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.spinner-small {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-top: 2px solid #000000;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

/* Auth Gate */
.auth-gate {
    background: #fafafa;
    border-radius: 20px;
    padding: 4rem 3rem;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.auth-gate-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    border-radius: 50%;
    margin-bottom: 2rem;
    box-shadow: 0 8px 24px rgba(251, 191, 36, 0.4);
}

.auth-gate h3 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: #000000;
}

.auth-gate p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #666666;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.auth-gate-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.auth-gate-btn {
    padding: 1rem 2.5rem;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
}

.auth-gate-btn.primary {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000000;
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);
}

.auth-gate-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(251, 191, 36, 0.5);
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.auth-gate-btn.secondary {
    background: white;
    color: #000000;
    border: 2px solid #e5e5e5;
}

.auth-gate-btn.secondary:hover {
    border-color: #f59e0b;
    background: #fafafa;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-section {
        padding: 6rem 1rem 4rem;
    }
    
    .prize-highlights {
        flex-direction: column;
        gap: 1rem;
    }
    
    .prize-divider {
        font-size: 2rem;
        transform: rotate(90deg);
    }
    
    .prize-highlight {
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
    }
    
    .prize-details {
        align-items: center;
    }
    
    .hero-cta {
        flex-direction: column;
        align-items: stretch;
    }
    
    .hero-apply-btn {
        padding: 1rem 2rem;
        font-size: 1.125rem;
        width: 100%;
        justify-content: center;
    }
    
    .countdown-timer {
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .time-unit {
        min-width: 70px;
        padding: 1rem 0.5rem;
    }
    
    .time-value {
        font-size: 2rem;
    }
    
    .time-separator {
        display: none;
    }
    
    .winners-grid,
    .about-content,
    .prizes-grid {
        grid-template-columns: 1fr;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .application-form {
        padding: 2rem 1.5rem;
    }
    
    .requirement-item {
        flex-direction: column;
        gap: 1rem;
    }
    
    .section-container {
        padding: 0 1rem;
    }
}
</style>
