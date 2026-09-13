<template>
    <div>
        <div class="generator-page">
        <!-- Desktop Navigation -->
        <NavBar v-if="!isMobile" />
        
        <!-- Mobile Navigation -->
        <MobileNavBar v-if="isMobile" />

        <section class="page-header">
            <!-- Animated dot matrix background -->
            <div ref="dotMatrix" class="dot-matrix">
                <div
                    v-for="(dot, index) in dots"
                    :key="index"
                    :class="['dot', dot.type]"
                    :style="{ left: dot.x + '%', top: dot.y + '%', animationDelay: dot.delay + 'ms', background: dot.color }"
                />
            </div>
            
            <div class="header-container">
                <div class="header-content">
                    <h1>Badge Generator</h1>
                    <p class="subtitle">Create custom badges for your projects</p>
                </div>
            </div>
        </section>

        <div class="generator-wrapper">
            <div class="generator-layout">

                <div class="content">
                    <!-- Left Panel: Controls -->
                    <div class="controls-panel">
                        <div class="panel-header">
                            <h2>Badge Customization</h2>
                            <p>Choose panels, colors, text, icons, and styles to create your custom badge</p>
                        </div>
                        <!-- Panel Selector -->
                        <div class="panel-toggle">
                            <button
                                :class="{ active: panels === 2 }"
                                @click="setPanels(2)"
                            >
                                2 Panels
                            </button>
                            <button
                                :class="{ active: panels === 3 }"
                                @click="setPanels(3)"
                            >
                                3 Panels
                            </button>
                        </div>


                        <!-- Primary Panel -->
                        <div class="control-section panel-container primary-panel" :style="{ borderLeftColor: primaryBGColor }">
                            <div class="panel-label">Panel 1: Primary</div>
                            <h3>Primary</h3>
                            <input
                                v-model="primaryLabel"
                                type="text"
                                placeholder="Enter text"
                                class="text-input"
                            >
                            <div class="color-row">
                                <div class="color-group">
                                    <label>Background</label>
                                    <input
                                        v-model="primaryBGColor"
                                        type="color"
                                        class="color-input"
                                    >
                                </div>
                                <div class="color-group">
                                    <label>Text</label>
                                    <input
                                        v-model="primaryTextColor"
                                        type="color"
                                        class="color-input"
                                    >
                                </div>
                            </div>
                            
                            <!-- Icon Controls -->
                            <div class="icon-controls">
                                <div class="icon-header">
                                    <div class="panel-label">Icon</div>
                                    <button 
                                        class="toggle-icon-btn" 
                                        :class="{ active: showPrimaryIconPicker }"
                                        @click="showPrimaryIconPicker = !showPrimaryIconPicker"
                                    >
                                        {{ showPrimaryIconPicker ? 'Hide' : 'Add' }} Icon
                                    </button>
                                </div>
                                <IconPicker v-if="showPrimaryIconPicker" v-model="primaryIcon" />
                                <div v-if="primaryIcon" class="icon-options">
                                    <div class="color-group">
                                        <label>Icon Color</label>
                                        <input
                                            v-model="primaryIconColor"
                                            type="color"
                                            class="color-input"
                                        >
                                    </div>
                                    <div class="size-group">
                                        <label>Icon Size: {{ primaryIconSize }}px</label>
                                        <input
                                            v-model.number="primaryIconSize"
                                            type="range"
                                            min="12"
                                            max="24"
                                            step="1"
                                            class="size-slider"
                                        >
                                    </div>
                                    <div class="position-group">
                                        <label>Position</label>
                                        <select v-model="primaryIconPosition" class="position-select">
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Secondary Panel -->
                        <div class="control-section panel-container secondary-panel" :style="{ borderLeftColor: secondaryBGColor }">
                            <div class="panel-label">Panel 2: Secondary</div>
                            <h3>Secondary</h3>
                            <input
                                v-model="secondaryLabel"
                                type="text"
                                placeholder="Enter text"
                                class="text-input"
                            >
                            <div class="color-row">
                                <div class="color-group">
                                    <label>Background</label>
                                    <input
                                        v-model="secondaryBGColor"
                                        type="color"
                                        class="color-input"
                                    >
                                </div>
                                <div class="color-group">
                                    <label>Text</label>
                                    <input
                                        v-model="secondaryTextColor"
                                        type="color"
                                        class="color-input"
                                    >
                                </div>
                            </div>
                            
                            <!-- Icon Controls -->
                            <div class="icon-controls">
                                <div class="icon-header">
                                    <div class="panel-label">Icon</div>
                                    <button 
                                        class="toggle-icon-btn" 
                                        :class="{ active: showSecondaryIconPicker }"
                                        @click="showSecondaryIconPicker = !showSecondaryIconPicker"
                                    >
                                        {{ showSecondaryIconPicker ? 'Hide' : 'Add' }} Icon
                                    </button>
                                </div>
                                <IconPicker v-if="showSecondaryIconPicker" v-model="secondaryIcon" />
                                <div v-if="secondaryIcon" class="icon-options">
                                    <div class="color-group">
                                        <label>Icon Color</label>
                                        <input
                                            v-model="secondaryIconColor"
                                            type="color"
                                            class="color-input"
                                        >
                                    </div>
                                    <div class="size-group">
                                        <label>Icon Size: {{ secondaryIconSize }}px</label>
                                        <input
                                            v-model.number="secondaryIconSize"
                                            type="range"
                                            min="12"
                                            max="24"
                                            step="1"
                                            class="size-slider"
                                        >
                                    </div>
                                    <div class="position-group">
                                        <label>Position</label>
                                        <select v-model="secondaryIconPosition" class="position-select">
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tertiary Panel -->
                        <div v-if="panels === 3" class="control-section panel-container tertiary-panel" :style="{ borderLeftColor: tertiaryBGColor }">
                            <div class="panel-label">Panel 3: Tertiary</div>
                            <h3>Tertiary</h3>
                            <input
                                v-model="tertiaryLabel"
                                type="text"
                                placeholder="Enter text"
                                class="text-input"
                            >
                            <div class="color-row">
                                <div class="color-group">
                                    <label>Background</label>
                                    <input
                                        v-model="tertiaryBGColor"
                                        type="color"
                                        class="color-input"
                                    >
                                </div>
                                <div class="color-group">
                                    <label>Text</label>
                                    <input
                                        v-model="tertiaryTextColor"
                                        type="color"
                                        class="color-input"
                                    >
                                </div>
                            </div>
                            
                            <!-- Icon Controls -->
                            <div class="icon-controls">
                                <div class="icon-header">
                                    <div class="panel-label">Icon</div>
                                    <button 
                                        class="toggle-icon-btn" 
                                        :class="{ active: showTertiaryIconPicker }"
                                        @click="showTertiaryIconPicker = !showTertiaryIconPicker"
                                    >
                                        {{ showTertiaryIconPicker ? 'Hide' : 'Add' }} Icon
                                    </button>
                                </div>
                                <IconPicker v-if="showTertiaryIconPicker" v-model="tertiaryIcon" />
                                <div v-if="tertiaryIcon" class="icon-options">
                                    <div class="color-group">
                                        <label>Icon Color</label>
                                        <input
                                            v-model="tertiaryIconColor"
                                            type="color"
                                            class="color-input"
                                        >
                                    </div>
                                    <div class="size-group">
                                        <label>Icon Size: {{ tertiaryIconSize }}px</label>
                                        <input
                                            v-model.number="tertiaryIconSize"
                                            type="range"
                                            min="12"
                                            max="24"
                                            step="1"
                                            class="size-slider"
                                        >
                                    </div>
                                    <div class="position-group">
                                        <label>Position</label>
                                        <select v-model="tertiaryIconPosition" class="position-select">
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Badge Styling -->
                        <div class="control-section">
                            <h3>Badge Settings</h3>
                            
                            <div class="slider-group">
                                <label>Badge Size</label>
                                <input
                                    v-model.number="badgeScale"
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    class="size-slider"
                                >
                                <span class="slider-value">{{ badgeScale.toFixed(2) }}x</span>
                            </div>
                            
                            <div class="slider-group">
                                <label>Border Radius</label>
                                <input
                                    v-model.number="badgeBorderRadius"
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="1"
                                    class="size-slider"
                                >
                                <span class="slider-value">{{ badgeBorderRadius }}px</span>
                            </div>
                        </div>

                        <!-- Text Styling -->
                        <div class="control-section">
                            <TextStyler
                                v-model:panel="activePanel"
                                :family="activePanel === 'primary' ? primaryFontFamily : activePanel === 'secondary' ? secondaryFontFamily : tertiaryFontFamily"
                                :size="activePanel === 'primary' ? primaryFontSize : activePanel === 'secondary' ? secondaryFontSize : tertiaryFontSize"
                                :weight="activePanel === 'primary' ? primaryFontWeight : activePanel === 'secondary' ? secondaryFontWeight : tertiaryFontWeight"
                                :spacing="activePanel === 'primary' ? primaryLetterSpacing : activePanel === 'secondary' ? secondaryLetterSpacing : tertiaryLetterSpacing"
                                :transform="activePanel === 'primary' ? primaryTextTransform : activePanel === 'secondary' ? secondaryTextTransform : tertiaryTextTransform"
                                :decoration="activePanel === 'primary' ? primaryTextDecoration : activePanel === 'secondary' ? secondaryTextDecoration : tertiaryTextDecoration"
                                :fontStyle="activePanel === 'primary' ? primaryFontStyle : activePanel === 'secondary' ? secondaryFontStyle : tertiaryFontStyle"
                                :shadowColor="activePanel === 'primary' ? primaryTextShadowColor : activePanel === 'secondary' ? secondaryTextShadowColor : tertiaryTextShadowColor"
                                :shadowOffsetX="activePanel === 'primary' ? primaryTextShadowOffsetX : activePanel === 'secondary' ? secondaryTextShadowOffsetX : tertiaryTextShadowOffsetX"
                                :shadowOffsetY="activePanel === 'primary' ? primaryTextShadowOffsetY : activePanel === 'secondary' ? secondaryTextShadowOffsetY : tertiaryTextShadowOffsetY"
                                :shadowBlur="activePanel === 'primary' ? primaryTextShadowBlur : activePanel === 'secondary' ? secondaryTextShadowBlur : tertiaryTextShadowBlur"
                                :rotation="activePanel === 'primary' ? primaryTextRotation : activePanel === 'secondary' ? secondaryTextRotation : tertiaryTextRotation"
                                :opacity="activePanel === 'primary' ? primaryTextOpacity : activePanel === 'secondary' ? secondaryTextOpacity : tertiaryTextOpacity"
                                :fontVariant="activePanel === 'primary' ? primaryFontVariant : activePanel === 'secondary' ? secondaryFontVariant : tertiaryFontVariant"
                                @update:family="updateFontFamily($event)"
                                @update:size="updateFontSize($event)"
                                @update:weight="updateFontWeight($event)"
                                @update:spacing="updateLetterSpacing($event)"
                                @update:transform="updateTextTransform($event)"
                                @update:decoration="updateTextDecoration($event)"
                                @update:fontStyle="updateFontStyle($event)"
                                @update:shadowColor="updateTextShadowColor($event)"
                                @update:shadowOffsetX="updateTextShadowOffsetX($event)"
                                @update:shadowOffsetY="updateTextShadowOffsetY($event)"
                                @update:shadowBlur="updateTextShadowBlur($event)"
                                @update:rotation="updateTextRotation($event)"
                                @update:opacity="updateTextOpacity($event)"
                                @update:fontVariant="updateFontVariant($event)"
                            />
                        </div>
                    </div>
                    <!-- Right Panel: Preview -->
                    <div ref="previewPanelRef" class="preview-panel" :style="{ transform: `translateY(${previewOffset}px)` }">
                        <div class="preview-container">
                            <svg
                                ref="svgRef"
                                xmlns="http://www.w3.org/2000/svg"
                                :width="badgeWidth * badgeScale"
                                :height="35 * badgeScale"
                                :viewBox="`0 0 ${badgeWidth} 35`"
                                class="badge-svg"
                            >
                                <!-- SVG Filters for text shadows -->
                                <defs>
                                    <filter v-if="primaryTextShadowColor !== 'transparent' || primaryTextShadowBlur > 0" id="primaryShadow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur in="SourceAlpha" :stdDeviation="primaryTextShadowBlur" />
                                        <feOffset :dx="primaryTextShadowOffsetX" :dy="primaryTextShadowOffsetY" result="offsetblur" />
                                        <feFlood :flood-color="primaryTextShadowColor" />
                                        <feComposite in2="offsetblur" operator="in" />
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <filter v-if="secondaryTextShadowColor !== 'transparent' || secondaryTextShadowBlur > 0" id="secondaryShadow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur in="SourceAlpha" :stdDeviation="secondaryTextShadowBlur" />
                                        <feOffset :dx="secondaryTextShadowOffsetX" :dy="secondaryTextShadowOffsetY" result="offsetblur" />
                                        <feFlood :flood-color="secondaryTextShadowColor" />
                                        <feComposite in2="offsetblur" operator="in" />
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <filter v-if="tertiaryTextShadowColor !== 'transparent' || tertiaryTextShadowBlur > 0" id="tertiaryShadow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur in="SourceAlpha" :stdDeviation="tertiaryTextShadowBlur" />
                                        <feOffset :dx="tertiaryTextShadowOffsetX" :dy="tertiaryTextShadowOffsetY" result="offsetblur" />
                                        <feFlood :flood-color="tertiaryTextShadowColor" />
                                        <feComposite in2="offsetblur" operator="in" />
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                
                                <!-- Primary panel with left corners rounded -->
                                <path
                                    v-if="badgeBorderRadius > 0"
                                    :d="`M ${badgeBorderRadius} 0 L ${primaryWidth} 0 L ${primaryWidth} 35 L ${badgeBorderRadius} 35 Q 0 35 0 ${35 - badgeBorderRadius} L 0 ${badgeBorderRadius} Q 0 0 ${badgeBorderRadius} 0 Z`"
                                    :fill="primaryBGColor"
                                />
                                <rect v-else :width="primaryWidth" height="35" :fill="primaryBGColor" />
                                
                                <!-- Secondary panel -->
                                <template v-if="panels === 2">
                                    <!-- Right corners rounded when 2 panels -->
                                    <path
                                        v-if="badgeBorderRadius > 0"
                                        :d="`M ${primaryWidth} 0 L ${primaryWidth + secondaryWidth - badgeBorderRadius} 0 Q ${primaryWidth + secondaryWidth} 0 ${primaryWidth + secondaryWidth} ${badgeBorderRadius} L ${primaryWidth + secondaryWidth} ${35 - badgeBorderRadius} Q ${primaryWidth + secondaryWidth} 35 ${primaryWidth + secondaryWidth - badgeBorderRadius} 35 L ${primaryWidth} 35 Z`"
                                        :fill="secondaryBGColor"
                                    />
                                    <rect v-else :x="primaryWidth" :width="secondaryWidth" height="35" :fill="secondaryBGColor" />
                                </template>
                                <template v-else>
                                    <!-- No rounding when 3 panels -->
                                    <rect :x="primaryWidth" :width="secondaryWidth" height="35" :fill="secondaryBGColor" />
                                </template>
                                
                                <!-- Primary Icon and Text -->
                                <template v-if="primaryIconData">
                                    <g :transform="`translate(${primaryIconPosition === 'left' ? Math.max(10, (primaryWidth / 2) - (primaryTextRef?.getBBox().width || 50) / 2 - primaryIconSize - 4) : Math.min(primaryWidth - primaryIconSize - 10, (primaryWidth / 2) + (primaryTextRef?.getBBox().width || 50) / 2 + 4)}, ${17.5 - primaryIconSize / 2}) scale(${primaryIconSize / 24})`">
                                        <path :d="primaryIconData.path" :fill="primaryIconColor" />
                                    </g>
                                </template>
                                <text
                                    ref="primaryTextRef"
                                    :x="(primaryWidth / 2) + (primaryIconData && primaryIconPosition === 'left' ? (primaryIconSize + 4) / 2 : primaryIconData && primaryIconPosition === 'right' ? -(primaryIconSize + 4) / 2 : 0)"
                                    y="17.5"
                                    dy="0.35em"
                                    :font-size="primaryFontSize"
                                    :font-family="`${primaryFontFamily}, sans-serif`"
                                    :fill="primaryTextColor"
                                    text-anchor="middle"
                                    :letter-spacing="primaryLetterSpacing"
                                    :font-weight="primaryFontWeight"
                                    :font-style="primaryFontStyle"
                                    :text-decoration="primaryTextDecoration"
                                    :fill-opacity="primaryTextOpacity"
                                    :font-variant="primaryFontVariant"
                                    :filter="(primaryTextShadowColor !== 'transparent' || primaryTextShadowBlur > 0) ? 'url(#primaryShadow)' : undefined"
                                    :transform="primaryTextRotation !== 0 ? `rotate(${primaryTextRotation} ${(primaryWidth / 2) + (primaryIconData && primaryIconPosition === 'left' ? (primaryIconSize + 4) / 2 : primaryIconData && primaryIconPosition === 'right' ? -(primaryIconSize + 4) / 2 : 0)} 21.5)` : undefined"
                                    :style="{ textTransform: primaryTextTransform === 'none' ? 'none' : primaryTextTransform }"
                                >
                                    {{ getTransformedText(primaryLabel || 'SAMPLE', primaryTextTransform) }}
                                </text>
                                
                                <!-- Secondary Icon and Text -->
                                <template v-if="secondaryIconData">
                                    <g :transform="`translate(${primaryWidth + (secondaryIconPosition === 'left' ? Math.max(10, (secondaryWidth / 2) - (secondaryTextRef?.getBBox().width || 50) / 2 - secondaryIconSize - 4) : Math.min(secondaryWidth - secondaryIconSize - 10, (secondaryWidth / 2) + (secondaryTextRef?.getBBox().width || 50) / 2 + 4))}, ${17.5 - secondaryIconSize / 2}) scale(${secondaryIconSize / 24})`">
                                        <path :d="secondaryIconData.path" :fill="secondaryIconColor" />
                                    </g>
                                </template>
                                <text
                                    ref="secondaryTextRef"
                                    :x="primaryWidth + (secondaryWidth / 2) + (secondaryIconData && secondaryIconPosition === 'left' ? (secondaryIconSize + 4) / 2 : secondaryIconData && secondaryIconPosition === 'right' ? -(secondaryIconSize + 4) / 2 : 0)"
                                    y="17.5"
                                    dy="0.35em"
                                    :font-size="secondaryFontSize"
                                    :font-family="`${secondaryFontFamily}, sans-serif`"
                                    :fill="secondaryTextColor"
                                    text-anchor="middle"
                                    :font-weight="secondaryFontWeight"
                                    :letter-spacing="secondaryLetterSpacing"
                                    :font-style="secondaryFontStyle"
                                    :text-decoration="secondaryTextDecoration"
                                    :fill-opacity="secondaryTextOpacity"
                                    :font-variant="secondaryFontVariant"
                                    :filter="(secondaryTextShadowColor !== 'transparent' || secondaryTextShadowBlur > 0) ? 'url(#secondaryShadow)' : undefined"
                                    :transform="secondaryTextRotation !== 0 ? `rotate(${secondaryTextRotation} ${primaryWidth + (secondaryWidth / 2) + (secondaryIconData && secondaryIconPosition === 'left' ? (secondaryIconSize + 4) / 2 : secondaryIconData && secondaryIconPosition === 'right' ? -(secondaryIconSize + 4) / 2 : 0)} 21.5)` : undefined"
                                    :style="{ textTransform: secondaryTextTransform === 'none' ? 'none' : secondaryTextTransform }"
                                >
                                    {{ getTransformedText(secondaryLabel || 'TEXT', secondaryTextTransform) }}
                                </text>

                                <template v-if="panels === 3">
                                    <!-- Tertiary panel with right corners rounded -->
                                    <path
                                        v-if="badgeBorderRadius > 0"
                                        :d="`M ${primaryWidth + secondaryWidth} 0 L ${primaryWidth + secondaryWidth + tertiaryWidth - badgeBorderRadius} 0 Q ${primaryWidth + secondaryWidth + tertiaryWidth} 0 ${primaryWidth + secondaryWidth + tertiaryWidth} ${badgeBorderRadius} L ${primaryWidth + secondaryWidth + tertiaryWidth} ${35 - badgeBorderRadius} Q ${primaryWidth + secondaryWidth + tertiaryWidth} 35 ${primaryWidth + secondaryWidth + tertiaryWidth - badgeBorderRadius} 35 L ${primaryWidth + secondaryWidth} 35 Z`"
                                        :fill="tertiaryBGColor"
                                    />
                                    <rect
                                        v-else
                                        :x="primaryWidth + secondaryWidth"
                                        :width="tertiaryWidth"
                                        height="35"
                                        :fill="tertiaryBGColor"
                                    />
                                    
                                    <!-- Tertiary Icon and Text -->
                                    <template v-if="tertiaryIconData">
                                        <g :transform="`translate(${primaryWidth + secondaryWidth + (tertiaryIconPosition === 'left' ? Math.max(10, (tertiaryWidth / 2) - (tertiaryTextRef?.getBBox().width || 50) / 2 - tertiaryIconSize - 4) : Math.min(tertiaryWidth - tertiaryIconSize - 10, (tertiaryWidth / 2) + (tertiaryTextRef?.getBBox().width || 50) / 2 + 4))}, ${17.5 - tertiaryIconSize / 2}) scale(${tertiaryIconSize / 24})`">
                                            <path :d="tertiaryIconData.path" :fill="tertiaryIconColor" />
                                        </g>
                                    </template>
                                    <text
                                        ref="tertiaryTextRef"
                                        :x="primaryWidth + secondaryWidth + (tertiaryWidth / 2) + (tertiaryIconData && tertiaryIconPosition === 'left' ? (tertiaryIconSize + 4) / 2 : tertiaryIconData && tertiaryIconPosition === 'right' ? -(tertiaryIconSize + 4) / 2 : 0)"
                                        y="17.5"
                                        dy="0.35em"
                                        :font-size="tertiaryFontSize"
                                        :font-family="`${tertiaryFontFamily}, sans-serif`"
                                        :fill="tertiaryTextColor"
                                        text-anchor="middle"
                                        :font-weight="tertiaryFontWeight"
                                        :letter-spacing="tertiaryLetterSpacing"
                                        :font-style="tertiaryFontStyle"
                                        :text-decoration="tertiaryTextDecoration"
                                        :fill-opacity="tertiaryTextOpacity"
                                        :font-variant="tertiaryFontVariant"
                                        :filter="(tertiaryTextShadowColor !== 'transparent' || tertiaryTextShadowBlur > 0) ? 'url(#tertiaryShadow)' : undefined"
                                        :transform="tertiaryTextRotation !== 0 ? `rotate(${tertiaryTextRotation} ${primaryWidth + secondaryWidth + (tertiaryWidth / 2) + (tertiaryIconData && tertiaryIconPosition === 'left' ? (tertiaryIconSize + 4) / 2 : tertiaryIconData && tertiaryIconPosition === 'right' ? -(tertiaryIconSize + 4) / 2 : 0)} 21.5)` : undefined"
                                        :style="{ textTransform: tertiaryTextTransform === 'none' ? 'none' : tertiaryTextTransform }"
                                    >
                                        {{ getTransformedText(tertiaryLabel || 'LABEL', tertiaryTextTransform) }}
                                    </text>
                                </template>
                            </svg>
                        </div>

                        <!-- Account Callout for Non-Authenticated Users -->
                        <div v-if="!isAuthenticated" class="account-callout">
                            <canvas ref="particlesCanvas" class="particles-canvas"></canvas>
                            <div class="callout-content">
                                <h4>Save your badges and share them with the community</h4>
                                <p>Create an account to save badges and submit to the community gallery</p>
                            </div>
                            <NuxtLink to="/account" class="callout-btn">
                                <span class="btn-text">CREATE AN ACCOUNT</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                                </svg>
                            </NuxtLink>
                        </div>

                        <div class="actions">
                            <button v-if="isAuthenticated" class="btn btn-secondary" @click="saveBadge" :disabled="isSavingBadge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15,9H5V5H15M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M21,16.5C21,16.5 19.5,13 16,13C16,13 13,15.61 13,19C13,22.39 15.62,25 19,25C22.38,25 25,22.39 25,19C25,15.61 21,16.5 21,16.5Z" />
                                </svg>
                                <span v-if="isSavingBadge">Saving...</span>
                                <span v-else>Save to Account</span>
                            </button>
                            <button v-if="isAuthenticated" class="btn btn-secondary" @click="submitToApproval" :disabled="isSubmittingBadge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" />
                                </svg>
                                <span v-if="isSubmittingBadge">Submitting...</span>
                                <span v-else>Submit to Approval</span>
                            </button>
                            <button class="btn btn-secondary" @click="downloadSVG">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                </svg>
                                Download
                            </button>
                            <button class="btn btn-secondary" @click="copyMarkdown">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                </svg>
                                Copy Markdown
                            </button>
                            <button class="btn btn-secondary" @click="copyShareLink">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
                                </svg>
                                Share
                            </button>

                            <div class="api-cta">
                                <div class="api-cta-header">
                                    <p>Prefer code?</p>
                                    <NuxtLink to="/api" class="api-btn">View API Docs</NuxtLink>
                                </div>
                                <div class="code-inline-wrapper">
                                    <div class="code-inline"><code>{{ apiUrl }}</code></div>
                                    <button 
                                        class="copy-code-btn" 
                                        :class="{ copied: apiUrlCopied }"
                                        @click="copyApiUrl"
                                        :title="apiUrlCopied ? 'Copied!' : 'Copy to clipboard'"
                                    >
                                        <svg v-if="!apiUrlCopied" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                        </svg>
                                        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>

        <Footer />
        
        <!-- Toast Notification -->
        <Toast
            :show="showToast"
            :message="toastMessage"
            :type="toastType"
            @close="showToast = false"
        />
        
        </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import TextStyler from '~/components/TextStyler.vue';
