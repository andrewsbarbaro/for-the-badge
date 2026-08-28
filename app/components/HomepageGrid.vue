<template>
    <div class="board-root">

        <!-- ── Left sidebar ───────────────────────────────────────────── -->
        <aside class="board-sidebar">
            <div class="sidebar-inner">
                <h1 class="hero-title">The Badge Board</h1>

                <div class="hero-copy">
                    <p class="copy-lead">Advertise your</p>
                    <p class="copy-struck">Disruptive Startup</p>
                    <p class="copy-struck">AI-Powered Platform</p>
                    <p class="copy-struck">Web3 Vision</p>
                    <p class="copy-plain">Actual thing that needs a badge.</p>
                </div>

                <p class="hero-body">
                    Three million projects use For the Badge. Own a permanent piece
                    of the page they all come from. Once a space is claimed, it's gone —
                    nobody else can ever own those pixels.
                </p>

                <!-- Stats -->
                <div class="sidebar-stats">
                    <div class="sstat">
                        <span class="sstat-num">{{ props.stats.uniqueVisitors > 0 ? props.stats.uniqueVisitors.toLocaleString() : '—' }}</span>
                        <span class="sstat-label">
                            <span class="live-dot" />unique visitors (30d)
                        </span>
                    </div>
                    <div class="sstat">
                        <span class="sstat-num">{{ props.stats.totalRequests > 0 ? props.stats.totalRequests.toLocaleString() : '—' }}</span>
                        <span class="sstat-label">page requests (30d)</span>
                    </div>
                    <div class="sstat">
                        <span class="sstat-num">{{ props.stats.countries > 0 ? props.stats.countries : '—' }}</span>
                        <span class="sstat-label">countries</span>
                    </div>
                    <div class="sstat">
                        <span class="sstat-num">{{ (GRID_COLS * GRID_ROWS - totalPixelsSold).toLocaleString() }}</span>
                        <span class="sstat-label">pixels left</span>
                    </div>
                </div>
                <p class="cf-note"><span class="live-dot" />Live via Cloudflare Analytics</p>

                <!-- How-to -->
                <div class="how-to">
                    <button class="how-toggle" @click="howToOpen = !howToOpen">
                        <span>How to buy a permanent spot</span>
                        <svg class="how-arrow" :class="{ open: howToOpen }" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7,10L12,15L17,10H7Z" />
                        </svg>
                    </button>
                    <div v-show="howToOpen" class="how-body">
                        <div class="step">
                            <span class="step-n">01</span>
                            <div>
                                <strong>Drag a space</strong>
                                <span>Anywhere white is fair game. Claimed spaces are gone forever — nobody else can take them once you buy.</span>
                            </div>
                        </div>
                        <div class="step">
                            <span class="step-n">02</span>
                            <div>
                                <strong>Build your badge</strong>
                                <span>Use our mini builder, paste a badge URL, or hit the <NuxtLink to="/generator" class="step-link">generator</NuxtLink> first.</span>
                            </div>
                        </div>
                        <div class="step">
                            <span class="step-n">03</span>
                            <div>
                                <strong>Pay once. Outlive us.</strong>
                                <span>No subscription, no renewal. Your badge lives here permanently.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pricing-tag">
                    <strong>$1 per pixel</strong>
                    <span>· permanent · no renewals</span>
                </div>
            </div>
        </aside>

        <!-- ── Right: label bar + grid ─────────────────────────────────── -->
        <div class="board-grid-area">
            <!-- Label bar -->
            <div class="grid-label-bar">
                <span class="grid-label-text">
                    {{ (GRID_COLS * GRID_ROWS - totalPixelsSold).toLocaleString() }} of {{ (GRID_COLS * GRID_ROWS).toLocaleString() }} pixels unclaimed
                </span>
                <div class="grid-label-right">
                    <span class="grid-legend">
                        <span class="legend-dot legend-free" />free
                        <span class="legend-dot legend-taken" />claimed forever
                    </span>
                    <div class="zoom-controls">
                        <button class="zoom-btn" :disabled="zoomMultiplier <= ZOOM_MIN" title="Zoom out" @click="zoomOut">−</button>
                        <button class="zoom-reset" :title="`${Math.round(zoomMultiplier * 100)}% — click to reset`" @click="zoomReset">
                            {{ Math.round(zoomMultiplier * 100) }}%
                        </button>
                        <button class="zoom-btn" :disabled="zoomMultiplier >= ZOOM_MAX" title="Zoom in" @click="zoomIn">+</button>
                    </div>
                </div>
            </div>

            <!-- Grid -->
            <div class="grid-wrap">
                <div class="grid-scroll" ref="gridScroll">
                    <div
                        class="grid-outer"
                        ref="gridOuter"
                        @mousedown="onMouseDown"
                        @mousemove="onMouseMove"
                        @mouseup="onMouseUp"
                        @mouseleave="onMouseLeave"
                        @touchstart="onTouchStart"
                        @touchmove="onTouchMove"
                        @touchend="onTouchEnd"
                    >
                        <div class="grid-canvas" ref="gridCanvas">
                            <!-- Placed badges -->
                            <template v-for="p in placements" :key="p.id">
                                <a
                                    v-if="p.linkUrl"
                                    :href="p.linkUrl"
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    class="placement"
                                    :style="placementStyle(p)"
                                    @mouseenter="showTooltip($event, p)"
                                    @mouseleave="hideTooltip"
                                    @click.stop
                                >
                                    <!-- eslint-disable-next-line vue/no-v-html -->
                                    <div class="placement-inner" v-html="p.badgeSvg" />
                                </a>
                                <div
                                    v-else
                                    class="placement"
                                    :style="placementStyle(p)"
                                    @mouseenter="showTooltip($event, p)"
                                    @mouseleave="hideTooltip"
                                >
                                    <!-- eslint-disable-next-line vue/no-v-html -->
                                    <div class="placement-inner" v-html="p.badgeSvg" />
                                </div>
                            </template>

                            <!-- Selection box (shown while dragging or when no badge preview yet) -->
                            <div
                                v-if="liveSelection && (isDragging || !resolvedSvg)"
                                class="sel-box"
                                :style="selBoxStyle(liveSelection)"
                            />

                            <!-- Live badge preview — shown in the selected space when a badge is loaded -->
                            <Transition name="preview-fade">
                                <div
                                    v-if="confirmedSel && resolvedSvg && !isDragging"
                                    class="preview-placement"
                                    :style="selBoxStyle(confirmedSel)"
                                >
                                    <!-- eslint-disable-next-line vue/no-v-html -->
                                    <div class="placement-inner" v-html="resolvedSvg" />
                                    <div class="preview-label">PREVIEW</div>
                                </div>
                            </Transition>

                            <!-- Floating price popup -->
                            <Transition name="pop-in">
                                <div
                                    v-if="confirmedSel && !isDragging"
                                    class="sel-popup"
                                    :style="popupStyle(confirmedSel)"
                                    @mousedown.stop
                                    @touchstart.stop
                                >
                                    <div class="sel-popup-info">
                                        <span class="sel-popup-size">{{ confirmedSel.w }}×{{ confirmedSel.h }}</span>
                                        <span class="sel-popup-price">${{ formatPrice(confirmedSel.w * confirmedSel.h) }}</span>
                                    </div>
                                    <div class="sel-popup-actions">
                                        <button class="sel-popup-cancel" @click.stop="confirmedSel = null" aria-label="Clear">✕</button>
                                        <button class="sel-popup-buy" @click.stop="openModal">
                                            {{ resolvedSvg ? 'Buy' : 'Add badge' }} →
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hint -->
            <p class="grid-hint">
                <template v-if="confirmedSel && !isDragging">
                    {{ confirmedSel.w }}×{{ confirmedSel.h }} selected — ${{ formatPrice(confirmedSel.w * confirmedSel.h) }} ·
                    <button class="hint-clear" @click="confirmedSel = null">clear</button>
                </template>
                <template v-else>Drag anywhere on the grid to claim your space</template>
            </p>
        </div>

        <!-- ── Tooltip ─────────────────────────────────────────────────── -->
        <div v-if="tooltip.visible" class="grid-tooltip" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
            <strong>{{ tooltip.ownerName }}</strong>
            <span>Claimed forever</span>
            <span v-if="tooltip.linkUrl" class="tooltip-url">{{ tooltip.linkUrl }}</span>
        </div>

        <!-- ── Purchase modal ─────────────────────────────────────────── -->
        <Teleport to="body">
            <Transition name="modal-fade">
                <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
                    <div class="modal" role="dialog" aria-modal="true">
                        <button class="modal-x" @click="closeModal" aria-label="Close">✕</button>

                        <!-- Always-visible badge strip -->
                        <div v-if="resolvedSvg" class="modal-badge-strip">
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <div class="modal-badge-preview" v-html="resolvedSvg" />
                            <button class="modal-badge-change" @click="modalStep = 1">Change badge</button>
                        </div>

                        <div class="modal-step-header">
                            <span :class="['mstep', modalStep === 1 && 'mstep-active']">
                                <span class="mstep-dot">1</span>Badge
                            </span>
                            <span class="mstep-arrow">→</span>
                            <span :class="['mstep', modalStep === 2 && 'mstep-active']">
                                <span class="mstep-dot">2</span>Details
                            </span>
                            <span class="mstep-arrow">→</span>
                            <span :class="['mstep', modalStep === 3 && 'mstep-active']">
                                <span class="mstep-dot">3</span>Pay
                            </span>
                        </div>

                        <!-- Step 1 -->
                        <template v-if="modalStep === 1">
                            <h2 class="modal-h">Design your badge</h2>
                            <div class="builder-tabs">
                                <button :class="['btab', builderTab === 'build' && 'btab-active']" @click="builderTab = 'build'">Build it</button>
                                <button :class="['btab', builderTab === 'url' && 'btab-active']" @click="builderTab = 'url'">Badge URL</button>
                            </div>

                            <div v-if="builderTab === 'build'" class="builder-panel">
                                <div class="builder-fields">
                                    <div class="mfield">
                                        <label>Left label</label>
                                        <input v-model="builder.left" type="text" maxlength="30" placeholder="FOR THE" @input="debouncedBuildBadge">
                                    </div>
                                    <div class="mfield">
                                        <label>Right label</label>
                                        <input v-model="builder.right" type="text" maxlength="30" placeholder="BADGE" @input="debouncedBuildBadge">
                                    </div>
                                </div>
                                <div class="mfield">
                                    <label>Style</label>
                                    <div class="color-presets">
                                        <button
                                            v-for="(preset, i) in colorPresets"
                                            :key="i"
                                            :class="['preset-swatch', builder.preset === i && 'preset-active']"
                                            :style="{ background: `linear-gradient(90deg, ${preset.primary} 50%, ${preset.secondary} 50%)` }"
                                            :title="preset.name"
                                            @click="builder.preset = i; debouncedBuildBadge()"
                                        />
                                    </div>
                                </div>
                                <div v-if="loadingSvg" class="preview-loading">Building…</div>
                                <div v-else-if="resolvedSvg" class="badge-preview-box has-badge">
                                    <!-- eslint-disable-next-line vue/no-v-html -->
                                    <div class="badge-preview-svg" v-html="resolvedSvg" />
                                </div>
                                <div v-else class="badge-preview-box"><p class="preview-empty">Enter labels above to preview</p></div>
                            </div>

                            <div v-else-if="builderTab === 'url'" class="builder-panel">
                                <div class="mfield">
                                    <label>FTB badge API URL</label>
                                    <p class="field-hint">Go to the <NuxtLink to="/generator" target="_blank" class="modal-link">generator</NuxtLink>, design your badge, then copy the API URL from the "Prefer code?" section.</p>
                                    <div class="badge-url-row">
                                        <input v-model="form.badgeUrl" type="url" placeholder="https://forthebadge.com/api/badges/generate?..." @blur="fetchBadgeFromUrl">
                                        <button class="url-load-btn" :disabled="!form.badgeUrl || loadingSvg" @click="fetchBadgeFromUrl">{{ loadingSvg ? '…' : 'Load' }}</button>
                                    </div>
                                </div>
                                <div v-if="badgeUrlError" class="badge-preview-box"><p class="preview-err">{{ badgeUrlError }}</p></div>
                                <div v-else-if="resolvedSvg" class="badge-preview-box has-badge">
                                    <!-- eslint-disable-next-line vue/no-v-html -->
                                    <div class="badge-preview-svg" v-html="resolvedSvg" />
                                </div>
                                <div v-else class="badge-preview-box"><p class="preview-empty">Paste a URL above to preview</p></div>
                            </div>

                            <div class="modal-footer-row">
                                <button class="mbtn-secondary" @click="closeModal">Cancel</button>
                                <button class="mbtn-primary" :disabled="!resolvedSvg" @click="modalStep = 2">Next →</button>
                            </div>
                        </template>

                        <!-- Step 2 -->
                        <template v-else-if="modalStep === 2">
                            <h2 class="modal-h">Who owns this space?</h2>
                            <div class="mfield">
                                <label>Name or brand <span class="req">*</span></label>
                                <input v-model="form.ownerName" type="text" maxlength="80" placeholder="Acme Corp">
                            </div>
                            <div class="mfield">
                                <label>Link URL <span class="mfield-optional">(where your badge goes)</span></label>
                                <input v-model="form.linkUrl" type="url" placeholder="https://your-project.com">
                            </div>
                            <div class="modal-summary">
                                <div class="summary-row"><span>Space</span><strong>{{ confirmedSel?.w }} × {{ confirmedSel?.h }}</strong></div>
                                <div class="summary-row summary-total"><span>Total</span><strong>${{ confirmedSel ? formatPrice(confirmedSel.w * confirmedSel.h) : '—' }}</strong></div>
                            </div>

                            <!-- Auth-aware ownership notice -->
                            <div v-if="isLoggedIn" class="ownership-notice ownership-notice--linked">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" /></svg>
                                Your purchase will be linked to your account. You can update your badge and link URL later from your account page.
                            </div>
                            <div v-else class="ownership-notice ownership-notice--anonymous">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
                                You're not signed in. Your placement will be <strong>permanent and uneditable</strong> after purchase.
                                <NuxtLink to="/login" class="ownership-notice-link">Sign in</NuxtLink> or
                                <NuxtLink to="/account" class="ownership-notice-link">get a free account</NuxtLink> to manage it later.
                            </div>

                            <div class="modal-footer-row">
                                <button class="mbtn-secondary" @click="modalStep = 1">← Back</button>
                                <button class="mbtn-primary" :disabled="!form.ownerName.trim()" @click="modalStep = 3">Review →</button>
                            </div>
                        </template>

                        <!-- Step 3 -->
                        <template v-else-if="modalStep === 3">
                            <h2 class="modal-h">Last chance to back out</h2>
                            <div class="modal-summary">
                                <div class="summary-row"><span>Owner</span><strong>{{ form.ownerName }}</strong></div>
                                <div class="summary-row" v-if="form.linkUrl"><span>Links to</span><strong class="summary-url">{{ form.linkUrl }}</strong></div>
                                <div class="summary-row"><span>Position</span><strong>Col {{ confirmedSel?.x }}, Row {{ confirmedSel?.y }}</strong></div>
                                <div class="summary-row"><span>Size</span><strong>{{ confirmedSel?.w }} × {{ confirmedSel?.h }}</strong></div>
                                <div class="summary-row summary-total"><span>Charge</span><strong>${{ confirmedSel ? formatPrice(confirmedSel.w * confirmedSel.h) : '—' }} USD</strong></div>
                            </div>
                            <p class="permanent-note">Permanently and exclusively yours. Nobody else can ever claim it. Revenue keeps For the Badge running.</p>
                            <p v-if="submitError" class="submit-error">{{ submitError }}</p>
                            <div class="modal-footer-row">
                                <button class="mbtn-secondary" @click="modalStep = 2">← Back</button>
                                <button class="mbtn-pay" :disabled="isSubmitting" @click="submitPurchase">
                                    <template v-if="isSubmitting">Redirecting to Stripe…</template>
                                    <template v-else>
                                        <svg class="mbtn-pay-lock" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1C9.24 1 7 3.24 7 6v1H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-2V6c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v1H9V6c0-1.66 1.34-3 3-3zm0 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>
                                        Pay ${{ confirmedSel ? formatPrice(confirmedSel.w * confirmedSel.h) : '—' }} →
                                    </template>
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import type { PlacementData } from '~/server/api/homepage/placements.get';

