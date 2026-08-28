<template>
    <div class="page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />

        <FallingConfetti />

        <div class="page-container">
            <div class="page-header">
                <h1>Developer Awards</h1>
                <p class="subtitle">Winners — spotlighting young developers building open-source projects that champion privacy and push the web in a better direction.</p>
            </div>

            <div class="page-content">
                <!-- Winners -->
                <section class="section">
                    <h2>Winners</h2>
                    <p>Huge congratulations to our Developer Awards winners.</p>

                    <div class="winners-grid">
                        <article class="winner-card grand">
                            <div class="winner-header">
                                <img class="winner-avatar" src="https://github.com/sancho1952007.png" alt="Sancho Godinho" loading="lazy" />
                                <div>
                                    <p class="winner-label grand-label">Grand Prize Winner</p>
                                    <h3 class="winner-name">Sancho Godinho</h3>
                                </div>
                            </div>
                            <div class="winner-body">
                                <p>Over the past year, we had the chance to watch Sancho consistently build and share thoughtful side projects here on LinkedIn. What stands out isn't just the quality of the work — it's the intention behind it.</p>
                                <p>He's been awarded <strong>$1,000 USD</strong> cash to put directly into his projects and the communities he's building.</p>
                                <p>Well deserved. The consistency, the courage to build in public, and the commitment to privacy-first development truly paid off.</p>
                            </div>
                            <div class="winner-links">
                                <a class="winner-link" href="https://www.linkedin.com/in/sancho-godinho-a1b58127a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a class="winner-link" href="https://github.com/sancho1952007" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a class="winner-link" href="https://lnkd.in/gRmpARpd" target="_blank" rel="noopener noreferrer">Portfolio</a>
                            </div>
                        </article>

                        <article class="winner-card">
                            <div class="winner-header">
                                <img class="winner-avatar" src="https://dreckiez.github.io/images/6854_ORmr1H8w.png" alt="Xuân Hưng (Dreckiez) Mai" loading="lazy" />
                                <div>
                                    <p class="winner-label">Runner-Up</p>
                                    <h3 class="winner-name">Xuân Hưng (Dreckiez) Mai</h3>
                                </div>
                            </div>
                            <div class="winner-body">
                                <p>We deeply admire your drive to better understand software, your ability to bridge the gap between development and DevOps, and your commitment to building solutions that are not only privacy-first, but truly purpose-built.</p>
                                <p>Your willingness to learn in public and your focus on creating robust, resilient systems even when the design challenges become complex embody exactly what the Developer Awards are meant to celebrate.</p>
                            </div>
                            <div class="winner-links">
                                <a class="winner-link" href="https://www.linkedin.com/in/xu%C3%A2n-h%C6%B0ng-mai-44960a334/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a class="winner-link" href="https://github.com/Dreckiez" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a class="winner-link" href="https://dreckiez.github.io/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                            </div>
                        </article>
                    </div>
                </section>

                <!-- About -->
                <section class="section">
                    <h2>About the Awards</h2>
                    <div class="about-grid">
                        <div class="about-card">
                            <h3>Privacy First</h3>
                            <p>We spotlight projects that champion user privacy and data protection — work that aligns with our mission of building a more private web.</p>
                        </div>
                        <div class="about-card">
                            <h3>Young Developers</h3>
                            <p>These awards are for emerging developers aged 13–35 who are building in public and moving the web in a better direction.</p>
                        </div>
                        <div class="about-card">
                            <h3>Open Source</h3>
                            <p>Projects should be open source and publicly accessible — transparency and community-driven development matter.</p>
                        </div>
                    </div>
                </section>


                <!-- Sponsors -->
                <section class="section">
                    <h2>Our Sponsors</h2>
                    <p>Thank you to our amazing sponsors who make these awards possible.</p>
                    <div class="sponsors-grid">
                        <a href="https://hofflabs.org" target="_blank" rel="noopener noreferrer" class="sponsor-card">
                            <img src="https://hofflabs.org/hofflabs.png" alt="Hoff Labs" class="sponsor-logo" />
                            <h3>Hoff Labs</h3>
                            <p>Building the future of privacy first technology</p>
                        </a>
                    </div>
                    <p class="sponsor-cta">Want to become a sponsor? Email us at <a href="mailto:hello@forthebadge.com">hello@forthebadge.com</a></p>
                </section>
            </div>
        </div>

        <!-- Eligibility + Terms Modal -->
        <div
            v-if="showEligibilityAndTermsModal"
            class="modal-overlay"
            role="dialog"
            aria-modal="true"
            @click.self="showEligibilityAndTermsModal = false"
        >
            <div class="modal">
                <div class="modal-top">
                    <h2>Eligibility + Terms</h2>
                    <button type="button" class="modal-close" aria-label="Close" @click="showEligibilityAndTermsModal = false">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                    </button>
                </div>
                <div class="modal-body">
                    <h3>Eligibility Requirements</h3>
                    <div class="requirements-list">
                        <div class="requirement-item">
                            <span class="requirement-num">1</span>
                            <div><h4>Age</h4><p>Must be between 13 and 35 years old at the time of submission</p></div>
                        </div>
                        <div class="requirement-item">
                            <span class="requirement-num">2</span>
                            <div><h4>Project Type</h4><p>Must be an open-source software project with a public repository</p></div>
                        </div>
                        <div class="requirement-item">
                            <span class="requirement-num">3</span>
                            <div><h4>Privacy Focus</h4><p>Project must demonstrate a clear commitment to user privacy and data protection</p></div>
                        </div>
                        <div class="requirement-item">
                            <span class="requirement-num">4</span>
                            <div><h4>Original Work</h4><p>You must be the primary creator or a core contributor to the project</p></div>
                        </div>
                    </div>

                    <h3>Terms &amp; Agreements</h3>
                    <p>I confirm that I meet all eligibility requirements (age 13-35, open-source project, privacy-focused) and that all information provided is accurate and truthful. *</p>
                    <p>I understand that the winner will be determined solely by the For the Badge team, which may consider starboard votes as one of many factors, but starboard votes are not the final deciding factor. *</p>
                    <p>I consent to being contacted via email regarding this application and agree that my submission may be reviewed and used by For the Badge for the purposes of this awards program. *</p>

                    <div class="legal-box">
                        <p><strong>Privacy &amp; Data Protection:</strong> All information collected for this awards program is stored with end-to-end encryption and is never shared or sold with any third parties. Your data is used solely for the purpose of administering this awards program. After the conclusion of the awards program, all submission data will be permanently deleted from our systems.</p>
                    </div>

                    <div class="legal-box">
                        <p><strong>Legal Disclaimer:</strong> By submitting this application, you acknowledge that: (1) For the Badge reserves the right to disqualify any submission that violates the eligibility requirements or terms; (2) prize distribution is subject to verification of eligibility; (3) no purchase or payment is necessary to enter or win; (4) void where prohibited by law; (5) For the Badge is not responsible for lost, late, incomplete, or misdirected submissions; (6) all decisions regarding winner selection are final and binding; (7) winners may be required to sign additional documentation before receiving prizes; and (8) For the Badge reserves the right to modify, suspend, or cancel the awards program at any time.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-primary" @click="showEligibilityAndTermsModal = false">Close</button>
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