import IconPicker from '~/components/IconPicker.vue';

const { isAuthenticated } = useAuth();

const svgRef = ref<SVGElement | null>(null);
const primaryTextRef = ref<SVGTextElement | null>(null);
const secondaryTextRef = ref<SVGTextElement | null>(null);
const tertiaryTextRef = ref<SVGTextElement | null>(null);
const previewPanelRef = ref<HTMLElement | null>(null);

const dotMatrix = ref<HTMLElement | null>(null);
const dots = ref<Array<{ x: number; y: number; type: string; color: string; delay: number }>>([]);
const particlesCanvas = ref<HTMLCanvasElement | null>(null);

const isMobile = ref(false);
const panels = ref(2);
const isLoading = ref(false);
const isSavingBadge = ref(false);
const isSubmittingBadge = ref(false);
const lastSavedBadgeId = ref<string | null>(null);
const previewOffset = ref(0);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref<'success' | 'error' | 'info' | 'warning'>('success');
const apiUrlCopied = ref(false);
let apiUrlCopyTimeout: ReturnType<typeof setTimeout> | null = null;

// Generate random dots for the matrix background
const generateDots = () => {
    const dotCount = 100;
    const newDots = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'];

    for (let i = 0; i < dotCount; i++) {
        const types = ["small", "medium", "large"];
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

const primaryWidth = ref(90);
const secondaryWidth = ref(70);
const tertiaryWidth = ref(80);

const primaryBGColor = ref('#31C4F3');
const primaryTextColor = ref('#FFFFFF');
const secondaryBGColor = ref('#389AD5');
const secondaryTextColor = ref('#FFFFFF');
const tertiaryBGColor = ref('#2674A4');
const tertiaryTextColor = ref('#FFFFFF');

const primaryLabel = ref('');
const secondaryLabel = ref('');
const tertiaryLabel = ref('');

// Text styling properties for all panels
const primaryFontFamily = ref('Roboto');
const primaryFontSize = ref(12);
const primaryFontWeight = ref(600);
const primaryLetterSpacing = ref(2);
const primaryTextTransform = ref('uppercase');

const secondaryFontFamily = ref('Montserrat');
const secondaryFontSize = ref(12);
const secondaryFontWeight = ref(900);
const secondaryLetterSpacing = ref(2);
const secondaryTextTransform = ref('uppercase');

const tertiaryFontFamily = ref('Roboto');
const tertiaryFontSize = ref(12);
const tertiaryFontWeight = ref(500);
const tertiaryLetterSpacing = ref(2);
const tertiaryTextTransform = ref('uppercase');

// Icon configuration
const primaryIcon = ref<string>();
const primaryIconColor = ref('#FFFFFF');
const primaryIconSize = ref(16);
const primaryIconPosition = ref<'left' | 'right'>('left');
const showPrimaryIconPicker = ref(true);

const secondaryIcon = ref<string>();
const secondaryIconColor = ref('#FFFFFF');
const secondaryIconSize = ref(16);
const secondaryIconPosition = ref<'left' | 'right'>('left');
const showSecondaryIconPicker = ref(false);

const tertiaryIcon = ref<string>();
const tertiaryIconColor = ref('#FFFFFF');
const tertiaryIconSize = ref(16);
const tertiaryIconPosition = ref<'left' | 'right'>('left');
const showTertiaryIconPicker = ref(false);

// Badge global styling
const badgeScale = ref(1);
const badgeBorderRadius = ref(0);

// Text decorations for each panel
const primaryTextDecoration = ref('none');
const primaryFontStyle = ref('normal');
const secondaryTextDecoration = ref('none');
const secondaryFontStyle = ref('normal');
const tertiaryTextDecoration = ref('none');
const tertiaryFontStyle = ref('normal');

// Advanced text styling for each panel
const primaryTextShadowColor = ref('transparent');
const primaryTextShadowOffsetX = ref(0);
const primaryTextShadowOffsetY = ref(0);
const primaryTextShadowBlur = ref(0);
const primaryTextRotation = ref(0);
const primaryTextOpacity = ref(1);
const primaryFontVariant = ref('normal');

const secondaryTextShadowColor = ref('transparent');
const secondaryTextShadowOffsetX = ref(0);
const secondaryTextShadowOffsetY = ref(0);
const secondaryTextShadowBlur = ref(0);
const secondaryTextRotation = ref(0);
const secondaryTextOpacity = ref(1);
const secondaryFontVariant = ref('normal');

const tertiaryTextShadowColor = ref('transparent');
const tertiaryTextShadowOffsetX = ref(0);
const tertiaryTextShadowOffsetY = ref(0);
const tertiaryTextShadowBlur = ref(0);
const tertiaryTextRotation = ref(0);
const tertiaryTextOpacity = ref(1);
const tertiaryFontVariant = ref('normal');

// Icon data (SVG paths)
const primaryIconData = ref<{ path: string; hex: string } | null>(null);
const secondaryIconData = ref<{ path: string; hex: string } | null>(null);
const tertiaryIconData = ref<{ path: string; hex: string } | null>(null);

// Track which panel we're editing
const activePanel = ref('primary');
const activeIconPanel = ref('primary');



// Fetch icon data when icons change
watch(primaryIcon, async (newIcon) => {
    if (newIcon) {
        try {
            const response = await $fetch<{ success: boolean; icons: any[] }>('/api/icons/search', {
                params: { q: newIcon, limit: 1 },
            });
            if (response.success && response.icons.length > 0) {
                const icon = response.icons.find(i => i.slug === newIcon);
                if (icon) {
                    primaryIconData.value = { path: icon.path, hex: icon.hex };
                }
            }
        } catch (err) {
            console.error('Error fetching primary icon:', err);
        }
    } else {
        primaryIconData.value = null;
    }
});

watch(secondaryIcon, async (newIcon) => {
    if (newIcon) {
        try {
            const response = await $fetch<{ success: boolean; icons: any[] }>('/api/icons/search', {
                params: { q: newIcon, limit: 1 },
            });
            if (response.success && response.icons.length > 0) {
                const icon = response.icons.find(i => i.slug === newIcon);
                if (icon) {
                    secondaryIconData.value = { path: icon.path, hex: icon.hex };
                }
            }
        } catch (err) {
            console.error('Error fetching secondary icon:', err);
        }
    } else {
        secondaryIconData.value = null;
    }
});

watch(tertiaryIcon, async (newIcon) => {
    if (newIcon) {
        try {
            const response = await $fetch<{ success: boolean; icons: any[] }>('/api/icons/search', {
                params: { q: newIcon, limit: 1 },
            });
            if (response.success && response.icons.length > 0) {
                const icon = response.icons.find(i => i.slug === newIcon);
                if (icon) {
                    tertiaryIconData.value = { path: icon.path, hex: icon.hex };
                }
            }
        } catch (err) {
            console.error('Error fetching tertiary icon:', err);
        }
    } else {
        tertiaryIconData.value = null;
    }
});

const badgeWidth = computed(() => {
    if (panels.value === 3) {
        return primaryWidth.value + secondaryWidth.value + tertiaryWidth.value;
    }
    return primaryWidth.value + secondaryWidth.value;
});

const apiUrl = computed(() => {
    const params = new URLSearchParams();
    params.append('panels', panels.value.toString());
    params.append('primaryLabel', primaryLabel.value || 'PRIMARY');
    params.append('secondaryLabel', secondaryLabel.value || 'SECONDARY');
    params.append('primaryBGColor', primaryBGColor.value);
    params.append('primaryTextColor', primaryTextColor.value);
    params.append('secondaryBGColor', secondaryBGColor.value);
    params.append('secondaryTextColor', secondaryTextColor.value);
    
    // Primary styling
    params.append('primaryFontSize', primaryFontSize.value.toString());
    params.append('primaryFontWeight', primaryFontWeight.value.toString());
    params.append('primaryLetterSpacing', primaryLetterSpacing.value.toString());
    params.append('primaryFontFamily', primaryFontFamily.value);
    params.append('primaryTextTransform', primaryTextTransform.value);
    
    // Secondary styling
    params.append('secondaryFontSize', secondaryFontSize.value.toString());
    params.append('secondaryFontWeight', secondaryFontWeight.value.toString());
    params.append('secondaryLetterSpacing', secondaryLetterSpacing.value.toString());
    params.append('secondaryFontFamily', secondaryFontFamily.value);
    params.append('secondaryTextTransform', secondaryTextTransform.value);
    
    if (panels.value === 3) {
        params.append('tertiaryLabel', tertiaryLabel.value || 'TERTIARY');
        params.append('tertiaryBGColor', tertiaryBGColor.value);
        params.append('tertiaryTextColor', tertiaryTextColor.value);
        
        // Tertiary styling
        params.append('tertiaryFontSize', tertiaryFontSize.value.toString());
        params.append('tertiaryFontWeight', tertiaryFontWeight.value.toString());
        params.append('tertiaryLetterSpacing', tertiaryLetterSpacing.value.toString());
        params.append('tertiaryFontFamily', tertiaryFontFamily.value);
        params.append('tertiaryTextTransform', tertiaryTextTransform.value);
        
        // Tertiary icon
        if (tertiaryIcon.value) {
            params.append('tertiaryIcon', tertiaryIcon.value);
            params.append('tertiaryIconColor', tertiaryIconColor.value);
            params.append('tertiaryIconSize', tertiaryIconSize.value.toString());
            params.append('tertiaryIconPosition', tertiaryIconPosition.value);
        }
    }
    
    // Primary icon
    if (primaryIcon.value) {
        params.append('primaryIcon', primaryIcon.value);
        params.append('primaryIconColor', primaryIconColor.value);
        params.append('primaryIconSize', primaryIconSize.value.toString());
        params.append('primaryIconPosition', primaryIconPosition.value);
    }
    
    // Secondary icon
    if (secondaryIcon.value) {
        params.append('secondaryIcon', secondaryIcon.value);
        params.append('secondaryIconColor', secondaryIconColor.value);
        params.append('secondaryIconSize', secondaryIconSize.value.toString());
        params.append('secondaryIconPosition', secondaryIconPosition.value);
    }
    
    // Badge styling
    if (badgeScale.value !== 1) {
        params.append('scale', badgeScale.value.toString());
    }
    if (badgeBorderRadius.value !== 0) {
        params.append('borderRadius', badgeBorderRadius.value.toString());
    }
    
    // Primary text decorations
    if (primaryTextDecoration.value !== 'none') {
        params.append('primaryTextDecoration', primaryTextDecoration.value);
    }
    if (primaryFontStyle.value !== 'normal') {
        params.append('primaryFontStyle', primaryFontStyle.value);
    }
    
    // Secondary text decorations
    if (secondaryTextDecoration.value !== 'none') {
        params.append('secondaryTextDecoration', secondaryTextDecoration.value);
    }
    if (secondaryFontStyle.value !== 'normal') {
        params.append('secondaryFontStyle', secondaryFontStyle.value);
    }
    
    // Tertiary text decorations (if 3 panels)
    if (panels.value === 3) {
        if (tertiaryTextDecoration.value !== 'none') {
            params.append('tertiaryTextDecoration', tertiaryTextDecoration.value);
        }
        if (tertiaryFontStyle.value !== 'normal') {
            params.append('tertiaryFontStyle', tertiaryFontStyle.value);
        }
    }
    
    // Advanced text styling - Primary
    if (primaryTextShadowColor.value !== 'transparent') {
        params.append('primaryTextShadowColor', primaryTextShadowColor.value);
    }
    if (primaryTextShadowOffsetX.value !== 0) {
        params.append('primaryTextShadowOffsetX', primaryTextShadowOffsetX.value.toString());
    }
    if (primaryTextShadowOffsetY.value !== 0) {
        params.append('primaryTextShadowOffsetY', primaryTextShadowOffsetY.value.toString());
    }
    if (primaryTextShadowBlur.value !== 0) {
        params.append('primaryTextShadowBlur', primaryTextShadowBlur.value.toString());
    }
    if (primaryTextRotation.value !== 0) {
        params.append('primaryTextRotation', primaryTextRotation.value.toString());
    }
    if (primaryTextOpacity.value !== 1) {
        params.append('primaryTextOpacity', primaryTextOpacity.value.toString());
    }
    if (primaryFontVariant.value !== 'normal') {
        params.append('primaryFontVariant', primaryFontVariant.value);
    }
    
    // Advanced text styling - Secondary
    if (secondaryTextShadowColor.value !== 'transparent') {
        params.append('secondaryTextShadowColor', secondaryTextShadowColor.value);
    }
    if (secondaryTextShadowOffsetX.value !== 0) {
        params.append('secondaryTextShadowOffsetX', secondaryTextShadowOffsetX.value.toString());
    }
    if (secondaryTextShadowOffsetY.value !== 0) {
        params.append('secondaryTextShadowOffsetY', secondaryTextShadowOffsetY.value.toString());
    }
    if (secondaryTextShadowBlur.value !== 0) {
        params.append('secondaryTextShadowBlur', secondaryTextShadowBlur.value.toString());
    }
    if (secondaryTextRotation.value !== 0) {
        params.append('secondaryTextRotation', secondaryTextRotation.value.toString());
    }
    if (secondaryTextOpacity.value !== 1) {
        params.append('secondaryTextOpacity', secondaryTextOpacity.value.toString());
    }
    if (secondaryFontVariant.value !== 'normal') {
        params.append('secondaryFontVariant', secondaryFontVariant.value);
    }
    
    // Advanced text styling - Tertiary (if 3 panels)
    if (panels.value === 3) {
        if (tertiaryTextShadowColor.value !== 'transparent') {
            params.append('tertiaryTextShadowColor', tertiaryTextShadowColor.value);
        }
        if (tertiaryTextShadowOffsetX.value !== 0) {
            params.append('tertiaryTextShadowOffsetX', tertiaryTextShadowOffsetX.value.toString());
        }
        if (tertiaryTextShadowOffsetY.value !== 0) {
            params.append('tertiaryTextShadowOffsetY', tertiaryTextShadowOffsetY.value.toString());
        }
        if (tertiaryTextShadowBlur.value !== 0) {
            params.append('tertiaryTextShadowBlur', tertiaryTextShadowBlur.value.toString());
        }
        if (tertiaryTextRotation.value !== 0) {
            params.append('tertiaryTextRotation', tertiaryTextRotation.value.toString());
        }
        if (tertiaryTextOpacity.value !== 1) {
            params.append('tertiaryTextOpacity', tertiaryTextOpacity.value.toString());
        }
        if (tertiaryFontVariant.value !== 'normal') {
            params.append('tertiaryFontVariant', tertiaryFontVariant.value);
        }
    }
    
    return `${typeof window !== 'undefined' ? window.location.origin : ''}/api/badges/generate?${params.toString()}`;
});

function getTransformedText(text: string, transform: string): string {
    switch (transform) {
        case 'uppercase':
            return text.toUpperCase();
        case 'lowercase':
            return text.toLowerCase();
        case 'capitalize':
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        default:
            return text;
    }
}

function updateFontFamily(val: string) {
    if (activePanel.value === 'primary') primaryFontFamily.value = val;
    else if (activePanel.value === 'secondary') secondaryFontFamily.value = val;
    else tertiaryFontFamily.value = val;
}

function updateFontSize(val: number) {
    if (activePanel.value === 'primary') primaryFontSize.value = val;
    else if (activePanel.value === 'secondary') secondaryFontSize.value = val;
    else tertiaryFontSize.value = val;
}

function updateFontWeight(val: number) {
    if (activePanel.value === 'primary') primaryFontWeight.value = val;
    else if (activePanel.value === 'secondary') secondaryFontWeight.value = val;
    else tertiaryFontWeight.value = val;
}

function updateLetterSpacing(val: number) {
    if (activePanel.value === 'primary') primaryLetterSpacing.value = val;
    else if (activePanel.value === 'secondary') secondaryLetterSpacing.value = val;
    else tertiaryLetterSpacing.value = val;
}

function updateTextTransform(val: string) {
    if (activePanel.value === 'primary') primaryTextTransform.value = val;
    else if (activePanel.value === 'secondary') secondaryTextTransform.value = val;
    else tertiaryTextTransform.value = val;
}

function updateTextDecoration(val: string) {
    if (activePanel.value === 'primary') primaryTextDecoration.value = val;
    else if (activePanel.value === 'secondary') secondaryTextDecoration.value = val;
    else tertiaryTextDecoration.value = val;
}

function updateFontStyle(val: string) {
    if (activePanel.value === 'primary') primaryFontStyle.value = val;
    else if (activePanel.value === 'secondary') secondaryFontStyle.value = val;
    else tertiaryFontStyle.value = val;
}

function updateTextShadowColor(val: string) {
    if (activePanel.value === 'primary') primaryTextShadowColor.value = val;
    else if (activePanel.value === 'secondary') secondaryTextShadowColor.value = val;
    else tertiaryTextShadowColor.value = val;
}

function updateTextShadowOffsetX(val: number) {
    if (activePanel.value === 'primary') primaryTextShadowOffsetX.value = val;
    else if (activePanel.value === 'secondary') secondaryTextShadowOffsetX.value = val;
    else tertiaryTextShadowOffsetX.value = val;
}

function updateTextShadowOffsetY(val: number) {
    if (activePanel.value === 'primary') primaryTextShadowOffsetY.value = val;
    else if (activePanel.value === 'secondary') secondaryTextShadowOffsetY.value = val;
    else tertiaryTextShadowOffsetY.value = val;
}

function updateTextShadowBlur(val: number) {
    if (activePanel.value === 'primary') primaryTextShadowBlur.value = val;
    else if (activePanel.value === 'secondary') secondaryTextShadowBlur.value = val;
    else tertiaryTextShadowBlur.value = val;
}

function updateTextRotation(val: number) {
    if (activePanel.value === 'primary') primaryTextRotation.value = val;
    else if (activePanel.value === 'secondary') secondaryTextRotation.value = val;
    else tertiaryTextRotation.value = val;
}

function updateTextOpacity(val: number) {
    if (activePanel.value === 'primary') primaryTextOpacity.value = val;
    else if (activePanel.value === 'secondary') secondaryTextOpacity.value = val;
    else tertiaryTextOpacity.value = val;
}

function updateFontVariant(val: string) {
    if (activePanel.value === 'primary') primaryFontVariant.value = val;
    else if (activePanel.value === 'secondary') secondaryFontVariant.value = val;
    else tertiaryFontVariant.value = val;
}

function setPanels(count: number) {
    panels.value = count;
    if (count === 2) {
        tertiaryLabel.value = '';
    }
    // Recalculate widths after panel change
    nextTick(() => {
        updateWidths();
    });
}

function updateWidths() {
    if (primaryTextRef.value && secondaryTextRef.value) {
        const primaryIconPadding = primaryIconData.value ? primaryIconSize.value + 8 : 0;
        const secondaryIconPadding = secondaryIconData.value ? secondaryIconSize.value + 8 : 0;
        const tertiaryIconPadding = tertiaryIconData.value ? tertiaryIconSize.value + 8 : 0;
        
        primaryWidth.value = primaryTextRef.value.getBBox().width + 20 + primaryIconPadding;
        secondaryWidth.value = secondaryTextRef.value.getBBox().width + 20 + secondaryIconPadding;
        if (panels.value === 3 && tertiaryTextRef.value) {
            tertiaryWidth.value = tertiaryTextRef.value.getBBox().width + 20 + tertiaryIconPadding;
        }
    }
}

function downloadSVG() {
    if (!svgRef.value) return;

    const labels = [primaryLabel.value, secondaryLabel.value, tertiaryLabel.value]
        .map(label => label.trim())
        .filter(label => label !== '')
        .map(label => label.toLowerCase().replace(/\s+/g, '-'));

    const filename = labels.join('-') + '.svg';

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.value);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyMarkdown() {
    if (!svgRef.value) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.value);
    const base64 = btoa(unescape(encodeURIComponent(svgStr)));
    const md = `[![forthebadge](data:image/svg+xml;base64,${base64})](https://forthebadge.com)`;
    navigator.clipboard.writeText(md).then(() => {
        toastMessage.value = 'Markdown copied to clipboard!';
        toastType.value = 'success';
        showToast.value = true;
    });
}

function generateShareLink() {
    // Generate the badge API URL that will be embedded with OG tags
    const params = new URLSearchParams();
    params.append('panels', panels.value.toString());
    params.append('primaryLabel', primaryLabel.value || 'PRIMARY');
    params.append('secondaryLabel', secondaryLabel.value || 'SECONDARY');
    params.append('primaryBGColor', encodeURIComponent(primaryBGColor.value));
    params.append('primaryTextColor', encodeURIComponent(primaryTextColor.value));
    params.append('secondaryBGColor', encodeURIComponent(secondaryBGColor.value));
    params.append('secondaryTextColor', encodeURIComponent(secondaryTextColor.value));
    
    // Primary styling
    params.append('primaryFontSize', primaryFontSize.value.toString());
    params.append('primaryFontWeight', primaryFontWeight.value.toString());
    params.append('primaryLetterSpacing', primaryLetterSpacing.value.toString());
    params.append('primaryFontFamily', primaryFontFamily.value);
    params.append('primaryTextTransform', primaryTextTransform.value);
    
    // Secondary styling
    params.append('secondaryFontSize', secondaryFontSize.value.toString());
    params.append('secondaryFontWeight', secondaryFontWeight.value.toString());
    params.append('secondaryLetterSpacing', secondaryLetterSpacing.value.toString());
    params.append('secondaryFontFamily', secondaryFontFamily.value);
    params.append('secondaryTextTransform', secondaryTextTransform.value);
    
    if (panels.value === 3) {
        params.append('tertiaryLabel', tertiaryLabel.value || 'TERTIARY');
        params.append('tertiaryBGColor', encodeURIComponent(tertiaryBGColor.value));
        params.append('tertiaryTextColor', encodeURIComponent(tertiaryTextColor.value));
        
        // Tertiary styling
        params.append('tertiaryFontSize', tertiaryFontSize.value.toString());
        params.append('tertiaryFontWeight', tertiaryFontWeight.value.toString());
        params.append('tertiaryLetterSpacing', tertiaryLetterSpacing.value.toString());
        params.append('tertiaryFontFamily', tertiaryFontFamily.value);
        params.append('tertiaryTextTransform', tertiaryTextTransform.value);
        
        // Tertiary icon
        if (tertiaryIcon.value) {
            params.append('tertiaryIcon', tertiaryIcon.value);
            params.append('tertiaryIconColor', encodeURIComponent(tertiaryIconColor.value));
            params.append('tertiaryIconSize', tertiaryIconSize.value.toString());
            params.append('tertiaryIconPosition', tertiaryIconPosition.value);
        }
    }
    
    // Primary icon
    if (primaryIcon.value) {
        params.append('primaryIcon', primaryIcon.value);
        params.append('primaryIconColor', encodeURIComponent(primaryIconColor.value));
        params.append('primaryIconSize', primaryIconSize.value.toString());
        params.append('primaryIconPosition', primaryIconPosition.value);
    }
    
    // Secondary icon
    if (secondaryIcon.value) {
        params.append('secondaryIcon', secondaryIcon.value);
        params.append('secondaryIconColor', encodeURIComponent(secondaryIconColor.value));
        params.append('secondaryIconSize', secondaryIconSize.value.toString());
        params.append('secondaryIconPosition', secondaryIconPosition.value);
    }

    // Return the badge URL (supports both image embedding and social sharing with OG tags)
    return `${window.location.origin}/api/badges/generate?${params.toString()}`;
}

function copyShareLink() {
    const link = generateShareLink();
    navigator.clipboard.writeText(link).then(() => {
        toastMessage.value = 'Share link copied to clipboard!';
        toastType.value = 'success';
        showToast.value = true;
    });
}

function copyApiUrl() {
    navigator.clipboard.writeText(apiUrl.value).then(() => {
        apiUrlCopied.value = true;

        if (apiUrlCopyTimeout) {
            clearTimeout(apiUrlCopyTimeout);
        }

        apiUrlCopyTimeout = setTimeout(() => {
            apiUrlCopied.value = false;
        }, 2000);
    }).catch((err) => {
        console.error('Failed to copy:', err);
        toastMessage.value = 'Failed to copy API URL';
        toastType.value = 'error';
        showToast.value = true;
    });
}

async function saveBadge() {
    if (!svgRef.value) return;
    if (!primaryLabel.value && !secondaryLabel.value) {
        toastMessage.value = 'Please enter at least one label before saving';
        toastType.value = 'warning';
        showToast.value = true;
        return;
    }

    isSavingBadge.value = true;

    try {
        const badgeService = useBadgeService();
        // Fetch clean SVG from the API endpoint (with metadata) instead of serializing Vue component
        const svgStr = await $fetch<string>(apiUrl.value, { responseType: 'text' as any });
        const badgeName = [primaryLabel.value, secondaryLabel.value, tertiaryLabel.value]
            .map(label => label.trim())
            .filter(label => label !== '')
            .join(' ');

        const response = await badgeService.saveBadge({
            name: badgeName || 'Unnamed Badge',
            description: '',
            svg: svgStr,
        });

        // Store the badge ID for potential submission
        lastSavedBadgeId.value = response.badgeId;

        toastMessage.value = 'Badge saved successfully!';
        toastType.value = 'success';
        showToast.value = true;
        
        // Wait a moment to show the toast before navigating
        setTimeout(() => {
            navigateTo('/my-badges');
        }, 500);
    }
    catch (error) {
        console.error('Error saving badge:', error);
        toastMessage.value = 'Failed to save badge. Please try again.';
        toastType.value = 'error';
        showToast.value = true;
    }
    finally {
        isSavingBadge.value = false;
    }
}

async function submitToApproval() {
    if (!svgRef.value) return;
    if (!primaryLabel.value && !secondaryLabel.value) {
        toastMessage.value = 'Please enter at least one label before submitting';
        toastType.value = 'warning';
        showToast.value = true;
        return;
    }

    isSubmittingBadge.value = true;

    try {
        const badgeService = useBadgeService();
        let badgeId = lastSavedBadgeId.value;

        // If badge hasn't been saved yet, save it first
        if (!badgeId) {
            // Fetch clean SVG from the API endpoint (with metadata) instead of serializing Vue component
            const svgStr = await $fetch<string>(apiUrl.value, { responseType: 'text' as any });
            const badgeName = [primaryLabel.value, secondaryLabel.value, tertiaryLabel.value]
                .map(label => label.trim())
                .filter(label => label !== '')
                .join(' ');

            const saveResponse = await badgeService.saveBadge({
                name: badgeName || 'Unnamed Badge',
                description: '',
                svg: svgStr,
            });

            badgeId = saveResponse.badgeId;
            lastSavedBadgeId.value = badgeId;
        }

        // Submit the badge for approval
        await badgeService.submitBadge({ badgeId });

        toastMessage.value = 'Badge submitted for approval successfully!';
        toastType.value = 'success';
        showToast.value = true;
        
        // Wait a moment to show the toast before navigating
        setTimeout(() => {
            navigateTo('/my-badges');
        }, 500);
    }
    catch (error) {
        console.error('Error submitting badge:', error);
        toastMessage.value = 'Failed to submit badge. Please try again.';
        toastType.value = 'error';
        showToast.value = true;
    }
    finally {
        isSubmittingBadge.value = false;
    }
}

watch([primaryLabel, secondaryLabel, tertiaryLabel, primaryFontSize, secondaryFontSize, tertiaryFontSize, primaryFontWeight, secondaryFontWeight, tertiaryFontWeight, primaryLetterSpacing, secondaryLetterSpacing, tertiaryLetterSpacing, primaryFontFamily, secondaryFontFamily, tertiaryFontFamily, primaryIconData, secondaryIconData, tertiaryIconData, primaryIconSize, secondaryIconSize, tertiaryIconSize], () => {
    nextTick(() => {
        updateWidths();
    });
});

// Particles animation
let particlesAnimationId: number;
function initParticles() {
    const canvas = particlesCanvas.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
        hue: number;
    }> = [];

    const particleCount = 40;
    const rainbowColors = [
        0,    // Red
        30,   // Orange
        60,   // Yellow
        120,  // Green
        180,  // Cyan
        240,  // Blue
        280,  // Purple
        320,  // Magenta
    ];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1.5,
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.6,
            opacity: Math.random() * 0.3 + 0.3,
            hue: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
        });
    }

    function animate() {
        if (!canvas || !ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Slowly shift hue for color animation
            particle.hue = (particle.hue + 0.3) % 360;

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });

        particlesAnimationId = requestAnimationFrame(animate);
    }

    animate();
}

