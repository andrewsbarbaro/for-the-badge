<template>
    <div class="account-detail-background">
        <!-- Particle background -->
        <div class="particle-container">
            <div v-for="i in 60" :key="i" :class="`particle-${(i % 3) + 1}`"></div>
        </div>
        
        <div class="account-detail-page">
            <!-- Show skeleton while session is loading -->
            <AccountSkeleton v-if="sessionLoading" />

            <!-- Show content once session has loaded -->
            <template v-else>
            <!-- Desktop Navigation -->
            <NavBar v-if="!isMobile" />
            
            <!-- Mobile Navigation -->
            <MobileNavBar v-if="isMobile" />
            
            <div class="account-detail-container" :class="{ 'mobile-view': isMobile }">
                <div
                    v-if="pending"
                    class="loading"
                >
                    <div class="spinner" />
                    <p>Loading your account...</p>
                </div>

                <div
                    v-else-if="error"
                    class="error"
                >
                    <h2>Account Not Found</h2>
                    <p>{{ error.statusMessage || 'Account number not found or invalid.' }}</p>
                    <NuxtLink
                        to="/account"
                        class="btn-primary"
                    >Generate New Account</NuxtLink>
                </div>

                <div
                    v-else-if="account"
                    class="account-details"
                >
                    <div class="account-card">
                        <h1>Account Details</h1>
                        <div class="account-number">
                            <label>Account Number</label>
                            <div
                                class="membership-card"
                                :class="{ revealed: showNumber }"
                                :aria-label="showNumber ? 'Hide number' : 'Reveal number'"
                                role="button"
                                tabindex="0"
                                @click="toggleReveal"
                                @keydown.enter.prevent="toggleReveal"
                                @keydown.space.prevent="toggleReveal"
                            >
                                <div class="card-top">
                                <div class="brand">
                                        <img
                                            class="brand-mark"
                                            src="/favicon.png"
                                            alt=""
                                            aria-hidden="true"
                                        >
                                    </div>
                                    <div
                                        class="chip"
                                        aria-hidden="true"
                                    />
                                </div>
                                
                                <div class="card-number">
                                    <span>{{ showNumber ? formattedNumber : maskedNumber }}</span>
                                </div>
                                
                                <div class="card-footer">
                                    <div class="card-info">
                                        <div class="label">
                                            MEMBERSHIP
                                        </div>
                                        <div class="creation-date">
                                            {{ formattedCreationDate }}
                                        </div>
                                    </div>
                                    <button
                                        class="copy-on-card"
                                        :title="copied ? 'Copied' : 'Copy to clipboard'"
                                        @click.stop="copyToClipboard"
                                    >
                                        <span v-if="copied">✓ Copied</span>
                                        <span v-else>Copy</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="reveal-hint">
                                {{ showNumber ? 'Tap to hide' : 'Tap to reveal' }}
                            </div>
                        </div>


                        <div class="account-actions">

                            <PinManagement
                                :account="account"
                                @setup-pin="showPinSetupModal = true"
                                @change-pin="showPinChangeModal = true"
                                @disable-pin="showPinDisableModal = true"
                            />

                            <!-- Badge Board Placements -->
                            <div v-if="myPlacements.length > 0" class="placements-section">
                                <h3 class="placements-title">Badge Board Spaces</h3>
                                <div v-for="p in myPlacements" :key="p.id" class="placement-item">
                                    <div class="placement-badge-thumb" v-html="p.badgeSvg" />
                                    <div class="placement-info">
                                        <span class="placement-size">{{ p.gridWidth }}×{{ p.gridHeight }} cells · ${{ (p.amountPaidCents / 100).toFixed(0) }}</span>
                                        <span :class="['placement-status', `status-${p.status}`]">{{ p.status === 'pending_approval' ? 'under review' : p.status }}</span>
                                        <a v-if="p.linkUrl" :href="p.linkUrl" target="_blank" rel="noopener noreferrer" class="placement-link">{{ p.linkUrl }}</a>
                                    </div>
                                    <NuxtLink to="/" class="placement-view-btn">View on board →</NuxtLink>
                                </div>
                            </div>

                            <div class="danger-zone">
                                <button
                                    class="delete-account-btn"
                                    @click="showDeleteModal = true"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        <div class="account-meta">
                            <p><strong>Created:</strong> {{ formatDate(account.createdAt) }}</p>
                            <p v-if="account.lastUsed">
                                <strong>Last Used:</strong> {{ formatDate(account.lastUsed) }}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    v-else
                    class="error"
                >
                    <h2>Account Not Found</h2>
                    <p>Account number not found or invalid.</p>
                    <NuxtLink
                        to="/account"
                        class="btn-primary"
                    >Generate New Account</NuxtLink>
                </div>
            </div>
        </template>

        <PinPrompt
            v-if="showPinPrompt"
            :accountId="accountId"
            :show="showPinPrompt"
            @pin-verified="handlePinVerified"
            @pin-cancelled="handlePinCancelled"
        />

        <DeleteAccountModal
            v-if="showDeleteModal"
            :account="account"
            :show="showDeleteModal"
            @account-deleted="handleAccountDeleted"
            @modal-cancelled="showDeleteModal = false"
        />

        <PinSetupModal
            v-if="showPinSetupModal"
            :account="account"
            :show="showPinSetupModal"
            @pin-enabled="handlePinEnabled"
            @modal-cancelled="showPinSetupModal = false"
        />

        <PinChangeModal
            v-if="showPinChangeModal"
            :account="account"
            :show="showPinChangeModal"
            @pin-updated="handlePinUpdated"
            @modal-cancelled="showPinChangeModal = false"
        />

        <PinDisableModal
            v-if="showPinDisableModal"
            :account="account"
            :show="showPinDisableModal"
            @pin-disabled="handlePinDisabled"
            @modal-cancelled="showPinDisableModal = false"
        />
    </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