const isMobile = computed(() => import.meta.client ? isMobileDevice() : false);

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') showEligibilityAndTermsModal.value = false;
}

onMounted(() => { if (!import.meta.client) return; window.addEventListener('keydown', handleKeydown); });
onUnmounted(() => { if (!import.meta.client) return; window.removeEventListener('keydown', handleKeydown); });

definePageMeta({ layout: false });
</script>

<style scoped>
.page { min-height: 100vh; background: #fff; display: flex; flex-direction: column; }
.page-container { flex: 1; max-width: 1100px; margin: 0 auto; padding: 6rem 2rem 4rem; width: 100%; box-sizing: border-box; }
.page-header { margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 2px solid #000; }
.page-header h1 { font-size: 2.5rem; font-weight: 800; color: #000; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
.subtitle { font-size: 1rem; color: #666; margin: 0 0 1.25rem; }
.page-content { display: flex; flex-direction: column; gap: 2rem; }
.section { padding-bottom: 2rem; border-bottom: 1px solid #e8e8e8; }
.section:last-of-type { border-bottom: none; }
.section h2 { font-size: 1.125rem; font-weight: 700; color: #000; margin: 0 0 0.875rem; }
.section p, .section li { font-size: 0.9375rem; line-height: 1.7; color: #444; }
.section a { color: #000; font-weight: 600; text-underline-offset: 2px; }

.header-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.25rem; }

.btn-primary {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.625rem 1.25rem; background: #000; color: #fff;
    border: 1px solid #000; border-radius: 4px; font-weight: 700;
    font-size: 0.875rem; text-decoration: none; cursor: pointer;
    transition: opacity 0.15s;
}
.btn-primary:hover { opacity: 0.85; }

.btn-secondary {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.625rem 1.25rem; background: #fff; color: #000;
    border: 1px solid #000; border-radius: 4px; font-weight: 600;
    font-size: 0.875rem; text-decoration: none; cursor: pointer;
    transition: background 0.15s;
}
.btn-secondary:hover { background: #f5f5f5; }

.action-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem; }

/* Winners */
.winners-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 1rem; }

.winner-card {
    border: 1px solid #e8e8e8; border-radius: 6px; padding: 1.25rem;
    background: #fff; display: flex; flex-direction: column; gap: 1rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s;
}
.winner-card:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}
.winner-card.grand { border: 2px solid #000; }

.winner-header { display: flex; align-items: center; gap: 0.875rem; }
.winner-avatar { width: 52px; height: 52px; border-radius: 8px; object-fit: cover; border: 1px solid #e8e8e8; flex-shrink: 0; }
.winner-label { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #666; margin: 0 0 0.125rem; }
.grand-label { color: #d97706; }
.winner-name { font-size: 1rem; font-weight: 800; color: #000; margin: 0; line-height: 1.2; }

.winner-body p { font-size: 0.875rem; line-height: 1.6; color: #444; margin: 0 0 0.625rem; }
.winner-body p:last-child { margin-bottom: 0; }

.winner-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.winner-link {
    padding: 0.375rem 0.75rem; border: 1px solid #e8e8e8; border-radius: 4px;
    font-size: 0.8125rem; font-weight: 600; color: #000; text-decoration: none;
    transition: all 0.15s;
}
.winner-link:hover { border-color: #000; }

/* About grid */
.about-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 1rem; }
.about-card { border: 1px solid #e8e8e8; border-radius: 6px; padding: 1.125rem; transition: border-color 0.15s; }
.about-card:hover { border-color: #000; }
.about-card h3 { font-size: 0.9375rem; font-weight: 700; color: #000; margin: 0 0 0.5rem; }
.about-card p { font-size: 0.875rem; line-height: 1.6; color: #444; margin: 0; }

/* Founder video */
.founder-name-text { font-size: 0.875rem; color: #666; margin: -0.5rem 0 0.875rem; }
.founder-video { width: 100%; border-radius: 6px; border: 1px solid #e8e8e8; background: #000; display: block; }

/* Sponsors */
.sponsors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin: 1rem 0; }
.sponsor-card { border: 1px solid #e8e8e8; border-radius: 6px; padding: 1.25rem; text-align: center; text-decoration: none; display: block; transition: border-color 0.15s, box-shadow 0.15s; }
.sponsor-card:hover { border-color: #000; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06); }
.sponsor-logo { width: 64px; height: 64px; object-fit: contain; margin-bottom: 0.75rem; }
.sponsor-card h3 { font-size: 1rem; font-weight: 700; color: #000; margin: 0 0 0.375rem; }
.sponsor-card p { font-size: 0.875rem; color: #444; margin: 0; line-height: 1.5; }
.sponsor-cta { font-size: 0.9375rem; color: #444; margin-top: 1rem; }

/* Modal */
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.55);
    z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;
}
.modal {
    width: min(860px, 100%); max-height: 85vh; background: #fff;
    border-radius: 8px; border: 1px solid #e8e8e8; display: flex; flex-direction: column;
    box-shadow: 0 12px 40px rgba(0,0,0,0.2); overflow: hidden;
}
.modal-top { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e8e8e8; }
.modal-top h2 { margin: 0; font-size: 1.125rem; font-weight: 800; color: #000; }
.modal-close { width: 36px; height: 36px; border: 1px solid #e8e8e8; border-radius: 4px; background: #fafafa; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #000; }
.modal-close:hover { background: #f0f0f0; }
.modal-body { padding: 1.5rem; overflow-y: auto; flex: 1; }
.modal-body h3 { font-size: 1rem; font-weight: 700; color: #000; margin: 0 0 0.75rem; }
.modal-body h4 { font-size: 0.9375rem; font-weight: 700; color: #000; margin: 0 0 0.25rem; }
.modal-body p { font-size: 0.875rem; line-height: 1.6; color: #444; margin: 0 0 0.75rem; }
.modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #e8e8e8; display: flex; justify-content: flex-end; }

.requirements-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
.requirement-item { display: flex; gap: 1rem; align-items: flex-start; }
.requirement-num { flex-shrink: 0; width: 28px; height: 28px; background: #000; color: #fff; font-weight: 700; font-size: 0.8125rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

.legal-box { background: #f5f5f5; border: 1px solid #e8e8e8; border-radius: 4px; padding: 1rem; margin: 1rem 0; }
.legal-box p { font-size: 0.8125rem; color: #555; margin: 0; }

@media (max-width: 768px) {
    .page-container { padding: 5rem 1.25rem 3rem; }
    .page-header h1 { font-size: 2rem; }
    .winners-grid { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; }
    .modal-overlay { padding: 1rem; }
    .modal-top, .modal-body, .modal-footer { padding: 1rem; }
}
</style>