const { isAuthenticated: isLoggedIn } = useAuth();

interface Stats { totalRequests: number; uniqueVisitors: number; countries: number; pixelsSold: number; totalPixels: number; }
const props = withDefaults(defineProps<{ stats?: Stats }>(), {
    stats: () => ({ totalRequests: 0, uniqueVisitors: 0, countries: 0, pixelsSold: 0, totalPixels: 10000 }),
});

const GRID_COLS = 125;
const GRID_ROWS = 80;
const MIN_CELL = 4;
const MAX_CELL_AUTO = 20;
const ZOOM_STEP = 0.25;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4.0;

function priceCents(n: number) { return n * 100; }
function formatPrice(n: number) { return n.toLocaleString(); }

// Strip fixed width/height from <svg> and force fill-stretch so badges
// completely fill their purchased pixel area regardless of original dimensions.
function normalizeSvg(svg: string): string {
    if (!svg) return svg;
    return svg.replace(/<svg(\b[^>]*)>/i, (_m, attrs) => {
        const cleaned = attrs
            .replace(/\bwidth="[^"]*"/gi, '')
            .replace(/\bheight="[^"]*"/gi, '')
            .replace(/\bpreserveAspectRatio="[^"]*"/gi, '');
        return `<svg${cleaned} width="100%" height="100%" preserveAspectRatio="none">`;
    });
}