import AccountSkeleton from "~/components/AccountSkeleton.vue";
import DeleteAccountModal from "~/components/DeleteAccountModal.vue";
import NavBar from "~/components/NavBar.vue";
import MobileNavBar from "~/components/MobileNavBar.vue";
import PinChangeModal from "~/components/PinChangeModal.vue";
import PinDisableModal from "~/components/PinDisableModal.vue";
import PinManagement from "~/components/PinManagement.vue";
import PinPrompt from "~/components/PinPrompt.vue";
import PinSetupModal from "~/components/PinSetupModal.vue";
import { isMobileDevice } from '~/utils/deviceDetection';

const route = useRoute();
const accountId = route.params.id;
const showPinPrompt = ref(false);
const pinVerified = ref(false);
const showDeleteModal = ref(false);
const showPinSetupModal = ref(false);
const showPinChangeModal = ref(false);
const showPinDisableModal = ref(false);

// Mobile detection based on user agent
const isMobile = computed(() => {
    if (import.meta.client) {
        return isMobileDevice();
    }
    return false;
});

// Membership card functionality
const showNumber = ref(false);
const copied = ref(false);
const myPlacements = ref([]);

// Use auth composable
const {
    isAuthenticated,
    requiresPin,
    account: sessionAccount,
    accountId: userAccountId,
    isReady,
    refresh: refreshSession,
} = useAuth();

const { getErrorMessage } = useErrorHandler();

// Computed loading state
const sessionLoading = computed(() => !isReady.value);
const pending = ref(false);
const error = ref(null);

// Use session account data
const account = computed(() => sessionAccount.value);

// Account number formatting
const rawNumber = computed(() => String(account.value?.id || "").replace(/\D/g, ""));
const formattedNumber = computed(() => rawNumber.value.replace(/(\d{4})(?=\d)/g, "$1 ").trim());
const maskedNumber = computed(() => {
    const digits = rawNumber.value;
    if (!digits) return "";
    if (digits.length <= 4) return digits;
    const masked = digits.slice(0, -4).replace(/\d/g, "•") + digits.slice(-4);
    return masked.replace(/(\S{4})(?=\S)/g, "$1 ").trim();
});

// Early adopter theme detection
const isEarlyAdopter = computed(() => {
    if (!account.value?.createdAt) return false;
    const createdDate = new Date(account.value.createdAt);
    const earlyAdopterStart = new Date('2025-09-28');
    const earlyAdopterEnd = new Date('2025-10-28');
    return createdDate >= earlyAdopterStart && createdDate <= earlyAdopterEnd;
});

