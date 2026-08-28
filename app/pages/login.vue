<template>
    <div class="page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />

        <div class="page-container">
            <div class="page-header">
                <h1>Sign In</h1>
                <p class="subtitle">Enter your account number to continue</p>
            </div>

            <div class="page-content">
                <section class="section login-section">
                    <div class="login-form-wrap">
                        <!-- Login Form -->
                        <form v-if="!showPinChallenge" @submit.prevent="handleLogin">
                            <div class="form-group">
                                <label for="accountId" class="form-label">Account Number</label>
                                <input
                                    id="accountId"
                                    v-model="accountId"
                                    type="text"
                                    placeholder="Enter your 16-digit account number"
                                    class="form-input"
                                    :disabled="isLoading"
                                    @keyup="formatAccountId"
                                />
                                <p v-if="accountIdError" class="error-text">{{ accountIdError }}</p>
                            </div>

                            <button type="submit" class="btn-submit" :disabled="isLoading || !isValidAccountId">
                                <span v-if="isLoading">Signing in...</span>
                                <span v-else>Sign In</span>
                            </button>
                        </form>

                        <!-- PIN Challenge Form -->
                        <form v-else-if="showPinChallenge" @submit.prevent="handlePinChallenge">
                            <div class="form-group">
                                <label for="pin" class="form-label">Enter your PIN</label>
                                <input
                                    id="pin"
                                    v-model="pin"
                                    type="password"
                                    placeholder="Enter your PIN"
                                    class="form-input"
                                    :disabled="isLoading"
                                    maxlength="6"
                                />
                                <p v-if="pinError" class="error-text">{{ pinError }}</p>
                            </div>

                            <button type="submit" class="btn-submit" :disabled="isLoading || !pin">
                                <span v-if="isLoading">Verifying...</span>
                                <span v-else>Verify PIN</span>
                            </button>

                            <button type="button" class="btn-back" :disabled="isLoading" @click="handleBackToLogin">
                                Back to Login
                            </button>
                        </form>

                        <!-- General Error -->
                        <p v-if="generalError" class="error-message">{{ generalError }}</p>

                        <NuxtLink to="/account" class="create-account-link">
                            Don't have an account? Create one
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </NuxtLink>
                    </div>
                </section>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { isMobileDevice } from '~/utils/deviceDetection';

const isMobile = computed(() => import.meta.client ? isMobileDevice() : false);

function isValidLuhn(number: string): boolean {
    if (!/^\d+$/.test(number) || number.length < 2) return false;
    const body = number.slice(0, -1);
    const check = parseInt(number[number.length - 1], 10);
    let sum = 0;
    let shouldDouble = true;
    for (let i = body.length - 1; i >= 0; i--) {
        let d = parseInt(body[i], 10);
        if (shouldDouble) { d *= 2; if (d > 9) d -= 9; }
        sum += d;
        shouldDouble = !shouldDouble;
    }
    const mod = sum % 10;
    const checkDigit = mod === 0 ? 0 : 10 - mod;
    return checkDigit === check;
}

const accountService = useAccountService();
const { push } = useRouter();

const accountId = ref("");
const pin = ref("");
const isLoading = ref(false);
const showPinChallenge = ref(false);
const accountIdError = ref("");
const pinError = ref("");
const generalError = ref("");

const isValidAccountId = computed(() => /^\d{16}$/.test(accountId.value) && isValidLuhn(accountId.value));

const formatAccountId = (): void => {
    accountId.value = accountId.value.replace(/\D/g, "").slice(0, 16);
    accountIdError.value = "";
};

const handleLogin = async (): Promise<void> => {
    generalError.value = "";
    accountIdError.value = "";
    if (!isValidAccountId.value) { accountIdError.value = "Invalid account number format"; return; }
    isLoading.value = true;
    try {
        const response = await accountService.login({ userId: accountId.value });
        if (response.challenge) {
            showPinChallenge.value = true;
            pin.value = "";
        } else {
            const { refresh: refreshSession } = useAuth();
            await refreshSession();
            await push("/account/" + accountId.value);
        }
    } catch (error: unknown) {
        const apiError = error as Record<string, unknown>;
        generalError.value = (apiError?.data as Record<string, unknown>)?.message as string || "Login failed. Please try again.";
    } finally {
        isLoading.value = false;
    }
};