const cellSize = ref(8);
const zoomMultiplier = ref(1.0);

const gridScroll = ref<HTMLElement | null>(null);
const gridOuter = ref<HTMLElement | null>(null);
const gridCanvas = ref<HTMLElement | null>(null);

function applyGridSize() {
    const sc = gridScroll.value;
    if (!sc) return;

    const w = sc.clientWidth;
    const h = sc.clientHeight;
    if (w < 10 || h < 10) return;

    // At 100% zoom, fill the entire grid-scroll container with no overflow
    const cellFromW = Math.floor(w / GRID_COLS);
    const cellFromH = Math.floor(h / GRID_ROWS);
    const autoCell = Math.max(MIN_CELL, Math.min(MAX_CELL_AUTO, Math.min(cellFromW, cellFromH)));

    // Zoom scales up from auto-fit — canvas overflows container → scrolls within
    const cs = Math.max(1, Math.round(autoCell * zoomMultiplier.value));
    cellSize.value = cs;

    const gw = GRID_COLS * cs;
    const gh = GRID_ROWS * cs;

    if (gridCanvas.value) {
        gridCanvas.value.style.width = `${gw}px`;
        gridCanvas.value.style.height = `${gh}px`;
        gridCanvas.value.style.backgroundSize = `${cs}px ${cs}px`;
    }
    if (gridOuter.value) {
        gridOuter.value.style.width = `${gw}px`;
        gridOuter.value.style.height = `${gh}px`;
    }
}