// Format creation date for card display
const formattedCreationDate = computed(() => {
    if (!account.value?.createdAt) return '';
    const date = new Date(account.value.createdAt);
    return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        year: '2-digit' 
    });
});

const refreshAccount = async () =>
{
    try
    {
        pending.value = true;
        error.value = null;

        // Refresh session to get latest account data
        await refreshSession();
        pinVerified.value = true;
    }
    catch (err)
    {
        error.value = err;
    }
    finally
    {
        pending.value = false;
    }
};

onMounted(async () =>
{
    if (import.meta.client)
    {
        // Wait for auth state to be ready
        await nextTick();

        // Check if PIN verification is required
        if (requiresPin.value)
        {
            showPinPrompt.value = true;

            return;
        }

        // Verify the user is accessing their own account (if authenticated)
        if (isAuthenticated.value && userAccountId.value && userAccountId.value !== accountId)
        {
            // User trying to access different account - redirect to their own
            await navigateTo(`/account/${userAccountId.value}`);

            return;
        }

        // Set initial state
        pinVerified.value = true;
        pending.value = false;

        // Load any badge board placements linked to this account
        try {
            const data = await $fetch('/api/homepage/my-placements');
            myPlacements.value = data.placements;
        } catch { /* none */ }
    }
});

const handlePinVerified = async () =>
{
    pinVerified.value = true;
    showPinPrompt.value = false;
    await refreshAccount();
};

const handlePinCancelled = () =>
{
    showPinPrompt.value = false;
    navigateTo("/account");
};

const handleAccountDeleted = () =>
{
    showDeleteModal.value = false;
    navigateTo("/account");
};


const handleAccountUpdated = async () =>
{
    // Session sync is now handled automatically by the PIN API endpoints
    // Just refresh our local account view to show the latest data
    await refreshAccount();
};

const handlePinEnabled = async () =>
{
    showPinSetupModal.value = false;
    await handleAccountUpdated();
};

const handlePinUpdated = async () =>
{
    showPinChangeModal.value = false;
    await handleAccountUpdated();
};

const handlePinDisabled = async () =>
{
    showPinDisableModal.value = false;
    await handleAccountUpdated();
};

const toggleReveal = () => {
    showNumber.value = !showNumber.value;
};

const fallbackCopy = (text) => {
    try {
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        return true;
    } catch (_) {
        return false;
    }
};

const copyToClipboard = async () => {
    const text = rawNumber.value;
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            copied.value = true;
        } else if (fallbackCopy(text)) {
            copied.value = true;
        }
    } catch (_) {
        if (fallbackCopy(text)) {
            copied.value = true;
        }
    } finally {
        if (copied.value) {
            setTimeout(() => (copied.value = false), 2000);
        }
    }
};

