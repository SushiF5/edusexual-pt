---
name: Serene Clarity
colors:
  surface: '#f5fafa'
  surface-dim: '#d6dbdb'
  surface-bright: '#f5fafa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff5f5'
  surface-container: '#eaefef'
  surface-container-high: '#e4e9e9'
  surface-container-highest: '#dee3e3'
  on-surface: '#171d1d'
  on-surface-variant: '#3e4949'
  inverse-surface: '#2c3132'
  inverse-on-surface: '#edf2f2'
  outline: '#6e797a'
  outline-variant: '#bdc9c9'
  surface-tint: '#00696e'
  primary: '#006065'
  on-primary: '#ffffff'
  primary-container: '#0d7a80'
  on-primary-container: '#c7fbff'
  inverse-primary: '#7dd4db'
  secondary: '#126c40'
  on-secondary: '#ffffff'
  secondary-container: '#a1f5bc'
  on-secondary-container: '#1c7245'
  tertiary: '#396018'
  on-tertiary: '#ffffff'
  tertiary-container: '#50792e'
  on-tertiary-container: '#d4ffad'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#99f1f7'
  primary-fixed-dim: '#7dd4db'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#a1f5bc'
  secondary-fixed-dim: '#85d8a2'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522d'
  tertiary-fixed: '#c1f197'
  tertiary-fixed-dim: '#a6d47e'
  on-tertiary-fixed: '#0c2000'
  on-tertiary-fixed-variant: '#2a5007'
  background: '#f5fafa'
  on-background: '#171d1d'
  surface-variant: '#dee3e3'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The brand personality of this design system is rooted in empathy, safety, and modern accessibility. It is designed to transform a potentially sensitive or clinical subject into a welcoming, educational journey. The target audience spans diverse demographics seeking reliable health information, requiring a UI that feels both authoritative (professional) and approachable (friendly).

The chosen style is **Modern Softness**, a blend of Corporate Modernity and subtle Tonal Layering. It moves away from the sterile, high-contrast "clinical white" aesthetic in favor of a "tinted-minimalism" approach. This reduces cognitive load and eye strain, creating a calming environment that encourages exploration and learning without the anxiety often associated with medical portals. Visuals are inclusive, utilizing soft-focus imagery and organic shapes to reinforce the "natural" and "safe" aspects of the brand.

## Colors

This design system avoids pure #FFFFFF white to prevent a harsh, institutional feel. Instead, it utilizes a "Soft Tint" strategy where the background and surfaces are infused with the primary hue.

- **Primary (Teal):** Used for core actions, branding, and authoritative text. It represents trust and professional health standards.
- **Secondary (Mint/Natural Green):** Used for success states, progress indicators, and supportive visual elements to convey growth and wellness.
- **Neutral (Tinted Frost):** The base background color (`#F4F9F9`). It provides a fresh, breathable canvas that feels warmer and more inviting than standard gray or white.
- **Accent (Sky Blue):** Used for informational highlights and interactive elements that require distinction without the "alert" weight of the primary teal.

## Typography

The typography leverages **Plus Jakarta Sans** for its geometric yet friendly proportions. The typeface’s open apertures and modern curves ensure high legibility across all age groups.

- **Headlines:** Use tighter letter-spacing and bold weights to establish a confident, professional hierarchy.
- **Body Text:** Set with generous line height (1.6) to improve readability for long-form educational content. 
- **Inclusive Sizing:** The base body size is set to 16px/18px to ensure accessibility for users with varying visual needs.
- **Color Application:** Avoid pure black (#000000); use a deep Slate-Teal for text to maintain the "Fresh Blue" tonal harmony.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop and a **Fluid Grid** for mobile devices to maintain a consistent reading experience.

- **Grid System:** A 12-column grid with a maximum container width of 1200px. Large 24px gutters provide significant breathing room between content blocks.
- **Spacing Rhythm:** Based on an 8px scale. Use `lg` (48px) and `xl` (80px) vertical spacing to separate major educational sections, preventing the layout from feeling cluttered or overwhelming.
- **Safe Margins:** Content should never hit the edge of the viewport; a minimum margin of 24px is required on mobile to maintain the "safe" and "airy" feeling.

## Elevation & Depth

To maintain the soft and inclusive aesthetic, the design system utilizes **Tonal Layers** and **Ambient Shadows** rather than high-contrast borders.

- **Surface Tiers:** Use subtle shifts in background color to define depth. For example, a card might be pure white (`#FFFFFF`) sitting on the tinted background (`#F4F9F9`).
- **Shadow Profile:** Shadows should be extremely diffused, using a low-opacity teal-tinted hex (e.g., `rgba(13, 122, 128, 0.08)`) instead of gray. This keeps the elevation feeling "light" and "natural."
- **Focus States:** Use a soft, 4px outer glow in the Secondary Mint color to indicate focus, avoiding the standard high-contrast blue ring.

## Shapes

The shape language is defined by **Soft Corners**, moving away from "sharp/clinical" or "overly bubbly/juvenile."

- **Component Radius:** Standard buttons and input fields use an 8px (`rounded-md`) radius.
- **Container Radius:** Larger cards and educational modules use a 16px (`rounded-lg`) to 24px (`rounded-xl`) radius to create a protective, "enveloping" feel.
- **Iconography:** Icons should feature rounded caps and corners to match the typography and UI elements.

## Components

- **Buttons:** Primary buttons use a solid Teal fill with white text. Secondary buttons use a Sky Blue ghost style (transparent fill, 1px border). Hover states should involve a subtle scale-up (1.02x) rather than a dramatic color shift.
- **Chips:** Used for categorizing topics (e.g., "Wellness," "Prevention"). These should have a light Mint background and dark Teal text, utilizing the pill-shape style for high distinction.
- **Input Fields:** Soft-tinted backgrounds (slightly darker than the page background) with an 8px radius. Use the Secondary Mint for the active border color to signify a "safe" interaction.
- **Cards:** The "Information Card" is the core component. It features a 16px radius, a very soft ambient shadow, and a 1px border in a slightly darker tint of the background color to provide definition without harshness.
- **Progress Steppers:** For multi-step educational modules, use rounded, thick bars in Secondary Green to show completion, reinforcing a sense of achievement and growth.
- **Call-to-Action (CTA) Banners:** Use a gentle gradient from Sky Blue to Mint to draw attention to "Get Help" or "Talk to an Expert" actions.