function zoomIn() { zoomMultiplier.value = Math.min(ZOOM_MAX, Math.round((zoomMultiplier.value + ZOOM_STEP) * 4) / 4); applyGridSize(); }
function zoomOut() { zoomMultiplier.value = Math.max(ZOOM_MIN, Math.round((zoomMultiplier.value - ZOOM_STEP) * 4) / 4); applyGridSize(); }
function zoomReset() { zoomMultiplier.value = 1.0; applyGridSize(); }

// ── Sidebar how-to ────────────────────────────────────────────────────────────
const howToOpen = ref(false);

// ── Placement data ────────────────────────────────────────────────────────────
const placements = ref<PlacementData[]>([]);
const totalPixelsSold = ref(0);

function placementStyle(p: PlacementData) {
    const cs = cellSize.value;
    return { position: 'absolute' as const, left: `${p.gridX * cs}px`, top: `${p.gridY * cs}px`, width: `${p.gridWidth * cs}px`, height: `${p.gridHeight * cs}px`, overflow: 'hidden', cursor: p.linkUrl ? 'pointer' : 'default', zIndex: 2 };
}

// ── Selection ─────────────────────────────────────────────────────────────────
interface Sel { x: number; y: number; w: number; h: number }
const dragStart = ref<{ x: number; y: number } | null>(null);
const dragEnd = ref<{ x: number; y: number } | null>(null);
const isDragging = ref(false);
const confirmedSel = ref<Sel | null>(null);

const liveSelection = computed<Sel | null>(() => {
    if (isDragging.value && dragStart.value && dragEnd.value) return makeSel(dragStart.value, dragEnd.value);
    return confirmedSel.value;
});

function makeSel(a: { x: number; y: number }, b: { x: number; y: number }): Sel {
    return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(a.x - b.x) + 1, h: Math.abs(a.y - b.y) + 1 };
}

function selBoxStyle(s: Sel) {
    const cs = cellSize.value;
    return { position: 'absolute' as const, left: `${s.x * cs}px`, top: `${s.y * cs}px`, width: `${s.w * cs}px`, height: `${s.h * cs}px`, zIndex: 10 };
}

function popupStyle(s: Sel) {
    const cs = cellSize.value;
    const canvasW = GRID_COLS * cs;
    const canvasH = GRID_ROWS * cs;
    const popW = 240; const popH = 56;
    let left = s.x * cs;
    let top = (s.y + s.h) * cs + 5;
    if (top + popH > canvasH) top = s.y * cs - popH - 5;
    if (left + popW > canvasW) left = canvasW - popW - 4;
    if (left < 4) left = 4;
    return { position: 'absolute' as const, left: `${left}px`, top: `${top}px`, width: `${popW}px`, zIndex: 20, pointerEvents: 'all' as const };
}

function toCell(e: MouseEvent | Touch): { x: number; y: number } {
    const rect = gridCanvas.value!.getBoundingClientRect();
    const cs = cellSize.value;
    const cx = 'clientX' in e ? (e as MouseEvent).clientX : (e as Touch).clientX;
    const cy = 'clientY' in e ? (e as MouseEvent).clientY : (e as Touch).clientY;
    return {
        x: Math.max(0, Math.min(GRID_COLS - 1, Math.floor((cx - rect.left) / cs))),
        y: Math.max(0, Math.min(GRID_ROWS - 1, Math.floor((cy - rect.top) / cs))),
    };
}

function overlaps(s: Sel) {
    return placements.value.some(p => s.x < p.gridX + p.gridWidth && s.x + s.w > p.gridX && s.y < p.gridY + p.gridHeight && s.y + s.h > p.gridY);
}