const formatDate = (dateString) =>
{
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
</script>

<style scoped>
/* Particle Background */
.account-detail-background {
  min-height: 100vh;
  background-color: #f8fafb;
  position: relative;
  overflow-x: hidden;
}

.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle-1, .particle-2, .particle-3 {
  position: absolute;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 50%;
  animation: float-up 15s infinite linear;
}

.particle-1 {
  width: 4px;
  height: 4px;
  animation-duration: 12s;
}

.particle-2 {
  width: 6px;
  height: 6px;
  animation-duration: 15s;
  background: rgba(0, 0, 0, 0.05);
}

.particle-3 {
  width: 8px;
  height: 8px;
  animation-duration: 18s;
  background: rgba(0, 0, 0, 0.04);
}

/* Generate random positions */
.particle-1:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle-1:nth-child(4) { left: 20%; animation-delay: -2s; }
.particle-1:nth-child(7) { left: 30%; animation-delay: -4s; }
.particle-1:nth-child(10) { left: 40%; animation-delay: -6s; }
.particle-1:nth-child(13) { left: 50%; animation-delay: -8s; }
.particle-1:nth-child(16) { left: 60%; animation-delay: -10s; }
.particle-1:nth-child(19) { left: 70%; animation-delay: -12s; }
.particle-1:nth-child(22) { left: 80%; animation-delay: -14s; }
.particle-1:nth-child(25) { left: 90%; animation-delay: -16s; }
.particle-1:nth-child(28) { left: 5%; animation-delay: -18s; }
.particle-1:nth-child(31) { left: 15%; animation-delay: -20s; }
.particle-1:nth-child(34) { left: 25%; animation-delay: -22s; }
.particle-1:nth-child(37) { left: 35%; animation-delay: -24s; }
.particle-1:nth-child(40) { left: 45%; animation-delay: -26s; }
.particle-1:nth-child(43) { left: 55%; animation-delay: -28s; }
.particle-1:nth-child(46) { left: 65%; animation-delay: -30s; }
.particle-1:nth-child(49) { left: 75%; animation-delay: -32s; }
.particle-1:nth-child(52) { left: 85%; animation-delay: -34s; }
.particle-1:nth-child(55) { left: 95%; animation-delay: -36s; }
.particle-1:nth-child(58) { left: 12%; animation-delay: -38s; }

.particle-2:nth-child(2) { left: 15%; animation-delay: -1s; }
.particle-2:nth-child(5) { left: 25%; animation-delay: -3s; }
.particle-2:nth-child(8) { left: 35%; animation-delay: -5s; }
.particle-2:nth-child(11) { left: 45%; animation-delay: -7s; }
.particle-2:nth-child(14) { left: 55%; animation-delay: -9s; }
.particle-2:nth-child(17) { left: 65%; animation-delay: -11s; }
.particle-2:nth-child(20) { left: 75%; animation-delay: -13s; }
.particle-2:nth-child(23) { left: 85%; animation-delay: -15s; }
.particle-2:nth-child(26) { left: 95%; animation-delay: -17s; }
.particle-2:nth-child(29) { left: 8%; animation-delay: -19s; }
.particle-2:nth-child(32) { left: 18%; animation-delay: -21s; }
.particle-2:nth-child(35) { left: 28%; animation-delay: -23s; }
.particle-2:nth-child(38) { left: 38%; animation-delay: -25s; }
.particle-2:nth-child(41) { left: 48%; animation-delay: -27s; }
.particle-2:nth-child(44) { left: 58%; animation-delay: -29s; }
.particle-2:nth-child(47) { left: 68%; animation-delay: -31s; }
.particle-2:nth-child(50) { left: 78%; animation-delay: -33s; }
.particle-2:nth-child(53) { left: 88%; animation-delay: -35s; }
.particle-2:nth-child(56) { left: 98%; animation-delay: -37s; }
.particle-2:nth-child(59) { left: 22%; animation-delay: -39s; }

.particle-3:nth-child(3) { left: 12%; animation-delay: -1.5s; }
.particle-3:nth-child(6) { left: 22%; animation-delay: -3.5s; }
.particle-3:nth-child(9) { left: 32%; animation-delay: -5.5s; }
.particle-3:nth-child(12) { left: 42%; animation-delay: -7.5s; }
.particle-3:nth-child(15) { left: 52%; animation-delay: -9.5s; }
.particle-3:nth-child(18) { left: 62%; animation-delay: -11.5s; }
.particle-3:nth-child(21) { left: 72%; animation-delay: -13.5s; }
.particle-3:nth-child(24) { left: 82%; animation-delay: -15.5s; }
.particle-3:nth-child(27) { left: 92%; animation-delay: -17.5s; }
.particle-3:nth-child(30) { left: 2%; animation-delay: -19.5s; }
.particle-3:nth-child(33) { left: 17%; animation-delay: -21.5s; }
.particle-3:nth-child(36) { left: 27%; animation-delay: -23.5s; }
.particle-3:nth-child(39) { left: 37%; animation-delay: -25.5s; }
.particle-3:nth-child(42) { left: 47%; animation-delay: -27.5s; }
.particle-3:nth-child(45) { left: 57%; animation-delay: -29.5s; }
.particle-3:nth-child(48) { left: 67%; animation-delay: -31.5s; }
.particle-3:nth-child(51) { left: 77%; animation-delay: -33.5s; }
.particle-3:nth-child(54) { left: 87%; animation-delay: -35.5s; }
.particle-3:nth-child(57) { left: 97%; animation-delay: -37.5s; }
.particle-3:nth-child(60) { left: 7%; animation-delay: -39.5s; }

@keyframes float-up {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.account-detail-page {
  min-height: 100vh;
  position: relative;
  z-index: 2;
}

.account-detail-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  padding-bottom: 2rem;
  position: relative;
  z-index: 3;
}

.account-detail-container.mobile-view {
  padding: 0.75rem;
  padding-top: 68px; /* Account for top nav */
  padding-bottom: 80px; /* Account for bottom nav */
  max-width: 100%;
}

.loading, .error {
  text-align: center;
  color: #1f2937;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.error p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.btn-primary {
  background: #000000;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #1f2937;
  transform: translateY(-2px);
}

.account-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  color: #333;
}