onMounted(() => {
    generateDots();
    
    isMobile.value = window.innerWidth < 768;

    // Initialize particles if user is not authenticated
    if (import.meta.client && !isAuthenticated.value) {
        setTimeout(() => initParticles(), 100);
        window.addEventListener('resize', () => {
            if (particlesCanvas.value && !isAuthenticated.value) {
                particlesCanvas.value.width = particlesCanvas.value.offsetWidth;
                particlesCanvas.value.height = particlesCanvas.value.offsetHeight;
            }
        });
    }

    const params = new URLSearchParams(window.location.search);
    if (params.has('primaryBGColor')) primaryBGColor.value = params.get('primaryBGColor')!;
    if (params.has('primaryTextColor')) primaryTextColor.value = params.get('primaryTextColor')!;
    if (params.has('secondaryBGColor')) secondaryBGColor.value = params.get('secondaryBGColor')!;
    if (params.has('secondaryTextColor')) secondaryTextColor.value = params.get('secondaryTextColor')!;
    if (params.has('tertiaryBGColor')) tertiaryBGColor.value = params.get('tertiaryBGColor')!;
    if (params.has('tertiaryTextColor')) tertiaryTextColor.value = params.get('tertiaryTextColor')!;
    if (params.has('primaryLabel')) primaryLabel.value = params.get('primaryLabel')!;
    if (params.has('secondaryLabel')) secondaryLabel.value = params.get('secondaryLabel')!;
    if (params.has('tertiaryLabel')) tertiaryLabel.value = params.get('tertiaryLabel')!;
    if (params.has('panels')) panels.value = Number(params.get('panels'));
    
    // Load primary styling parameters
    if (params.has('primaryFontFamily')) primaryFontFamily.value = params.get('primaryFontFamily')!;
    if (params.has('primaryFontSize')) primaryFontSize.value = Number(params.get('primaryFontSize'));
    if (params.has('primaryFontWeight')) primaryFontWeight.value = Number(params.get('primaryFontWeight'));
    if (params.has('primaryLetterSpacing')) primaryLetterSpacing.value = Number(params.get('primaryLetterSpacing'));
    if (params.has('primaryTextTransform')) primaryTextTransform.value = params.get('primaryTextTransform')!;
    if (params.has('primaryTextDecoration')) primaryTextDecoration.value = params.get('primaryTextDecoration')!;
    if (params.has('primaryFontStyle')) primaryFontStyle.value = params.get('primaryFontStyle')!;
    
    // Load secondary styling parameters
    if (params.has('secondaryFontFamily')) secondaryFontFamily.value = params.get('secondaryFontFamily')!;
    if (params.has('secondaryFontSize')) secondaryFontSize.value = Number(params.get('secondaryFontSize'));
    if (params.has('secondaryFontWeight')) secondaryFontWeight.value = Number(params.get('secondaryFontWeight'));
    if (params.has('secondaryLetterSpacing')) secondaryLetterSpacing.value = Number(params.get('secondaryLetterSpacing'));
    if (params.has('secondaryTextTransform')) secondaryTextTransform.value = params.get('secondaryTextTransform')!;
    if (params.has('secondaryTextDecoration')) secondaryTextDecoration.value = params.get('secondaryTextDecoration')!;
    if (params.has('secondaryFontStyle')) secondaryFontStyle.value = params.get('secondaryFontStyle')!;
    
    // Load tertiary styling parameters
    if (params.has('tertiaryFontFamily')) tertiaryFontFamily.value = params.get('tertiaryFontFamily')!;
    if (params.has('tertiaryFontSize')) tertiaryFontSize.value = Number(params.get('tertiaryFontSize'));
    if (params.has('tertiaryFontWeight')) tertiaryFontWeight.value = Number(params.get('tertiaryFontWeight'));
    if (params.has('tertiaryLetterSpacing')) tertiaryLetterSpacing.value = Number(params.get('tertiaryLetterSpacing'));
    if (params.has('tertiaryTextTransform')) tertiaryTextTransform.value = params.get('tertiaryTextTransform')!;
    if (params.has('tertiaryTextDecoration')) tertiaryTextDecoration.value = params.get('tertiaryTextDecoration')!;
    if (params.has('tertiaryFontStyle')) tertiaryFontStyle.value = params.get('tertiaryFontStyle')!;
    
    // Load badge styling
    if (params.has('scale')) badgeScale.value = Number(params.get('scale'));
    if (params.has('borderRadius')) badgeBorderRadius.value = Number(params.get('borderRadius'));
    
    // Load primary advanced text styling
    if (params.has('primaryTextShadowColor')) primaryTextShadowColor.value = params.get('primaryTextShadowColor')!;
    if (params.has('primaryTextShadowOffsetX')) primaryTextShadowOffsetX.value = Number(params.get('primaryTextShadowOffsetX'));
    if (params.has('primaryTextShadowOffsetY')) primaryTextShadowOffsetY.value = Number(params.get('primaryTextShadowOffsetY'));
    if (params.has('primaryTextShadowBlur')) primaryTextShadowBlur.value = Number(params.get('primaryTextShadowBlur'));
    if (params.has('primaryTextRotation')) primaryTextRotation.value = Number(params.get('primaryTextRotation'));
    if (params.has('primaryTextOpacity')) primaryTextOpacity.value = Number(params.get('primaryTextOpacity'));
    if (params.has('primaryFontVariant')) primaryFontVariant.value = params.get('primaryFontVariant')!;
    
    // Load secondary advanced text styling
    if (params.has('secondaryTextShadowColor')) secondaryTextShadowColor.value = params.get('secondaryTextShadowColor')!;
    if (params.has('secondaryTextShadowOffsetX')) secondaryTextShadowOffsetX.value = Number(params.get('secondaryTextShadowOffsetX'));
    if (params.has('secondaryTextShadowOffsetY')) secondaryTextShadowOffsetY.value = Number(params.get('secondaryTextShadowOffsetY'));
    if (params.has('secondaryTextShadowBlur')) secondaryTextShadowBlur.value = Number(params.get('secondaryTextShadowBlur'));
    if (params.has('secondaryTextRotation')) secondaryTextRotation.value = Number(params.get('secondaryTextRotation'));
    if (params.has('secondaryTextOpacity')) secondaryTextOpacity.value = Number(params.get('secondaryTextOpacity'));
    if (params.has('secondaryFontVariant')) secondaryFontVariant.value = params.get('secondaryFontVariant')!;
    
    // Load tertiary advanced text styling
    if (params.has('tertiaryTextShadowColor')) tertiaryTextShadowColor.value = params.get('tertiaryTextShadowColor')!;
    if (params.has('tertiaryTextShadowOffsetX')) tertiaryTextShadowOffsetX.value = Number(params.get('tertiaryTextShadowOffsetX'));
    if (params.has('tertiaryTextShadowOffsetY')) tertiaryTextShadowOffsetY.value = Number(params.get('tertiaryTextShadowOffsetY'));
    if (params.has('tertiaryTextShadowBlur')) tertiaryTextShadowBlur.value = Number(params.get('tertiaryTextShadowBlur'));
    if (params.has('tertiaryTextRotation')) tertiaryTextRotation.value = Number(params.get('tertiaryTextRotation'));
    if (params.has('tertiaryTextOpacity')) tertiaryTextOpacity.value = Number(params.get('tertiaryTextOpacity'));
    if (params.has('tertiaryFontVariant')) tertiaryFontVariant.value = params.get('tertiaryFontVariant')!;
    
    // Load primary icon parameters
    if (params.has('primaryIcon')) {
        primaryIcon.value = params.get('primaryIcon')!;
        showPrimaryIconPicker.value = true;
    }
    if (params.has('primaryIconColor')) primaryIconColor.value = params.get('primaryIconColor')!;
    if (params.has('primaryIconSize')) primaryIconSize.value = Number(params.get('primaryIconSize'));
    if (params.has('primaryIconPosition')) primaryIconPosition.value = params.get('primaryIconPosition') as 'left' | 'right';
    
    // Load secondary icon parameters
    if (params.has('secondaryIcon')) {
        secondaryIcon.value = params.get('secondaryIcon')!;
        showSecondaryIconPicker.value = true;
    }
    if (params.has('secondaryIconColor')) secondaryIconColor.value = params.get('secondaryIconColor')!;
    if (params.has('secondaryIconSize')) secondaryIconSize.value = Number(params.get('secondaryIconSize'));
    if (params.has('secondaryIconPosition')) secondaryIconPosition.value = params.get('secondaryIconPosition') as 'left' | 'right';
    
    // Load tertiary icon parameters
    if (params.has('tertiaryIcon')) {
        tertiaryIcon.value = params.get('tertiaryIcon')!;
        showTertiaryIconPicker.value = true;
    }
    if (params.has('tertiaryIconColor')) tertiaryIconColor.value = params.get('tertiaryIconColor')!;
    if (params.has('tertiaryIconSize')) tertiaryIconSize.value = Number(params.get('tertiaryIconSize'));
    if (params.has('tertiaryIconPosition')) tertiaryIconPosition.value = params.get('tertiaryIconPosition') as 'left' | 'right';

window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768;
    });


    // Calculate initial widths after mount
    nextTick(() => {
        updateWidths();
    });
});