function onMouseDown(e: MouseEvent) { if (e.button !== 0) return; dragStart.value = toCell(e); dragEnd.value = { ...dragStart.value }; isDragging.value = true; }
function onMouseMove(e: MouseEvent) { if (!isDragging.value || !dragStart.value) return; dragEnd.value = toCell(e); }
function onMouseUp() {
    if (!isDragging.value || !dragStart.value || !dragEnd.value) return;
    isDragging.value = false;
    const sel = makeSel(dragStart.value, dragEnd.value);
    confirmedSel.value = overlaps(sel) ? null : sel;
    dragStart.value = null; dragEnd.value = null;
}
function onMouseLeave() { if (isDragging.value) onMouseUp(); }
function onTouchStart(e: TouchEvent) { dragStart.value = toCell(e.touches[0]); dragEnd.value = { ...dragStart.value }; isDragging.value = true; }
function onTouchMove(e: TouchEvent) { if (!isDragging.value) return; dragEnd.value = toCell(e.touches[0]); }
function onTouchEnd() { onMouseUp(); }

// ── Tooltip ───────────────────────────────────────────────────────────────────
const tooltip = ref({ visible: false, x: 0, y: 0, ownerName: '', linkUrl: null as string | null });
function showTooltip(e: MouseEvent, p: PlacementData) {
    const rect = gridOuter.value!.getBoundingClientRect();
    tooltip.value = { visible: true, x: e.clientX - rect.left + 14, y: e.clientY - rect.top - 10, ownerName: p.ownerName, linkUrl: p.linkUrl };
}
function hideTooltip() { tooltip.value.visible = false; }

// ── Badge builder ─────────────────────────────────────────────────────────────
const colorPresets = [
    { name: 'FTB Blue', primary: '#31C4F3', secondary: '#389AD5' },
    { name: 'Midnight', primary: '#111827', secondary: '#374151' },
    { name: 'Red', primary: '#ef4444', secondary: '#b91c1c' },
    { name: 'Green', primary: '#22c55e', secondary: '#15803d' },
    { name: 'Purple', primary: '#a855f7', secondary: '#7e22ce' },
    { name: 'Orange', primary: '#f97316', secondary: '#c2410c' },
];
const builderTab = ref<'build' | 'url'>('build');
const builder = ref({ left: '', right: '', preset: 0 });
let buildDebounceTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedBuildBadge() {
    if (buildDebounceTimer) clearTimeout(buildDebounceTimer);
    buildDebounceTimer = setTimeout(buildBadge, 350);
}

async function buildBadge() {
    if (!builder.value.left && !builder.value.right) { resolvedSvg.value = ''; return; }
    const preset = colorPresets[builder.value.preset];
    const params = new URLSearchParams({ panels: '2', primaryLabel: builder.value.left || 'FOR THE', secondaryLabel: builder.value.right || 'BADGE', primaryBGColor: preset.primary, primaryTextColor: '#ffffff', secondaryBGColor: preset.secondary, secondaryTextColor: '#ffffff' });
    loadingSvg.value = true;
    try {
        const res = await fetch(`/api/badges/generate?${params}`);
        if (!res.ok) throw new Error();
        resolvedSvg.value = normalizeSvg(await res.text());
        badgeUrlError.value = '';
    } catch { badgeUrlError.value = 'Could not generate badge.'; }
    finally { loadingSvg.value = false; }
}

// ── Modal ─────────────────────────────────────────────────────────────────────
const showModal = ref(false);
const modalStep = ref<1 | 2 | 3>(1);
const isSubmitting = ref(false);
const submitError = ref('');
const loadingSvg = ref(false);
const badgeUrlError = ref('');
const resolvedSvg = ref('');
const form = ref({ ownerName: '', linkUrl: '', badgeUrl: '' });

function openModal() { submitError.value = ''; modalStep.value = resolvedSvg.value ? 2 : 1; showModal.value = true; }
function closeModal() { showModal.value = false; }

async function fetchBadgeFromUrl() {
    if (!form.value.badgeUrl) return;
    badgeUrlError.value = ''; loadingSvg.value = true;
    try {
        const res = await fetch(form.value.badgeUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!text.includes('<svg')) throw new Error('Not an SVG');
        resolvedSvg.value = normalizeSvg(text); badgeUrlError.value = '';
    } catch { badgeUrlError.value = 'Could not load badge — check the URL.'; resolvedSvg.value = ''; }
    finally { loadingSvg.value = false; }
}

watch(builderTab, () => { resolvedSvg.value = ''; badgeUrlError.value = ''; if (builderTab.value === 'build' && (builder.value.left || builder.value.right)) buildBadge(); });