.mobile-view .account-card {
  border-radius: 16px;
  padding: 1.25rem;
}

.account-card h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1a202c;
}

.mobile-view .account-card h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.account-number {
  margin-bottom: 2rem;
}

.mobile-view .account-number {
  margin-bottom: 1.5rem;
}

.account-number label {
  display: block;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #4a5568;
}

.mobile-view .account-number label {
  font-size: 0.9375rem;
  margin-bottom: 0.75rem;
}

.number-display {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  letter-spacing: 2px;
}

/* Credit-card style membership card */
.membership-card {
  position: relative;
  border-radius: 18px;
  padding: 22px;
  color: #fff;
  background: radial-gradient(1200px 500px at 80% -20%, rgba(255,255,255,.15), transparent),
  linear-gradient(135deg, #1f2937, #111827);
  box-shadow: 0 20px 40px rgba(0,0,0,.3);
  text-align: left;
  user-select: none;
  margin-bottom: 12px;
  width: 100%;
  min-height: 160px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.mobile-view .membership-card {
  border-radius: 14px;
  padding: 16px;
  min-height: 140px;
  margin-bottom: 10px;
  box-shadow: 0 10px 30px rgba(102,126,234,.3);
}

/* Early Adopter Theme */
.membership-card.early-adopter {
  background: radial-gradient(1200px 500px at 80% -20%, rgba(255,215,0,.35), transparent),
  linear-gradient(135deg, #ff6b35, #f7931e, #ffd700);
  box-shadow: 0 20px 40px rgba(255,183,3,.4), 0 0 20px rgba(255,215,0,.2);
}

.membership-card.early-adopter::after {
  background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,.2) 50%, transparent 60%);
}

.membership-card:focus-visible {
  box-shadow: 0 0 0 4px rgba(0,0,0,.3), 0 20px 40px rgba(0,0,0,.2);
}

.membership-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,.12) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform .8s ease;
}

.membership-card.revealed::after {
  transform: translateX(100%);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.mobile-view .card-top {
  margin-bottom: 14px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: none;
  font-size: 1.05rem;
}

.mobile-view .brand {
  font-size: 0.95rem;
  gap: 6px;
}

.early-adopter-badge {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,.3));
}

.early-adopter-badge img {
  display: block;
}

.brand-mark {
  width: 20px;
  height: 20px;
  display: block;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.2));
}

.mobile-view .brand-mark {
  width: 18px;
  height: 18px;
}

.chip {
  width: 42px;
  height: 30px;
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.6));
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.08);
}

.mobile-view .chip {
  width: 36px;
  height: 26px;
  border-radius: 5px;
}

.early-adopter-chip {
  background: linear-gradient(180deg, rgba(255,215,0,.9), rgba(255,183,3,.7));
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
}

.card-number {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 1.4rem;
  letter-spacing: .08em;
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
  margin-bottom: 20px;
}