onUnmounted(() => {
    if (particlesAnimationId) {
        cancelAnimationFrame(particlesAnimationId);
    }
});

definePageMeta({
    layout: false,
});
</script>

<style scoped>
.generator-page {
    min-height: 100vh;
    background: #ffffff;
}

.generator-wrapper {
    max-width: 1600px;
    margin: 0 auto;
    padding: 4rem 2rem;
    padding-top: 2rem;
}

.mobile-message {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    text-align: center;
    border: 1px solid #e5e5e5;
}

.mobile-message h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #000;
    font-weight: 700;
}

.mobile-message p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
}

.social-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.social-buttons button {
    padding: 0.75rem 2rem;
    border: 2px solid #000;
    border-radius: 8px;
    background: white;
    color: #000;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.social-buttons button:hover {
    background: #000;
    color: white;
}

.page-header {
    min-height: 40vh;
    background: #f8fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    padding-top: 8rem;
    padding-bottom: 4rem;
    position: relative;
    overflow: hidden;
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

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    text-align: center;
    z-index: 1;
    position: relative;
}

.header-content {
    max-width: 800px;
    margin: 0 auto;
}

.page-header h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    color: #000;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
}

.subtitle {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    color: #6b7280;
    margin-bottom: 2rem;
    line-height: 1.6;
    font-weight: 400;
}

