<template>
    <div class="page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />

        <div class="page-container">
            <div class="page-header">
                <h1>My Badge Board Spaces</h1>
                <p class="subtitle">Pixel spaces you've purchased on the badge board.</p>
            </div>

            <div class="page-content">
                <div v-if="loading" class="loading-state">
                    <div class="spinner" />
                    <span>Loading your spaces…</span>
                </div>

                <div v-else-if="!placements.length" class="empty-state">
                    <p>You haven't purchased any badge board space yet.</p>
                    <NuxtLink to="/" class="cta-btn">View the Badge Board →</NuxtLink>
                </div>

                <template v-else>
                    <div v-for="p in placements" :key="p.id" class="placement-card">
                        <div class="placement-preview">
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <div class="preview-inner" v-html="p.badgeSvg" />
                        </div>

                        <div class="placement-details">
                            <div class="placement-meta">
                                <span :class="['status-badge', `status-${p.status}`]">
                                    {{ statusLabel(p.status) }}
                                </span>
                                <span class="placement-size">{{ p.gridWidth }}×{{ p.gridHeight }} · {{ p.pixelCount }} pixels · ${{ (p.amountPaidCents / 100).toFixed(0) }}</span>
                            </div>
                            <p class="placement-owner"><strong>{{ p.ownerName }}</strong></p>
                            <a v-if="p.linkUrl" :href="p.linkUrl" target="_blank" rel="noopener noreferrer" class="placement-link">{{ p.linkUrl }}</a>
                        </div>

                        <div v-if="p.status === 'active' || p.status === 'pending_approval'" class="placement-actions">
                            <button class="edit-btn" @click="startEdit(p)">Edit badge / link</button>
                            <NuxtLink to="/" class="view-btn">View on board →</NuxtLink>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Edit modal -->
        <Transition name="modal-fade">
            <div v-if="editingPlacement" class="modal-backdrop" @click.self="cancelEdit">
                <div class="modal">
                    <button class="modal-x" @click="cancelEdit">✕</button>
                    <h2>Edit your space</h2>
                    <p class="modal-note">Changes apply immediately once saved. Your space position stays the same.</p>

                    <div class="mfield">
                        <label>New badge URL <span class="opt">(leave blank to keep current)</span></label>
                        <div class="url-row">
                            <input v-model="editForm.badgeUrl" type="url" placeholder="https://forthebadge.com/api/badges/generate?…" @blur="fetchEditBadge">
                            <button class="load-btn" :disabled="!editForm.badgeUrl || loadingEdit" @click="fetchEditBadge">{{ loadingEdit ? '…' : 'Preview' }}</button>
                        </div>
                        <div v-if="editPreview" class="edit-preview">
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <div v-html="editPreview" />
                        </div>
                        <p v-if="editBadgeError" class="edit-error">{{ editBadgeError }}</p>
                    </div>

                    <div class="mfield">
                        <label>Link URL <span class="opt">(where clicking your badge goes)</span></label>
                        <input v-model="editForm.linkUrl" type="url" placeholder="https://your-project.com">
                    </div>

                    <p v-if="saveError" class="edit-error">{{ saveError }}</p>

                    <div class="modal-footer">
                        <button class="btn-secondary" @click="cancelEdit">Cancel</button>
                        <button class="btn-primary" :disabled="saving" @click="saveEdit">
                            {{ saving ? 'Saving…' : 'Save changes' }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { isMobileDevice } from '~/utils/deviceDetection';

const isMobile = computed(() => import.meta.client ? isMobileDevice() : false);
definePageMeta({ layout: false });
useSeoMeta({ title: 'My Badge Board Spaces — For the Badge' });

const loading = ref(true);
const placements = ref<any[]>([]);

const editingPlacement = ref<any>(null);
const editForm = ref({ badgeUrl: '', linkUrl: '' });
const editPreview = ref('');
const editBadgeError = ref('');
const loadingEdit = ref(false);
const saving = ref(false);
const saveError = ref('');

function statusLabel(status: string) {
    if (status === 'pending_approval') return 'Under Review';
    if (status === 'active') return 'Live';
    if (status === 'denied') return 'Denied';
    return 'Pending';
}

function normalizeSvg(svg: string) {
    if (!svg) return svg;
    return svg.replace(/<svg(\b[^>]*)>/i, (_m, attrs) => {
        const cleaned = attrs.replace(/\bwidth="[^"]*"/gi, '').replace(/\bheight="[^"]*"/gi, '').replace(/\bpreserveAspectRatio="[^"]*"/gi, '');
        return `<svg${cleaned} width="100%" height="100%" preserveAspectRatio="none">`;
    });
}

function startEdit(p: any) {
    editingPlacement.value = p;
    editForm.value = { badgeUrl: '', linkUrl: p.linkUrl || '' };
    editPreview.value = '';
    editBadgeError.value = '';
    saveError.value = '';
}

function cancelEdit() {
    editingPlacement.value = null;
}

async function fetchEditBadge() {
    if (!editForm.value.badgeUrl) return;
    loadingEdit.value = true; editBadgeError.value = '';
    try {
        const res = await fetch(editForm.value.badgeUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!text.includes('<svg')) throw new Error('Not an SVG');
        editPreview.value = normalizeSvg(text);
    } catch { editBadgeError.value = 'Could not load badge — check the URL.'; editPreview.value = ''; }
    finally { loadingEdit.value = false; }
}

async function saveEdit() {
    if (!editingPlacement.value) return;
    saving.value = true; saveError.value = '';
    try {
        const { $csrfFetch } = useNuxtApp();
        const body: Record<string, string> = {};
        if (editPreview.value) body.badgeSvg = editPreview.value;
        if (editForm.value.linkUrl !== editingPlacement.value.linkUrl) body.linkUrl = editForm.value.linkUrl;

        await $csrfFetch(`/api/homepage/placement/${editingPlacement.value.id}`, { method: 'PATCH', body });

        // Update local state
        const idx = placements.value.findIndex(p => p.id === editingPlacement.value.id);
        if (idx !== -1) {
            if (body.badgeSvg) placements.value[idx].badgeSvg = body.badgeSvg;
            if (body.linkUrl !== undefined) placements.value[idx].linkUrl = body.linkUrl;
        }
        cancelEdit();
    } catch (err: any) {
        saveError.value = err?.data?.statusMessage || 'Save failed — try again.';
    } finally {
        saving.value = false;
    }
}

onMounted(async () => {
    try {
        const data = await $fetch<{ placements: any[] }>('/api/homepage/my-placements');
        placements.value = data.placements.map(p => ({ ...p, badgeSvg: normalizeSvg(p.badgeSvg) }));
    } catch { /* redirect to login handled by middleware */ }
    finally { loading.value = false; }
});
</script>

<style scoped>
.page { min-height: 100vh; background: #fff; display: flex; flex-direction: column; }
.page-container { flex: 1; max-width: 820px; margin: 0 auto; padding: 6rem 2rem 4rem; width: 100%; box-sizing: border-box; }
.page-header { margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 2px solid #000; }
.page-header h1 { font-size: 2.5rem; font-weight: 800; color: #000; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
.subtitle { font-size: 1rem; color: #666; margin: 0; }
.page-content { display: flex; flex-direction: column; gap: 1rem; }

.loading-state { display: flex; align-items: center; gap: 0.75rem; color: #888; padding: 2rem 0; }
.spinner { width: 18px; height: 18px; border: 2px solid #e5e5e5; border-top-color: #000; border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.empty-state { text-align: center; padding: 3rem 0; color: #666; }
.cta-btn { display: inline-block; margin-top: 1rem; background: #000; color: #fff; text-decoration: none; padding: 0.625rem 1.25rem; border-radius: 7px; font-weight: 700; font-size: 0.9rem; }

.placement-card { border: 1px solid #e8e8e8; border-radius: 12px; padding: 1.25rem; display: flex; gap: 1.25rem; align-items: flex-start; transition: border-color 0.15s; }
.placement-card:hover { border-color: #000; }

.placement-preview { width: 120px; height: 42px; flex-shrink: 0; background: #f5f5f5; border-radius: 6px; overflow: hidden; display: flex; align-items: center; }
.preview-inner { width: 100%; height: 100%; display: flex; align-items: center; }
.preview-inner :deep(svg) { width: 100%; height: 100%; display: block; }

.placement-details { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.25rem; }
.placement-meta { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }

.status-badge { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 0.2rem 0.5rem; border-radius: 100px; }
.status-active { background: #dcfce7; color: #15803d; }
.status-pending_approval { background: #fef9c3; color: #854d0e; }
.status-denied { background: #fee2e2; color: #991b1b; }
.status-pending { background: #f1f5f9; color: #64748b; }

.placement-size { font-size: 0.8125rem; color: #888; }
.placement-owner { font-size: 0.9375rem; color: #000; margin: 0; }
.placement-link { font-size: 0.8125rem; color: #888; text-decoration: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
.placement-link:hover { color: #000; }

.placement-actions { display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0; }
.edit-btn { background: #fff; border: 1.5px solid #e0e0e0; color: #000; border-radius: 6px; padding: 0.375rem 0.75rem; font-size: 0.8125rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: border-color 0.12s; font-family: inherit; }
.edit-btn:hover { border-color: #000; }
.view-btn { text-align: center; font-size: 0.8125rem; font-weight: 700; color: #000; text-decoration: none; padding: 0.375rem 0.75rem; }
.view-btn:hover { text-decoration: underline; text-underline-offset: 2px; }

/* Edit modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.18s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal { background: #fff; border-radius: 14px; width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; padding: 2rem; position: relative; }
.modal-x { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.125rem; color: #bbb; cursor: pointer; }
.modal-x:hover { color: #000; }
.modal h2 { font-size: 1.375rem; font-weight: 800; color: #000; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
.modal-note { font-size: 0.8125rem; color: #888; margin: 0 0 1.5rem; }
.mfield { margin-bottom: 1rem; }
.mfield label { display: block; font-size: 0.8125rem; font-weight: 700; color: #000; margin-bottom: 0.375rem; }
.opt { font-weight: 400; color: #aaa; }
.url-row { display: flex; gap: 0.5rem; }
.mfield input, .url-row input { flex: 1; width: 100%; padding: 0.5625rem 0.75rem; border: 1.5px solid #e0e0e0; border-radius: 7px; font-size: 0.875rem; color: #000; background: #fff; box-sizing: border-box; font-family: inherit; }
.mfield input:focus, .url-row input:focus { outline: none; border-color: #000; }
.load-btn { background: #000; color: #fff; border: none; border-radius: 7px; padding: 0 0.875rem; font-size: 0.875rem; font-weight: 700; cursor: pointer; white-space: nowrap; font-family: inherit; }
.load-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.edit-preview { background: #f5f5f5; border-radius: 6px; padding: 0.5rem; margin-top: 0.5rem; height: 40px; display: flex; align-items: center; overflow: hidden; }
.edit-preview :deep(svg) { width: auto; height: 100%; display: block; }
.edit-error { font-size: 0.8125rem; color: #ef4444; margin: 0.375rem 0 0; }
.modal-footer { display: flex; gap: 0.625rem; justify-content: flex-end; margin-top: 1.5rem; }
.btn-secondary { background: transparent; border: 1.5px solid #e0e0e0; color: #555; border-radius: 7px; padding: 0.5625rem 0.875rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: inherit; }
.btn-secondary:hover { border-color: #000; color: #000; }
.btn-primary { background: #000; color: #fff; border: none; border-radius: 7px; padding: 0.5625rem 1.125rem; font-size: 0.875rem; font-weight: 700; cursor: pointer; font-family: inherit; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 600px) {
    .placement-card { flex-direction: column; }
    .placement-preview { width: 100%; height: 36px; }
    .placement-actions { flex-direction: row; width: 100%; }
    .edit-btn, .view-btn { flex: 1; text-align: center; }
    .page-header h1 { font-size: 2rem; }
    .page-container { padding: 5rem 1.25rem 3rem; }
}
</style>