async function submitPurchase() {
    if (!confirmedSel.value || !form.value.ownerName.trim() || !resolvedSvg.value) return;
    isSubmitting.value = true; submitError.value = '';
    try {
        const origin = window.location.origin;
        const { $csrfFetch } = useNuxtApp();
        const res = await $csrfFetch<{ checkoutUrl: string }>('/api/homepage/checkout', {
            method: 'POST',
            body: { gridX: confirmedSel.value.x, gridY: confirmedSel.value.y, gridWidth: confirmedSel.value.w, gridHeight: confirmedSel.value.h, ownerName: form.value.ownerName.trim(), linkUrl: form.value.linkUrl.trim() || undefined, badgeSvg: resolvedSvg.value, successUrl: `${origin}/homepage-success`, cancelUrl: `${origin}/` },
        });
        if (res.checkoutUrl) window.location.href = res.checkoutUrl;
    } catch (err: any) {
        submitError.value = err?.data?.statusMessage || err?.message || 'Something went wrong.';
        isSubmitting.value = false;
    }
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
let ro: ResizeObserver | null = null;

onMounted(async () => {
    try {
        const data = await $fetch('/api/homepage/placements');
        // Normalize SVGs so badges fill their pixel area regardless of original dimensions
        placements.value = data.placements.map(p => ({ ...p, badgeSvg: normalizeSvg(p.badgeSvg) }));
        totalPixelsSold.value = data.totalPixelsSold;
    } catch { /* empty */ }

    await nextTick();
    applyGridSize();
    ro = new ResizeObserver(applyGridSize);
    if (gridScroll.value) ro.observe(gridScroll.value);

    if (import.meta.client) {
        const p = new URLSearchParams(window.location.search);
        const badgeUrl = p.get('badgeUrl');
        if (p.get('place') === '1' && badgeUrl) {
            form.value.badgeUrl = decodeURIComponent(badgeUrl);
            builderTab.value = 'url';
            await fetchBadgeFromUrl();
            // Auto-open the modal at step 2 (badge already loaded) so user
            // just needs to drag a space to claim it
            if (resolvedSvg.value) {
                showModal.value = true;
                modalStep.value = 1; // Stay on step 1 so they see the badge preview
            }
        }
    }
});

onUnmounted(() => ro?.disconnect());
</script>

<style scoped>
/* ── Root — sidebar on left, grid fills the rest ──────────────────────── */
.board-root {
    display: flex;
    flex-direction: row;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    width: 100%;
}

/* ── Sidebar ──────────────────────────────────────────────────────────── */
.board-sidebar {
    width: 300px;
    flex-shrink: 0;
    border-right: 1px solid #e8e8e8;
    overflow-y: auto;
    background: #fff;
}

.sidebar-inner {
    padding: 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
}

.hero-title {
    font-size: clamp(2rem, 2.5vw, 2.25rem);
    font-weight: 800;
    color: #000;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 0;
}

.hero-copy { display: flex; flex-direction: column; gap: 1px; }
.copy-lead { font-size: 0.75rem; color: #aaa; margin: 0; font-weight: 500; }
.copy-struck { font-size: 0.9375rem; font-weight: 700; color: #ccc; text-decoration: line-through; text-decoration-color: #bbb; margin: 0; line-height: 1.45; }
.copy-plain { font-size: 0.9375rem; font-weight: 700; color: #000; margin: 0; line-height: 1.45; }

.hero-body { font-size: 0.8125rem; color: #666; line-height: 1.65; margin: 0; }

/* Stats */
.sidebar-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    background: #f9f9f9;
    border-radius: 6px;
    padding: 0.75rem;
}

.sstat { display: flex; flex-direction: column; gap: 0.15rem; }
.sstat-num { font-size: 1.1rem; font-weight: 800; color: #000; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; line-height: 1; }
.sstat-label { font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #aaa; display: flex; align-items: center; gap: 0.3rem; }

.live-dot { width: 5px; height: 5px; border-radius: 50%; background: #f4811f; flex-shrink: 0; animation: pulse 2s ease-in-out infinite; display: inline-block; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.cf-note { font-size: 0.6875rem; color: #bbb; margin: 0; display: flex; align-items: center; gap: 0.3rem; }

/* How-to */
.how-to { border: 1px solid #e8e8e8; border-radius: 8px; overflow: hidden; }
.how-toggle { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.625rem 0.875rem; background: #fafafa; border: none; cursor: pointer; font-family: inherit; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #555; }
.how-toggle:hover { background: #f0f0f0; }
.how-arrow { color: #bbb; transition: transform 0.18s; flex-shrink: 0; }
.how-arrow.open { transform: rotate(180deg); }
.how-body { padding: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.step { display: flex; gap: 0.625rem; align-items: flex-start; }
.step-n { font-size: 0.65rem; font-weight: 700; color: #ccc; padding-top: 0.1rem; flex-shrink: 0; width: 1.5rem; font-variant-numeric: tabular-nums; }
.step div { display: flex; flex-direction: column; gap: 0.125rem; }
.step div strong { font-size: 0.8125rem; font-weight: 700; color: #000; }
.step div span { font-size: 0.8rem; color: #888; line-height: 1.5; }
.step-link { color: #000; font-weight: 600; }

.pricing-tag { display: flex; align-items: center; gap: 0.5rem; background: #000; color: #fff; border-radius: 6px; padding: 0.5rem 0.875rem; font-size: 0.8rem; }
.pricing-tag strong { font-weight: 800; }
.pricing-tag span { color: rgba(255,255,255,0.5); font-size: 0.7rem; }

/* ── Grid area ─────────────────────────────────────────────────────────── */
.board-grid-area {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* ── Label bar ─────────────────────────────────────────────────────────── */
.grid-label-bar { flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0.375rem 0.875rem; background: #f7f7f7; border-bottom: 1px solid #e8e8e8; flex-wrap: wrap; gap: 0.5rem; user-select: none; }
.grid-label-text { font-size: 0.75rem; color: #888; font-weight: 700; }
.grid-label-right { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.grid-legend { display: flex; align-items: center; gap: 0.625rem; font-size: 0.75rem; color: #999; }
.legend-dot { width: 9px; height: 9px; border-radius: 2px; display: inline-block; margin-right: 0.2rem; }
.legend-free { background: #fff; border: 1px solid #ddd; }
.legend-taken { background: #000; }

/* ── Zoom controls ─────────────────────────────────────────────────────── */
.zoom-controls { display: flex; align-items: center; gap: 2px; }
.zoom-btn { width: 22px; height: 22px; background: #fff; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; font-weight: 700; color: #444; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: border-color 0.12s, color 0.12s; padding: 0; font-family: inherit; }
.zoom-btn:hover:not(:disabled) { border-color: #000; color: #000; }
.zoom-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.zoom-reset { min-width: 42px; height: 22px; background: #fff; border: 1px solid #ddd; border-radius: 4px; font-size: 0.7rem; font-weight: 700; color: #666; cursor: pointer; padding: 0 0.3rem; font-family: inherit; white-space: nowrap; transition: border-color 0.12s, color 0.12s; }
.zoom-reset:hover { border-color: #000; color: #000; }

/* ── Grid wrap + scroll ────────────────────────────────────────────────── */
.grid-wrap {
    flex: 1;
    min-height: 0;
    padding: 0.5rem;
    background: #ebebeb;
    display: flex;
}

.grid-scroll {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
}

.grid-outer {
    border: 2px solid #000;
    border-radius: 2px;
    background: #fff;
    cursor: crosshair;
    user-select: none;
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    flex-shrink: 0;
}

.grid-canvas {
    position: relative;
    background-image:
        linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px);
}

/* ── Placements ─────────────────────────────────────────────────────────── */
.placement { display: block; text-decoration: none; transition: filter 0.12s; }
.placement:hover { filter: brightness(0.88); z-index: 3 !important; }
.placement-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
}
/* After normalizeSvg, SVG has width="100%" height="100%" preserveAspectRatio="none"
   so it fully fills the purchased pixel area with no letterboxing. */
.placement-inner :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
}

/* ── Selection ──────────────────────────────────────────────────────────── */
.sel-box { position: absolute; border: 2px solid #000; background: rgba(0,0,0,0.07); pointer-events: none; }

/* ── Live preview placement ─────────────────────────────────────────────── */
/* Re-use placement-inner for SVG stretching inside preview too */
.preview-placement .placement-inner :deep(svg) { display: block; width: 100%; height: 100%; }

.preview-placement {
    position: absolute;
    overflow: hidden;
    z-index: 11;
    pointer-events: none;
    outline: 2px dashed #000;
    outline-offset: -1px;
    animation: preview-dash 1.2s ease-in-out infinite;
}

@keyframes preview-dash {
    0%, 100% { outline-color: rgba(0,0,0,0.9); }
    50% { outline-color: rgba(0,0,0,0.3); }
}

.preview-label {
    position: absolute;
    top: 3px;
    right: 3px;
    background: #000;
    color: #fff;
    font-size: 0.5rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    padding: 1px 4px;
    border-radius: 2px;
    pointer-events: none;
    z-index: 12;
    text-transform: uppercase;
    line-height: 1.6;
    opacity: 0.9;
}

.preview-fade-enter-active, .preview-fade-leave-active { transition: opacity 0.2s; }
.preview-fade-enter-from, .preview-fade-leave-to { opacity: 0; }

/* ── Floating popup ─────────────────────────────────────────────────────── */
.sel-popup { background: #000; border-radius: 8px; padding: 0.5rem 0.625rem; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.4); overflow: hidden; box-sizing: border-box; }
.sel-popup-info { display: flex; align-items: baseline; gap: 0.4rem; flex: 1; min-width: 0; overflow: hidden; }
.sel-popup-size { font-size: 0.7rem; color: rgba(255,255,255,0.45); font-weight: 600; }
.sel-popup-price { font-size: 1.1rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
.sel-popup-actions { display: flex; gap: 0.3rem; align-items: center; }
.sel-popup-cancel { background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.5); border-radius: 4px; width: 24px; height: 24px; font-size: 0.7rem; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: inherit; }
.sel-popup-cancel:hover { background: rgba(255,255,255,0.2); color: #fff; }
.sel-popup-buy { background: #fff; color: #000; border: none; border-radius: 4px; padding: 0.3rem 0.6rem; font-size: 0.8rem; font-weight: 700; cursor: pointer; white-space: nowrap; font-family: inherit; transition: opacity 0.12s; }
.sel-popup-buy:hover { opacity: 0.87; }
.pop-in-enter-active { transition: all 0.16s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pop-in-leave-active { transition: all 0.1s ease; }
.pop-in-enter-from { opacity: 0; transform: scale(0.8) translateY(4px); }
.pop-in-leave-to { opacity: 0; transform: scale(0.9); }

/* ── Tooltip ────────────────────────────────────────────────────────────── */
.grid-tooltip { position: fixed; background: #000; color: #fff; border-radius: 6px; padding: 0.375rem 0.625rem; font-size: 0.75rem; pointer-events: none; white-space: nowrap; z-index: 200; display: flex; flex-direction: column; gap: 1px; max-width: 200px; }
.grid-tooltip span { opacity: 0.55; font-size: 0.7rem; overflow: hidden; text-overflow: ellipsis; }
.tooltip-url { opacity: 0.4 !important; }

/* ── Hint ───────────────────────────────────────────────────────────────── */
.grid-hint { flex-shrink: 0; text-align: center; font-size: 0.75rem; color: #aaa; padding: 0.375rem 1rem; margin: 0; border-top: 1px solid #e8e8e8; }
.hint-clear { background: none; border: none; color: #888; font-size: 0.75rem; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; padding: 0; font-family: inherit; }
.hint-clear:hover { color: #000; }

/* ── Modal ──────────────────────────────────────────────────────────────── */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); backdrop-filter: blur(1px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.18s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal { background: #fff; border-radius: 14px; width: 100%; max-width: 500px; max-height: 92vh; overflow-y: auto; padding: 2rem; position: relative; }
.modal-x { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.125rem; color: #bbb; cursor: pointer; padding: 0.25rem; }
.modal-x:hover { color: #000; }

.modal-badge-strip { display: flex; align-items: center; gap: 0.75rem; background: #f5f5f5; border-radius: 8px; padding: 0.625rem 0.875rem; margin-bottom: 1.25rem; }
.modal-badge-preview { flex: 1; display: flex; align-items: center; overflow: hidden; }
.modal-badge-preview :deep(svg) { max-width: 100%; height: 30px; display: block; }
.modal-badge-change { background: none; border: 1px solid #ddd; color: #666; border-radius: 5px; padding: 0.25rem 0.625rem; font-size: 0.75rem; font-weight: 600; cursor: pointer; font-family: inherit; flex-shrink: 0; }
.modal-badge-change:hover { border-color: #000; color: #000; }

.modal-step-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; transition: all 0.2s; }
.mstep { font-size: 0.8rem; font-weight: 600; color: #ccc; display: inline-flex; align-items: center; gap: 0.35rem; transition: all 0.2s; }
.mstep-active { color: #000; }
.mstep-arrow { color: #ddd; font-size: 0.75rem; }
.mstep-dot { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; font-size: 0.65rem; font-weight: 800; border: 1.5px solid currentColor; transition: all 0.2s; flex-shrink: 0; }
.mstep-active .mstep-dot { background: #000; color: #fff; border-color: #000; }

.modal-h { font-size: 1.375rem; font-weight: 800; color: #000; letter-spacing: -0.02em; margin: 0 0 0.5rem; }

.builder-tabs { display: flex; gap: 0.25rem; background: #f0f0f0; border-radius: 8px; padding: 3px; margin-bottom: 1rem; }
.btab { flex: 1; background: transparent; border: none; border-radius: 6px; padding: 0.4rem 0.5rem; font-size: 0.8125rem; font-weight: 600; color: #888; cursor: pointer; font-family: inherit; }
.btab:hover { color: #000; }
.btab-active { background: #fff; color: #000; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

.builder-panel { display: flex; flex-direction: column; }
.builder-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

.color-presets { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.preset-swatch { width: 36px; height: 24px; border-radius: 5px; border: 2px solid transparent; cursor: pointer; transition: border-color 0.12s; padding: 0; }
.preset-active { border-color: #000; }

.preview-loading { text-align: center; font-size: 0.875rem; color: #aaa; padding: 1rem; }

.mfield { margin-bottom: 0.875rem; }
.mfield label { display: block; font-size: 0.8125rem; font-weight: 700; color: #000; margin-bottom: 0.35rem; }
.field-hint { font-size: 0.75rem; color: #999; margin: 0 0 0.4rem; line-height: 1.5; }
.req { color: #ef4444; }
.mfield-optional { font-weight: 400; color: #aaa; }

.badge-url-row { display: flex; gap: 0.5rem; }
.mfield input, .badge-url-row input { flex: 1; width: 100%; padding: 0.5625rem 0.75rem; border: 1.5px solid #e0e0e0; border-radius: 7px; font-size: 0.875rem; color: #000; background: #fff; box-sizing: border-box; font-family: inherit; transition: border-color 0.15s; }
.mfield input:focus, .badge-url-row input:focus { outline: none; border-color: #000; }

.url-load-btn { background: #000; color: #fff; border: none; border-radius: 7px; padding: 0 0.875rem; font-size: 0.875rem; font-weight: 700; cursor: pointer; white-space: nowrap; font-family: inherit; }
.url-load-btn:hover:not(:disabled) { opacity: 0.85; }
.url-load-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.badge-preview-box { background: #f5f5f5; border: 1.5px dashed #ddd; border-radius: 8px; min-height: 64px; display: flex; align-items: center; justify-content: center; padding: 0.875rem; margin-bottom: 1rem; }
.badge-preview-box.has-badge { background: #fff; border-color: #000; flex-direction: column; gap: 0.375rem; }
.badge-preview-svg :deep(svg) { max-width: 100%; height: auto; display: block; }
.preview-err { font-size: 0.8125rem; color: #ef4444; margin: 0; text-align: center; }
.preview-empty { font-size: 0.875rem; color: #aaa; margin: 0; text-align: center; }

.modal-summary { background: #f7f7f7; border-radius: 9px; padding: 0.875rem 1rem; display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
.summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; }
.summary-row span { color: #888; }
.summary-row strong { color: #000; font-weight: 700; }
.summary-url { font-weight: 600 !important; font-size: 0.78rem !important; color: #555 !important; word-break: break-all; text-align: right; max-width: 60%; }
.summary-total { border-top: 1px solid #e8e8e8; padding-top: 0.4rem; margin-top: 0.2rem; }
.summary-total strong { font-size: 1.05rem; }

.permanent-note { font-size: 0.8rem; color: #999; line-height: 1.5; margin: 0 0 1rem; }

.ownership-notice {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.8rem;
    line-height: 1.5;
    border-radius: 7px;
    padding: 0.625rem 0.75rem;
    margin-bottom: 1rem;
}

.ownership-notice svg { flex-shrink: 0; margin-top: 1px; }

.ownership-notice--linked {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.ownership-notice--anonymous {
    background: #fffbeb;
    color: #92400e;
    border: 1px solid #fde68a;
}

.ownership-notice-link {
    color: inherit;
    font-weight: 700;
    text-underline-offset: 2px;
}
.submit-error { color: #ef4444; font-size: 0.875rem; font-weight: 600; margin: 0 0 0.75rem; }
.modal-link { color: #000; font-weight: 600; }

.modal-footer-row { display: flex; gap: 0.625rem; justify-content: flex-end; }
.mbtn-secondary { background: transparent; border: 1.5px solid #e0e0e0; color: #555; border-radius: 7px; padding: 0.5625rem 0.875rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: inherit; }
.mbtn-secondary:hover { border-color: #000; color: #000; }
.mbtn-primary { background: #000; color: #fff; border: none; border-radius: 7px; padding: 0.5625rem 1.125rem; font-size: 0.875rem; font-weight: 700; cursor: pointer; font-family: inherit; }
.mbtn-primary:hover:not(:disabled) { opacity: 0.85; }
.mbtn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
.mbtn-pay { background: #000; color: #fff; border: none; border-radius: 7px; padding: 0.5625rem 1.5rem; font-size: 0.9375rem; font-weight: 700; cursor: pointer; font-family: inherit; flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; }
.mbtn-pay-lock { flex-shrink: 0; opacity: 0.75; }
.mbtn-pay:hover:not(:disabled) { opacity: 0.85; }
.mbtn-pay:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Mobile ─────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
    .board-root { flex-direction: column; }
    .board-sidebar { width: 100%; border-right: none; border-bottom: 1px solid #e8e8e8; }
    .sidebar-inner { padding: 1rem; }
    .hero-title { font-size: clamp(1.5rem, 5vw, 2rem); }
    .sidebar-stats { grid-template-columns: repeat(4, 1fr); }
}
</style>