.generator-layout {
    display: flex;
    flex-direction: column;
}

.content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.controls-panel {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.panel-header {
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #000;
}

.panel-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
    margin-bottom: 0.5rem;
}

.panel-header p {
    font-size: 0.9rem;
    color: #666;
}

.panel-toggle {
    display: flex;
    gap: 0.75rem;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 1.5rem;
}

.panel-toggle button {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: #999;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 2px solid transparent;
    margin-bottom: -1.5rem;
}

.panel-toggle button:hover {
    color: #000;
}

.panel-toggle button.active {
    color: #000;
    border-bottom-color: #000;
}

.control-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.icon-panel-selector {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e5e5;
}

.icon-panel-selector label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
}

.icon-panel-buttons {
    display: flex;
    gap: 0.5rem;
}

.icon-panel-btn {
    flex: 1;
    padding: 0.5rem;
    border: 2px solid #e5e5e5;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.8rem;
    transition: all 0.2s;
    color: #666;
}

.icon-panel-btn:hover {
    border-color: #ccc;
}

.icon-panel-btn.active {
    border-color: #000;
    background: #f0f0f0;
    color: #000;
}

.primary-btn.active {
    border-color: #31C4F3;
}

.secondary-btn.active {
    border-color: #389AD5;
}

.tertiary-btn.active {
    border-color: #2674A4;
}