const handlePinChallenge = async (): Promise<void> => {
    generalError.value = "";
    pinError.value = "";
    if (!pin.value) { pinError.value = "PIN is required"; return; }
    isLoading.value = true;
    try {
        const { $csrfFetch } = useNuxtApp();
        await $csrfFetch("/api/account/login/challenge", { method: "POST", body: { pin: pin.value } });
        const { refresh: refreshSession } = useAuth();
        await refreshSession();
        await push("/account/" + accountId.value);
    } catch (error: unknown) {
        const apiError = error as Record<string, unknown>;
        pinError.value = (apiError?.data as Record<string, unknown>)?.message as string || "Invalid PIN. Please try again.";
    } finally {
        isLoading.value = false;
    }
};

const handleBackToLogin = (): void => {
    showPinChallenge.value = false;
    pin.value = "";
    pinError.value = "";
    generalError.value = "";
};

definePageMeta({ layout: false });
</script>

<style scoped>
.page { min-height: 100vh; background: #fff; display: flex; flex-direction: column; }
.page-container { flex: 1; max-width: 720px; margin: 0 auto; padding: 6rem 2rem 4rem; width: 100%; box-sizing: border-box; }
.page-header { margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 2px solid #000; }
.page-header h1 { font-size: 2.5rem; font-weight: 800; color: #000; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
.subtitle { font-size: 1rem; color: #666; margin: 0; }
.page-content { display: flex; flex-direction: column; gap: 2rem; }
.section { padding-bottom: 2rem; border-bottom: 1px solid #e8e8e8; }
.section:last-of-type { border-bottom: none; }

.login-section { display: flex; justify-content: center; }

.login-form-wrap {
    width: 100%;
    max-width: 440px;
}

.form-group { margin-bottom: 1.25rem; }

.form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #000;
    margin-bottom: 0.375rem;
}

.form-input {
    width: 100%;
    padding: 0.75rem 0.875rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    color: #000;
    background: #fff;
    transition: border-color 0.15s;
    box-sizing: border-box;
}

/* Account number input gets monospace feel */
#accountId {
    font-size: 1.125rem;
    letter-spacing: 0.1em;
    font-family: 'Monaco', 'Menlo', ui-monospace, monospace;
}

.form-input:focus {
    outline: none;
    border-color: #000;
}

.form-input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
    color: #999;
}

.error-text {
    font-size: 0.8125rem;
    color: #c00;
    margin: 0.375rem 0 0;
}

.error-message {
    font-size: 0.875rem;
    color: #c00;
    background: #fff5f5;
    border: 1px solid #fcc;
    border-radius: 4px;
    padding: 0.75rem 1rem;
    margin: 0.75rem 0;
}

.btn-submit {
    width: 100%;
    padding: 0.875rem;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
    margin-bottom: 0.75rem;
}

.btn-submit:hover:not(:disabled) { opacity: 0.85; }
.btn-submit:disabled { opacity: 0.45; cursor: not-allowed; }

.btn-back {
    width: 100%;
    padding: 0.875rem;
    background: transparent;
    color: #000;
    border: 1px solid #000;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
}

.btn-back:hover:not(:disabled) { background: #f5f5f5; }
.btn-back:disabled { opacity: 0.45; cursor: not-allowed; }

.create-account-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    margin-top: 2rem;
    font-size: 0.9375rem;
    color: #000;
    font-weight: 600;
    text-decoration: none;
    text-underline-offset: 2px;
}

.create-account-link:hover { text-decoration: underline; }

@media (max-width: 768px) {
    .page-container { padding: 5rem 1.25rem 3rem; }
    .page-header h1 { font-size: 2rem; }
}
</style>
