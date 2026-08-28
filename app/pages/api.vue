<template>
  <div class="page">
    <NavBar v-if="!isMobile" />
    <MobileNavBar v-if="isMobile" />

    <div class="page-container">
      <div class="page-header">
        <h1>Public API</h1>
        <p class="subtitle">Generate badges programmatically with a simple GET request</p>
      </div>

      <div class="page-content">
        <!-- Overview -->
        <section id="overview" class="section">
          <h2>Overview</h2>
          <p>The For the Badge API allows you to generate custom SVG badges programmatically. Simply make a GET request to our endpoint with your desired configuration as query parameters, and we'll return a ready-to-use SVG badge.</p>
          <p>This is perfect for:</p>
          <ul>
            <li>Dynamically generating badges in your CI/CD pipelines</li>
            <li>Creating badges on-the-fly in your applications</li>
            <li>Building badge galleries with custom styling</li>
            <li>Integrating badges into static site generators</li>
          </ul>
        </section>

        <!-- Quick Start -->
        <section id="quickstart" class="section">
          <h2>Quick Start</h2>
          <p>Here's a simple example to get started:</p>
          <div class="code-block">
            <pre><code>https://forthebadge.com/api/badges/generate?primaryLabel=BUILT&amp;secondaryLabel=WITH&amp;primaryBGColor=%2331C4F3&amp;secondaryBGColor=%23389AD5</code></pre>
          </div>
          <p>Visit this URL in your browser to see a badge with "BUILT" and "WITH" labels.</p>
          <p>Use it in Markdown:</p>
          <div class="code-block">
            <pre><code>![Badge](https://forthebadge.com/api/badges/generate?primaryLabel=BUILT&amp;secondaryLabel=WITH)</code></pre>
          </div>
        </section>

        <!-- Endpoint -->
        <section id="endpoint" class="section">
          <h2>Endpoint</h2>
          <div class="endpoint-box">
            <span class="method-get">GET</span>
            <code class="endpoint-path">/api/badges/generate</code>
          </div>
          <p><strong>Base URL:</strong> <code>https://forthebadge.com</code></p>
          <p><strong>Response Type:</strong> <code>image/svg+xml</code></p>
          <p><strong>Cache:</strong> Responses are cached for 1 year with immutable flag for optimal performance.</p>
        </section>

        <!-- Parameters -->
        <section id="parameters" class="section">
          <h2>Query Parameters</h2>

          <h3>Required Parameters</h3>
          <div class="params-table-wrapper">
          <table class="params-table">
            <thead>
              <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>primaryLabel</code></td><td>string</td><td>Text for the first (primary) panel. URL encode special characters.</td></tr>
              <tr><td><code>secondaryLabel</code></td><td>string</td><td>Text for the second (secondary) panel. URL encode special characters.</td></tr>
              <tr><td><code>tertiaryLabel</code></td><td>string</td><td>Text for the third panel. <strong>Required only when</strong> <code>panels=3</code></td></tr>
            </tbody>
          </table>
          </div>

          <h3>Optional Parameters</h3>
          <div class="params-table-wrapper">
          <table class="params-table">
            <thead>
              <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>panels</code></td><td>number</td><td>2</td><td>Number of panels: 2 or 3</td></tr>
              <tr><td><code>primaryBGColor</code></td><td>hex color</td><td>#31C4F3</td><td>Primary panel background color</td></tr>
              <tr><td><code>primaryTextColor</code></td><td>hex color</td><td>#FFFFFF</td><td>Primary panel text color</td></tr>
              <tr><td><code>secondaryBGColor</code></td><td>hex color</td><td>#389AD5</td><td>Secondary panel background color</td></tr>
              <tr><td><code>secondaryTextColor</code></td><td>hex color</td><td>#FFFFFF</td><td>Secondary panel text color</td></tr>
              <tr><td><code>tertiaryBGColor</code></td><td>hex color</td><td>#2674A4</td><td>Tertiary panel background color (3-panel badges only)</td></tr>
              <tr><td><code>tertiaryTextColor</code></td><td>hex color</td><td>#FFFFFF</td><td>Tertiary panel text color (3-panel badges only)</td></tr>
              <tr><td><code>primaryFontSize</code></td><td>number</td><td>12</td><td>Font size for primary text (pixels)</td></tr>
              <tr><td><code>secondaryFontSize</code></td><td>number</td><td>12</td><td>Font size for secondary text (pixels)</td></tr>
              <tr><td><code>tertiaryFontSize</code></td><td>number</td><td>12</td><td>Font size for tertiary text (pixels)</td></tr>
              <tr><td><code>primaryFontWeight</code></td><td>number</td><td>600</td><td>Font weight for primary text (100-900)</td></tr>
              <tr><td><code>secondaryFontWeight</code></td><td>number</td><td>900</td><td>Font weight for secondary text (100-900)</td></tr>
              <tr><td><code>tertiaryFontWeight</code></td><td>number</td><td>500</td><td>Font weight for tertiary text (100-900)</td></tr>
              <tr><td><code>primaryLetterSpacing</code></td><td>number</td><td>2</td><td>Letter spacing for primary text</td></tr>
              <tr><td><code>secondaryLetterSpacing</code></td><td>number</td><td>2</td><td>Letter spacing for secondary text</td></tr>
              <tr><td><code>tertiaryLetterSpacing</code></td><td>number</td><td>2</td><td>Letter spacing for tertiary text</td></tr>
              <tr><td><code>primaryFontFamily</code></td><td>string</td><td>Roboto</td><td>Font family for primary text</td></tr>
              <tr><td><code>secondaryFontFamily</code></td><td>string</td><td>Montserrat</td><td>Font family for secondary text</td></tr>
              <tr><td><code>tertiaryFontFamily</code></td><td>string</td><td>Roboto</td><td>Font family for tertiary text</td></tr>
              <tr><td><code>primaryTextTransform</code></td><td>string</td><td>uppercase</td><td>Text transform: uppercase, lowercase, capitalize, none</td></tr>
              <tr><td><code>secondaryTextTransform</code></td><td>string</td><td>uppercase</td><td>Text transform: uppercase, lowercase, capitalize, none</td></tr>
              <tr><td><code>tertiaryTextTransform</code></td><td>string</td><td>uppercase</td><td>Text transform: uppercase, lowercase, capitalize, none</td></tr>
              <tr><td><code>scale</code></td><td>number</td><td>1</td><td>Badge size multiplier (0.5-2.0)</td></tr>
              <tr><td><code>borderRadius</code></td><td>number</td><td>0</td><td>Corner radius in pixels (0-10)</td></tr>
              <tr><td><code>primaryTextDecoration</code></td><td>string</td><td>none</td><td>Text decoration: none, underline, line-through</td></tr>
              <tr><td><code>primaryFontStyle</code></td><td>string</td><td>normal</td><td>Font style: normal, italic</td></tr>
              <tr><td><code>secondaryTextDecoration</code></td><td>string</td><td>none</td><td>Text decoration: none, underline, line-through</td></tr>
              <tr><td><code>secondaryFontStyle</code></td><td>string</td><td>normal</td><td>Font style: normal, italic</td></tr>
              <tr><td><code>tertiaryTextDecoration</code></td><td>string</td><td>none</td><td>Text decoration (3-panel badges only): none, underline, line-through</td></tr>
              <tr><td><code>tertiaryFontStyle</code></td><td>string</td><td>normal</td><td>Font style (3-panel badges only): normal, italic</td></tr>
            </tbody>
          </table>
          </div>

          <h3>Advanced Text Styling</h3>
          <p>Apply advanced styling effects to text in each panel. These parameters allow you to add text shadows, rotation, opacity, and font variants.</p>
          <div class="params-table-wrapper">
          <table class="params-table">
            <thead>
              <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>primaryTextShadowColor</code></td><td>hex color</td><td>#000000</td><td>Shadow color for primary panel text</td></tr>
              <tr><td><code>primaryTextShadowOffsetX</code></td><td>number</td><td>0</td><td>Horizontal shadow offset in pixels (-10 to 10)</td></tr>
              <tr><td><code>primaryTextShadowOffsetY</code></td><td>number</td><td>0</td><td>Vertical shadow offset in pixels (-10 to 10)</td></tr>
              <tr><td><code>primaryTextShadowBlur</code></td><td>number</td><td>0</td><td>Shadow blur radius in pixels (0 to 10)</td></tr>
              <tr><td><code>primaryTextRotation</code></td><td>number</td><td>0</td><td>Text rotation angle in degrees (-15 to 15)</td></tr>
              <tr><td><code>primaryTextOpacity</code></td><td>number</td><td>100</td><td>Text opacity percentage (0 to 100)</td></tr>
              <tr><td><code>primaryFontVariant</code></td><td>string</td><td>normal</td><td>Font variant: normal, small-caps</td></tr>
              <tr><td><code>secondaryTextShadowColor</code></td><td>hex color</td><td>#000000</td><td>Shadow color for secondary panel text</td></tr>
              <tr><td><code>secondaryTextShadowOffsetX</code></td><td>number</td><td>0</td><td>Horizontal shadow offset in pixels (-10 to 10)</td></tr>
              <tr><td><code>secondaryTextShadowOffsetY</code></td><td>number</td><td>0</td><td>Vertical shadow offset in pixels (-10 to 10)</td></tr>
              <tr><td><code>secondaryTextShadowBlur</code></td><td>number</td><td>0</td><td>Shadow blur radius in pixels (0 to 10)</td></tr>
              <tr><td><code>secondaryTextRotation</code></td><td>number</td><td>0</td><td>Text rotation angle in degrees (-15 to 15)</td></tr>
              <tr><td><code>secondaryTextOpacity</code></td><td>number</td><td>100</td><td>Text opacity percentage (0 to 100)</td></tr>
              <tr><td><code>secondaryFontVariant</code></td><td>string</td><td>normal</td><td>Font variant: normal, small-caps</td></tr>
              <tr><td><code>tertiaryTextShadowColor</code></td><td>hex color</td><td>#000000</td><td>Shadow color for tertiary panel text (3-panel badges only)</td></tr>
              <tr><td><code>tertiaryTextShadowOffsetX</code></td><td>number</td><td>0</td><td>Horizontal shadow offset in pixels (-10 to 10)</td></tr>
              <tr><td><code>tertiaryTextShadowOffsetY</code></td><td>number</td><td>0</td><td>Vertical shadow offset in pixels (-10 to 10)</td></tr>
              <tr><td><code>tertiaryTextShadowBlur</code></td><td>number</td><td>0</td><td>Shadow blur radius in pixels (0 to 10)</td></tr>
              <tr><td><code>tertiaryTextRotation</code></td><td>number</td><td>0</td><td>Text rotation angle in degrees (-15 to 15)</td></tr>
              <tr><td><code>tertiaryTextOpacity</code></td><td>number</td><td>100</td><td>Text opacity percentage (0 to 100)</td></tr>
              <tr><td><code>tertiaryFontVariant</code></td><td>string</td><td>normal</td><td>Font variant: normal, small-caps</td></tr>
            </tbody>
          </table>
          </div>

          <h3>Icon Parameters</h3>
          <p>Add icons to any panel using Simple Icons. Icons are sourced from the <a href="https://simpleicons.org" target="_blank" rel="noopener">Simple Icons</a> library.</p>
          <div class="params-table-wrapper">
          <table class="params-table">
            <thead>
              <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>primaryIcon</code></td><td>string</td><td>-</td><td>Icon slug for primary panel (e.g., "react", "github", "typescript")</td></tr>
              <tr><td><code>primaryIconColor</code></td><td>hex color</td><td>primaryTextColor</td><td>Color for primary icon</td></tr>
              <tr><td><code>primaryIconSize</code></td><td>number</td><td>16</td><td>Size of primary icon in pixels (12-24 recommended)</td></tr>
              <tr><td><code>primaryIconPosition</code></td><td>string</td><td>left</td><td>Icon position: "left" or "right" of text</td></tr>
              <tr><td><code>secondaryIcon</code></td><td>string</td><td>-</td><td>Icon slug for secondary panel</td></tr>
              <tr><td><code>secondaryIconColor</code></td><td>hex color</td><td>secondaryTextColor</td><td>Color for secondary icon</td></tr>
              <tr><td><code>secondaryIconSize</code></td><td>number</td><td>16</td><td>Size of secondary icon in pixels</td></tr>
              <tr><td><code>secondaryIconPosition</code></td><td>string</td><td>left</td><td>Icon position: "left" or "right" of text</td></tr>
              <tr><td><code>tertiaryIcon</code></td><td>string</td><td>-</td><td>Icon slug for tertiary panel (3-panel badges only)</td></tr>
              <tr><td><code>tertiaryIconColor</code></td><td>hex color</td><td>tertiaryTextColor</td><td>Color for tertiary icon</td></tr>
              <tr><td><code>tertiaryIconSize</code></td><td>number</td><td>16</td><td>Size of tertiary icon in pixels</td></tr>
              <tr><td><code>tertiaryIconPosition</code></td><td>string</td><td>left</td><td>Icon position: "left" or "right" of text</td></tr>
            </tbody>
          </table>
          </div>
        </section>

        <!-- Response -->
        <section id="response" class="section">
          <h2>Response</h2>
          <p>The API returns an SVG image with the following characteristics:</p>
          <ul>
            <li><strong>Content-Type:</strong> <code>image/svg+xml; charset=utf-8</code></li>
            <li><strong>Format:</strong> Scalable Vector Graphics (SVG)</li>
            <li><strong>Dimensions:</strong> Dynamic width based on text content, fixed 35px height</li>
            <li><strong>Caching:</strong> <code>Cache-Control: public, max-age=31536000, immutable</code></li>
          </ul>
          <p>The SVG is fully rendered and can be used directly in web pages, markdown, or any context that supports SVG images.</p>
        </section>

        <!-- Examples -->
        <section id="examples" class="section">
          <h2>Examples</h2>

          <div class="example-block">
            <h3>Example 1: Simple 2-Panel Badge</h3>
            <p>Create a basic "BUILT WITH" badge:</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?primaryLabel=BUILT&amp;secondaryLabel=WITH</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.simple" alt="Simple badge example" /></div>
          </div>

          <div class="example-block">
            <h3>Example 2: Custom Colors</h3>
            <p>Generate with custom colors:</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?primaryLabel=MADE&amp;secondaryLabel=WITH&amp;primaryBGColor=%23FF6B6B&amp;primaryTextColor=%23FFFFFF&amp;secondaryBGColor=%234ECDC4&amp;secondaryTextColor=%23FFFFFF</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.colors" alt="Custom colors badge example" /></div>
          </div>

          <div class="example-block">
            <h3>Example 3: 3-Panel Badge</h3>
            <p>Create a 3-panel badge:</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?panels=3&amp;primaryLabel=BUILT&amp;secondaryLabel=WITH&amp;tertiaryLabel=LOVE&amp;primaryBGColor=%2331C4F3&amp;secondaryBGColor=%23389AD5&amp;tertiaryBGColor=%232674A4</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.threePanels" alt="3-panel badge example" /></div>
          </div>

          <div class="example-block">
            <h3>Example 4: Badge with Icon</h3>
            <p>Add an icon from Simple Icons (browse at <a href="https://simpleicons.org" target="_blank" rel="noopener">simpleicons.org</a>):</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?panels=2&amp;primaryLabel=Build&amp;secondaryLabel=with+nuxt&amp;primaryBGColor=%2331C4F3&amp;primaryTextColor=%23FFFFFF&amp;secondaryBGColor=%23389AD5&amp;secondaryTextColor=%23FFFFFF&amp;primaryFontSize=12&amp;primaryFontWeight=600&amp;primaryLetterSpacing=2&amp;primaryFontFamily=Roboto&amp;primaryTextTransform=uppercase&amp;secondaryFontSize=12&amp;secondaryFontWeight=900&amp;secondaryLetterSpacing=2&amp;secondaryFontFamily=Montserrat&amp;secondaryTextTransform=uppercase&amp;secondaryIcon=nuxt&amp;secondaryIconColor=%23FFFFFF&amp;secondaryIconSize=16&amp;secondaryIconPosition=right</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.withIcon" alt="Badge with Nuxt icon example" /></div>
          </div>

          <div class="example-block">
            <h3>Example 5: Text Shadow Effect</h3>
            <p>Add dramatic text shadows to make your badges stand out:</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?primaryLabel=POWERED&amp;secondaryLabel=BY+SHADOWS&amp;primaryBGColor=%23FF6B35&amp;secondaryBGColor=%23004E89&amp;primaryTextShadowColor=%23000000&amp;primaryTextShadowOffsetX=2&amp;primaryTextShadowOffsetY=2&amp;primaryTextShadowBlur=4&amp;secondaryTextShadowColor=%2300F5FF&amp;secondaryTextShadowOffsetX=0&amp;secondaryTextShadowOffsetY=0&amp;secondaryTextShadowBlur=8</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.textShadow" alt="Badge with text shadow example" /></div>
          </div>

          <div class="example-block">
            <h3>Example 6: Rotated Text</h3>
            <p>Apply subtle rotation for a dynamic look:</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?primaryLabel=SLIGHTLY&amp;secondaryLabel=TILTED&amp;primaryBGColor=%23FFD23F&amp;primaryTextColor=%23000000&amp;secondaryBGColor=%23EE4266&amp;primaryTextRotation=-5&amp;secondaryTextRotation=5</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.rotated" alt="Badge with rotated text example" /></div>
          </div>

          <div class="example-block">
            <h3>Example 7: Opacity &amp; Small Caps</h3>
            <p>Combine opacity and font variant for sophisticated styling:</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?primaryLabel=Elegant&amp;secondaryLabel=Design&amp;primaryBGColor=%232B2D42&amp;secondaryBGColor=%238D99AE&amp;primaryFontVariant=small-caps&amp;secondaryFontVariant=small-caps&amp;primaryTextOpacity=85&amp;secondaryTextOpacity=90&amp;primaryTextTransform=none&amp;secondaryTextTransform=none</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.opacity" alt="Badge with opacity and small caps example" /></div>
          </div>

          <div class="example-block">
            <h3>Example 8: 3-Panel Advanced Styling</h3>
            <p>Combine multiple advanced effects on a 3-panel badge:</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?panels=3&amp;primaryLabel=ULTRA&amp;secondaryLabel=STYLED&amp;tertiaryLabel=BADGE&amp;primaryBGColor=%23F72585&amp;secondaryBGColor=%237209B7&amp;tertiaryBGColor=%234361EE&amp;primaryTextShadowColor=%23000000&amp;primaryTextShadowOffsetX=1&amp;primaryTextShadowOffsetY=1&amp;primaryTextShadowBlur=2&amp;secondaryFontVariant=small-caps&amp;secondaryTextTransform=none&amp;tertiaryTextRotation=3&amp;tertiaryTextOpacity=95</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.advancedThreePanel" alt="3-panel badge with advanced styling" /></div>
          </div>

          <div class="example-block">
            <h3>Example 9: Glowing Effect</h3>
            <p>Create a glowing effect using blur without offset:</p>
            <div class="code-block"><pre><code>https://forthebadge.com/api/badges/generate?primaryLabel=NEON&amp;secondaryLabel=GLOW&amp;primaryBGColor=%23000000&amp;secondaryBGColor=%231A1A1A&amp;primaryTextColor=%2300FFF5&amp;secondaryTextColor=%23FF00FF&amp;primaryTextShadowColor=%2300FFF5&amp;primaryTextShadowOffsetX=0&amp;primaryTextShadowOffsetY=0&amp;primaryTextShadowBlur=10&amp;secondaryTextShadowColor=%23FF00FF&amp;secondaryTextShadowOffsetX=0&amp;secondaryTextShadowOffsetY=0&amp;secondaryTextShadowBlur=10</code></pre></div>
            <div class="badge-preview"><img :src="exampleBadges.glow" alt="Badge with glowing text effect" /></div>
          </div>

          <div class="example-block">
            <h3>Example 10: Markdown Usage</h3>
            <p>Use any badge in your README with markdown:</p>
            <div class="code-block"><pre><code>[![Badge](https://forthebadge.com/api/badges/generate?primaryLabel=BUILT&amp;secondaryLabel=AWESOME)](https://yourproject.com)</code></pre></div>
          </div>

          <div class="example-block">
            <h3>Example 11: HTML Usage</h3>
            <p>Embed badges in HTML:</p>
            <div class="code-block"><pre><code>&lt;img src="https://forthebadge.com/api/badges/generate?primaryLabel=BUILT&amp;secondaryLabel=AMAZING" alt="Badge" /&gt;</code></pre></div>
          </div>
        </section>

        <!-- Styling -->
        <section id="styling" class="section">
          <h2>Styling Options</h2>
          <p>The API provides comprehensive styling options to match your brand.</p>

          <h3>Colors</h3>
          <p>Use any valid hex color code (with or without #). Remember to URL-encode the # symbol as %23:</p>
          <ul>
            <li><code>%23FF0000</code> — Red</li>
            <li><code>%2300FF00</code> — Green</li>
            <li><code>%230000FF</code> — Blue</li>
          </ul>

          <h3>Text Transform</h3>
          <p>Control how text is displayed:</p>
          <ul>
            <li><code>uppercase</code> — Convert to UPPERCASE (default)</li>
            <li><code>lowercase</code> — Convert to lowercase</li>
            <li><code>capitalize</code> — Capitalize First Letter</li>
            <li><code>none</code> — Keep original casing</li>
          </ul>

          <h3>Font Families</h3>
          <p>Supported font families include common web-safe fonts. The defaults are:</p>
          <ul>
            <li>Primary: Roboto</li>
            <li>Secondary: Montserrat</li>
            <li>Tertiary: Roboto</li>
          </ul>

          <h3>Font Sizes and Weights</h3>
          <p>Customize individual panel styling:</p>
          <ul>
            <li>Font sizes can be any positive number (default: 12px)</li>
            <li>Font weights range from 100 (thin) to 900 (black)</li>
            <li>Letter spacing controls the space between characters</li>
          </ul>

          <h3>Icons</h3>
          <p>Add icons to any panel using Simple Icons:</p>
          <ul>
            <li>Browse available icons at <a href="https://simpleicons.org" target="_blank" rel="noopener">simpleicons.org</a></li>
            <li>Use the icon slug (e.g., "react", "vue", "python") as the icon parameter</li>
            <li>Icons can be positioned left or right of the text</li>
            <li>Icon size can be adjusted from 12-24 pixels (16px default)</li>
            <li>Icon colors default to the panel text color but can be customized</li>
          </ul>

          <h3>Advanced Text Effects</h3>
          <p>Take your badges to the next level with advanced text styling:</p>
          <p><strong>Text Shadows</strong> — Choose any hex color, move the shadow horizontally and vertically (-10 to 10 pixels), and control shadow softness (0-10 pixels). Use no offset with high blur to create glowing effects.</p>
          <p><strong>Text Rotation</strong> — Rotate text from -15° to +15°. Subtle rotations (±3-5°) work best for readability. Different panels can have different rotations.</p>
          <p><strong>Text Opacity</strong> — Control text transparency from 0 (fully transparent) to 100 (fully opaque). Create watermark effects with lower opacity (60-80%).</p>
          <p><strong>Font Variant</strong> — Use <code>normal</code> (default) or <code>small-caps</code> for elegant small capital letters. Works best with <code>textTransform=none</code> or <code>capitalize</code>.</p>
        </section>

        <!-- Error Handling -->
        <section id="errors" class="section">
          <h2>Error Handling</h2>
          <p>The API returns appropriate HTTP status codes and error messages:</p>
          <div class="params-table-wrapper">
          <table class="params-table">
            <thead>
              <tr><th>Status Code</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>200 OK</code></td><td>Badge generated successfully</td></tr>
              <tr><td><code>400 Bad Request</code></td><td>Missing or invalid parameters (e.g., missing required labels, invalid panel count)</td></tr>
              <tr><td><code>500 Server Error</code></td><td>Internal server error while generating badge</td></tr>
            </tbody>
          </table>
          </div>
        </section>

        <!-- CTA -->
        <section class="section cta-section">
          <h2>Ready to build?</h2>
          <p>Try the visual generator to create badges interactively, then copy the API URL.</p>
          <NuxtLink to="/generator" class="cta-btn">Try the Generator</NuxtLink>
        </section>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { isMobileDevice } from '~/utils/deviceDetection';

const isMobile = computed(() => import.meta.client ? isMobileDevice() : false);

const exampleBadges = {
  simple: 'https://forthebadge.com/api/badges/generate?primaryLabel=BUILT&secondaryLabel=WITH',
  colors: 'https://forthebadge.com/api/badges/generate?primaryLabel=MADE&secondaryLabel=WITH&primaryBGColor=%23FF6B6B&primaryTextColor=%23FFFFFF&secondaryBGColor=%234ECDC4&secondaryTextColor=%23FFFFFF',
  threePanels: 'https://forthebadge.com/api/badges/generate?panels=3&primaryLabel=BUILT&secondaryLabel=WITH&tertiaryLabel=LOVE&primaryBGColor=%2331C4F3&secondaryBGColor=%23389AD5&tertiaryBGColor=%232674A4',
  withIcon: 'https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=Build&secondaryLabel=with+nuxt&primaryBGColor=%2331C4F3&primaryTextColor=%23FFFFFF&secondaryBGColor=%23389AD5&secondaryTextColor=%23FFFFFF&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=nuxt&secondaryIconColor=%23FFFFFF&secondaryIconSize=16&secondaryIconPosition=right',
  textShadow: 'https://forthebadge.com/api/badges/generate?primaryLabel=POWERED&secondaryLabel=BY+SHADOWS&primaryBGColor=%23FF6B35&secondaryBGColor=%23004E89&primaryTextShadowColor=%23000000&primaryTextShadowOffsetX=2&primaryTextShadowOffsetY=2&primaryTextShadowBlur=4&secondaryTextShadowColor=%2300F5FF&secondaryTextShadowOffsetX=0&secondaryTextShadowOffsetY=0&secondaryTextShadowBlur=8',
  rotated: 'https://forthebadge.com/api/badges/generate?primaryLabel=SLIGHTLY&secondaryLabel=TILTED&primaryBGColor=%23FFD23F&primaryTextColor=%23000000&secondaryBGColor=%23EE4266&primaryTextRotation=-5&secondaryTextRotation=5',
  opacity: 'https://forthebadge.com/api/badges/generate?primaryLabel=Elegant&secondaryLabel=Design&primaryBGColor=%232B2D42&secondaryBGColor=%238D99AE&primaryFontVariant=small-caps&secondaryFontVariant=small-caps&primaryTextOpacity=85&secondaryTextOpacity=90&primaryTextTransform=none&secondaryTextTransform=none',
  advancedThreePanel: 'https://forthebadge.com/api/badges/generate?panels=3&primaryLabel=ULTRA&secondaryLabel=STYLED&tertiaryLabel=BADGE&primaryBGColor=%23F72585&secondaryBGColor=%237209B7&tertiaryBGColor=%234361EE&primaryTextShadowColor=%23000000&primaryTextShadowOffsetX=1&primaryTextShadowOffsetY=1&primaryTextShadowBlur=2&secondaryFontVariant=small-caps&secondaryTextTransform=none&tertiaryTextRotation=3&tertiaryTextOpacity=95',
  glow: 'https://forthebadge.com/api/badges/generate?primaryLabel=NEON&secondaryLabel=GLOW&primaryBGColor=%23000000&secondaryBGColor=%231A1A1A&primaryTextColor=%2300FFF5&secondaryTextColor=%23FF00FF&primaryTextShadowColor=%2300FFF5&primaryTextShadowOffsetX=0&primaryTextShadowOffsetY=0&primaryTextShadowBlur=10&secondaryTextShadowColor=%23FF00FF&secondaryTextShadowOffsetX=0&secondaryTextShadowOffsetY=0&secondaryTextShadowBlur=10',
};

const handleScroll = () => {};

onMounted(() => { window.addEventListener('scroll', handleScroll); });
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); });

definePageMeta({ layout: false });
</script>

<style scoped>
.page { min-height: 100vh; background: #fff; display: flex; flex-direction: column; }
.page-container { flex: 1; max-width: 1100px; margin: 0 auto; padding: 6rem 2rem 4rem; width: 100%; box-sizing: border-box; }
.page-header { margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 2px solid #000; }
.page-header h1 { font-size: 2.5rem; font-weight: 800; color: #000; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
.subtitle { font-size: 1rem; color: #666; margin: 0; }
.page-content { display: flex; flex-direction: column; gap: 2rem; }
.section { padding-bottom: 2rem; border-bottom: 1px solid #e8e8e8; }
.section:last-of-type { border-bottom: none; }
.section h2 { font-size: 1.125rem; font-weight: 700; color: #000; margin: 0 0 0.875rem; letter-spacing: -0.01em; }
.section h3 { font-size: 1rem; font-weight: 700; color: #000; margin: 1.5rem 0 0.5rem; }
.section p, .section li { font-size: 0.9375rem; line-height: 1.7; color: #444; }
.section ul { margin: 0 0 0.75rem; padding-left: 1.5rem; }
.section a { color: #000; font-weight: 600; text-underline-offset: 2px; }

code {
  background: #f5f5f5;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  color: #d63384;
}

.code-block {
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 0.875rem 1rem;
  overflow-x: auto;
  overflow: hidden;
  margin: 0.75rem 0;
}

.code-block pre { margin: 0; font-family: 'Monaco', 'Courier New', monospace; font-size: 0.8125rem; line-height: 1.5; color: #333; white-space: pre-wrap; word-break: break-all; }
.code-block code { background: none; padding: 0; color: #333; }

.endpoint-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 0.875rem 1rem;
  margin-bottom: 0.75rem;
}

.method-get {
  background: #000;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: 3px;
  letter-spacing: 0.05em;
  font-family: 'Monaco', 'Courier New', monospace;
}

.endpoint-path {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  background: none;
  padding: 0;
}

.params-table-wrapper {
  border-radius: 6px;
  overflow: hidden;
  margin: 0.75rem 0 1.5rem;
}

.params-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  table-layout: auto;
}

.params-table thead { background: #000; }
.params-table thead th { color: #fff; padding: 0.625rem 0.75rem; text-align: left; font-weight: 600; font-size: 0.8125rem; }
.params-table tbody tr:nth-child(even) { background: #f9f9f9; }
.params-table tbody tr:nth-child(odd) { background: #fff; }
.params-table td { padding: 0.625rem 0.75rem; color: #444; border-bottom: 1px solid #e8e8e8; word-break: break-word; }
.params-table td code { font-size: 0.8125rem; }

.example-block {
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
  padding: 1.25rem;
  margin: 0.75rem 0;
}

.example-block h3 { margin-top: 0; }

.badge-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 1.5rem;
  margin-top: 0.75rem;
  min-height: 70px;
}

.badge-preview img { max-width: 100%; height: auto; }

.cta-section { background: #000; border-radius: 8px; padding: 2.5rem 2rem; text-align: center; border-bottom: none; color: #fff; }
.cta-section h2 { color: #fff; }
.cta-section p { color: rgba(255,255,255,0.65); }
.cta-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: #fff;
  color: #000;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .page-container { padding: 5rem 1.25rem 3rem; }
  .page-header h1 { font-size: 2rem; }
  .params-table { font-size: 0.8125rem; }
  .params-table th, .params-table td { padding: 0.5rem; }
  .code-block pre { font-size: 0.75rem; }
}
</style>