.panel-container {
    padding: 1.5rem;
    background: #fafafa;
    border-radius: 8px;
    border-left: 4px solid #000;
}

.panel-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #666;
    margin-bottom: 0.5rem;
    display: inline-block;
}

.primary-panel {
    border-left-color: #31C4F3;
}

.secondary-panel {
    border-left-color: #389AD5;
}

.tertiary-panel {
    border-left-color: #2674A4;
}

.control-section h3 {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #000;
}

.text-input {
    padding: 0.75rem;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: all 0.2s;
}

.text-input:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.color-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.color-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.color-group label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #999;
}

.color-input {
    height: 48px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.color-input:hover {
    border-color: #000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.preview-panel {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    transition: transform 0.1s ease-out;
    position: sticky;
    top: 120px;
}

.preview-container {
    background: #fafafa;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
}

.badge-svg {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08));
}

.account-callout {
    position: relative;
    background: #f8f8f8;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
    overflow: hidden;
    animation: slideIn 0.4s ease-out;
}

.particles-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.callout-icon {
    display: none;
}

.callout-content {
    position: relative;
    z-index: 1;
    margin-bottom: 1rem;
}

.callout-content h4 {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #333;
}

.callout-content p {
    font-size: 0.875rem;
    margin: 0;
    color: #666;
    line-height: 1.4;
}