.mobile-view .card-number {
  font-size: 1.15rem;
  margin-bottom: 14px;
  letter-spacing: .06em;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: .75rem;
  justify-content: space-between;
  flex-wrap: wrap;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.label {
  opacity: .85;
  font-weight: 700;
  letter-spacing: .18em;
  font-size: .8rem;
}

.mobile-view .label {
  font-size: .75rem;
  letter-spacing: .15em;
}

.creation-date {
  opacity: .75;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .75rem;
  letter-spacing: .05em;
}

.mobile-view .creation-date {
  font-size: .7rem;
}

.copy-on-card {
  background: rgba(255,255,255,.18);
  color: #fff;
  border: 1px solid rgba(255,255,255,.35);
  padding: .5rem .9rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s ease;
  min-height: 36px;
}

.mobile-view .copy-on-card {
  padding: .5rem .75rem;
  font-size: 0.875rem;
  border-radius: 6px;
  min-height: 40px;
}

.copy-on-card:hover {
  background: rgba(255,255,255,.28);
  transform: translateY(-1px);
}

.mobile-view .copy-on-card:hover {
  transform: none;
}

.mobile-view .copy-on-card:active {
  transform: scale(0.98);
  background: rgba(255,255,255,.35);
}

.reveal-hint {
  text-align: center;
  color: #64748b;
  font-size: .9rem;
  user-select: none;
  margin-bottom: 1rem;
}

.mobile-view .reveal-hint {
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.credit-info {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.mobile-view .credit-info {
  padding: 1.25rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.credit-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.credit-balance .label {
  font-weight: 600;
  color: #4a5568;
}

.mobile-view .credit-balance .label {
  font-size: 0.9375rem;
}

.credit-balance .amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.mobile-view .credit-balance .amount {
  font-size: 1.375rem;
}

.credit-usage .documents {
  color: #4a5568;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.25rem;
}

.mobile-view .credit-usage .documents {
  font-size: 0.875rem;
}

.credit-usage .rate-limit {
  color: #718096;
  font-size: 0.8rem;
  display: block;
}

.mobile-view .credit-usage .rate-limit {
  font-size: 0.75rem;
}

.account-actions {
  margin-bottom: 2rem;
}

.mobile-view .account-actions {
  margin-bottom: 1.5rem;
}

.credit-purchase-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.mobile-view .credit-purchase-section {
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border-radius: 10px;
}

.credit-purchase-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.mobile-view .credit-purchase-section h3 {
  font-size: 1.125rem;
}

.credit-purchase-section p {
  color: #4a5568;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.mobile-view .credit-purchase-section p {
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
}

/* Badge Board placements */
.placements-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e8e8e8;
}

.placements-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin: 0 0 1rem;
}

.placement-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-bottom: 0.625rem;
  transition: border-color 0.15s;
}

.placement-item:hover { border-color: #000; }

.placement-badge-thumb {
  width: 80px;
  height: 28px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.placement-badge-thumb :deep(svg) { width: 100%; height: 100%; display: block; }

.placement-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.placement-size { font-size: 0.8125rem; color: #555; font-weight: 600; }

.placement-status {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.status-active { color: #15803d; }
.status-pending_approval, .status-pending { color: #b45309; }
.status-denied { color: #dc2626; }

.placement-link {
  font-size: 0.75rem;
  color: #888;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.placement-view-btn {
  font-size: 0.75rem;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.placement-view-btn:hover { text-decoration: underline; text-underline-offset: 2px; }

.danger-zone {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #fed7d7;
}

.mobile-view .danger-zone {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
}

.delete-account-btn {
  background: transparent;
  color: #ef4444;
  border: 1.5px solid #fca5a5;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  min-height: 48px;
}

.mobile-view .delete-account-btn {
  padding: 0.875rem 1.25rem;
  font-size: 0.9375rem;
  border-radius: 10px;
}

.delete-account-btn:hover {
  background: #fef2f2;
  border-color: #ef4444;
  transform: translateY(-1px);
}

.mobile-view .delete-account-btn:hover {
  transform: none;
}

.mobile-view .delete-account-btn:active {
  transform: scale(0.98);
  background: #9b2c2c;
}

.account-meta {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  font-size: 0.9rem;
  color: #4a5568;
}

.mobile-view .account-meta {
  padding-top: 0.875rem;
  font-size: 0.875rem;
}

.account-meta p {
  margin-bottom: 0.5rem;
}

.mobile-view .account-meta p {
  margin-bottom: 0.375rem;
}

</style>