.callout-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.5rem;
    background: #000;
    color: white;
    text-decoration: none;
    font-weight: 900;
    font-size: 0.85rem;
    border-radius: 4px;
    transition: all 0.2s;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border: none;
    cursor: pointer;
}

.callout-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.callout-btn .btn-text {
    font-weight: 900;
}

.callout-btn svg {
    flex-shrink: 0;
}

.actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.api-cta {
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e5e5;
}

.api-cta-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.api-cta p {
    margin: 0;
    color: #555;
    font-size: 0.85rem;
}

.api-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.35rem 0.75rem;
    background: #000;
    color: #fff;
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: 600;
    border-radius: 4px;
    white-space: nowrap;
    transition: all 0.2s;
}

.api-btn:hover {
    background: #333;
}

.code-inline-wrapper {
    position: relative;
}

.api-cta .code-inline {
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    padding-right: 2.5rem;
    overflow-x: auto;
    font-size: 0.75rem;
    max-width: 100%;
}

.api-cta .code-inline code {
    background: none;
    border: none;
    padding: 0;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.75rem;
    color: #333;
    word-break: break-all;
}

.copy-code-btn {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.35rem;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    color: #555;
}

.copy-code-btn:hover {
    background: #fafafa;
    border-color: #31C4F3;
    color: #31C4F3;
}

.copy-code-btn.copied {
    background: #e8f5e9;
    border-color: #4caf50;
    color: #2e7d32;
}

.copy-code-btn svg {
    flex-shrink: 0;
}

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.btn-primary {
    background: #000;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-secondary {
    background: white;
    color: #000;
    border: 1px solid #e5e5e5;
}

.btn-secondary:hover:not(:disabled) {
    border-color: #000;
    background: #fafafa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.btn-secondary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    position: relative;
}

.coming-soon-badge {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0.125rem 0.5rem;
    background: #000;
    color: #fff;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.footer-text {
    font-size: 0.8rem;
    color: #999;
    text-align: center;
    margin-top: 1rem;
}

.footer-text a {
    color: #000;
    text-decoration: none;
    font-weight: 600;
}

.footer-text a:hover {
    text-decoration: underline;
}

@media (max-width: 1200px) {
    .content {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .preview-panel {
        position: relative;
        top: auto;
    }
}

@media (max-width: 768px) {
    .page-header {
        min-height: 30vh;
        padding-top: 6rem;
        padding-bottom: 3rem;
    }

    .header-container {
        padding: 0 1rem;
    }

    .generator-wrapper {
        padding: 2rem 1rem 6rem;
    }

    .content {
        gap: 2rem;
    }

    .controls-panel {
        gap: 1.5rem;
    }

    .panel-header h2 {
        font-size: 1.25rem;
    }

    .panel-header p {
        font-size: 0.85rem;
    }

    .control-section {
        padding: 1.25rem;
    }

    .panel-toggle {
        flex-direction: row;
    }

    .panel-toggle button {
        font-size: 0.85rem;
    }

    .text-input {
        font-size: 0.9rem;
        padding: 0.75rem;
    }

    .color-row {
        gap: 1rem;
    }

    .preview-container {
        padding: 2rem 1rem;
    }

    .badge-svg {
        max-width: 100%;
        height: auto;
    }

    .action-buttons {
        flex-direction: column;
        gap: 0.75rem;
    }

    .btn {
        font-size: 0.85rem;
        padding: 0.75rem 1.25rem;
        width: 100%;
    }

    .footer-text {
        font-size: 0.75rem;
    }

    .account-callout {
        padding: 1.25rem;
    }

    .callout-content h4 {
        font-size: 0.875rem;
    }

    .callout-content p {
        font-size: 0.8125rem;
    }

    .callout-btn {
        font-size: 0.75rem;
        padding: 0.5rem 1.25rem;
    }
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #fff;
  width: min(560px, 92vw);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: transparent;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
}

.modal-body {
  padding: 1rem 1.25rem;
}

.modal-description {
  margin: 0 0 0.75rem 0;
  color: #6b7280;
}

.ai-prompt-input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem 0.875rem;
  font-size: 0.95rem;
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem 1rem;
  border-top: 1px solid #e5e7eb;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Icon Controls */
.icon-controls {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
}

.icon-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
}

.icon-header label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
}

.toggle-icon-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #6b7280;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.toggle-icon-btn:hover {
    background: #f9fafb;
    border-color: #9ca3af;
}

.toggle-icon-btn.active {
    background: #31C4F3;
    color: white;
    border-color: #31C4F3;
}

.icon-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.75rem;
}

.size-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.size-group label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
}

.slider-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.slider-group label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
}

.slider-value {
    font-size: 0.75rem;
    color: #666;
    font-weight: 500;
    text-align: right;
}

.size-slider {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #e5e5e5;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
}

.size-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #000;
    cursor: pointer;
}

.size-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #000;
    cursor: pointer;
    border: none;
}

.value {
    font-size: 0.75rem;
    color: #666;
    font-weight: 500;
}

.position-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.position-group label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
}

.position-select {
    padding: 0.5rem;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-size: 0.85rem;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
}

.position-select:focus {
    outline: none;
    border-color: #000;
}

/* Support CTA */
.generator-support-cta {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem;
}

@media (max-width: 768px) {
    .generator-support-cta {
        padding: 2rem 1rem;
    }
}

</style>
