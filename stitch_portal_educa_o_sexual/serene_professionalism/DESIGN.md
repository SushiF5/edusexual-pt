---
name: Serene Professionalism
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#404943'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#707973'
  outline-variant: '#bfc9c1'
  surface-tint: '#2c694e'
  primary: '#0f5238'
  on-primary: '#ffffff'
  primary-container: '#2d6a4f'
  on-primary-container: '#a8e7c5'
  inverse-primary: '#95d4b3'
  secondary: '#005fad'
  on-secondary: '#ffffff'
  secondary-container: '#58a3fe'
  on-secondary-container: '#003869'
  tertiary: '#364d3c'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d6553'
  on-tertiary-container: '#c6e1ca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f0ce'
  primary-fixed-dim: '#95d4b3'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#0e5138'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004884'
  tertiary-fixed: '#cee9d3'
  tertiary-fixed-dim: '#b3cdb7'
  on-tertiary-fixed: '#092012'
  on-tertiary-fixed-variant: '#354c3b'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built on the principles of **Modern Minimalism** with a focus on high-clarity and organic tranquility. It aims to evoke a sense of calm reliability and environmental consciousness, bridging the gap between clinical efficiency and natural warmth. 

The aesthetic is characterized by expansive white space, subtle color transitions, and a lack of aggressive ornamentation. By prioritizing visual "breathability," the interface ensures that users feel focused rather than overwhelmed. The style avoids heavy gradients or complex textures to maintain performance benchmarks and ensure fast rendering across all device types.

## Colors

The color palette is derived from natural landscapes—deep forest greens for authority and sky blues for interaction. 

- **Primary (#2D6A4F):** A deep, natural green used for brand presence, primary actions, and success states. It provides high contrast against light backgrounds for WCAG AA compliance.
- **Secondary (#4895EF):** A soft, energetic blue used for secondary interactions, links, and informational callouts.
- **Tertiary (#D8F3DC):** A pale mint used for large background surfaces, container fills, and highlighting sections without adding visual weight.
- **Neutral (#F8FAFC):** A cool-toned slate white that prevents the interface from feeling "stark," providing a soft canvas for the more vibrant greens and blues.

Functional colors for error states should use a desaturated terra-cotta to remain harmonious with the organic palette.

## Typography

This design system utilizes **Plus Jakarta Sans** exclusively to maintain a cohesive, modern, and friendly tone. The typeface's wide apertures and geometric foundations ensure excellent legibility at small sizes, crucial for accessibility.

- **Headlines:** Use tighter letter-spacing and heavier weights to create a strong visual hierarchy.
- **Body Text:** Standard weight (400) with generous line-heights (1.5x) to facilitate comfortable long-form reading.
- **Labels:** Slightly increased tracking and semi-bold weights are used to distinguish functional UI elements from editorial content.

## Layout & Spacing

The layout utilizes a **Fixed-Fluid Hybrid Grid**. Content is constrained to a maximum width of 1280px for desktop viewing to prevent line lengths from becoming unreadable, while inner containers utilize a 12-column fluid system.

The spacing rhythm is based on a **4px baseline**, encouraging a "loose" and "airy" feel. Layouts should prioritize negative space; when in doubt, increase padding between distinct logical sections to ensure the UI does not feel cramped. Margin and padding values should primarily pull from the `lg` (24px) and `xl` (48px) tokens to maintain the design system's signature openness.

## Elevation & Depth

Depth is communicated through **Tonal Layers** and **Ambient Shadows** rather than harsh outlines. Surfaces use subtle shifts in background color (from white to the neutral slate) to define hierarchy.

- **Level 0 (Base):** Neutral white background.
- **Level 1 (Cards/Floating Elements):** Extremely soft, diffused shadows with a slight blue tint (`rgba(72, 149, 239, 0.08)`) and a 12px-20px blur radius.
- **Level 2 (Modals/Overlays):** A more pronounced shadow to indicate focus, paired with a subtle backdrop blur (glassmorphism) on the underlying layer to maintain context without visual noise.

Avoid using black shadows; always tint shadows with the secondary blue or primary green to maintain the "fresh" palette.

## Shapes

The shape language is defined by **Soft Roundedness**. This approach removes the "sharpness" of traditional corporate UI, making the product feel more approachable and modern.

- **Small Components (Buttons, Inputs):** 0.5rem (8px) radius.
- **Medium Components (Cards, Modals):** 1rem (16px) radius.
- **Large Components (Sections, Hero Containers):** 1.5rem (24px) radius.

Interactive elements should transition their corner radius slightly on active states to provide tactile feedback without requiring complex animations.

## Components

- **Buttons:** Primary buttons use the Forest Green fill with white text. Secondary buttons use a transparent background with a Sky Blue border. All buttons feature a 0.5rem corner radius and internal horizontal padding of 24px.
- **Inputs:** Fields use a 1px border in a muted light-blue grey. Upon focus, the border transitions to Sky Blue with a soft 4px outer glow of the same color.
- **Chips:** Used for filtering and categorization. They feature a 2rem (pill) radius and use the Tertiary Mint color for the background with Forest Green text to maximize readability.
- **Cards:** Cards should have no borders. Instead, use Level 1 Ambient Shadows and a 1rem corner radius. Padding within cards should be a minimum of 24px (lg spacing).
- **Lists:** Use subtle horizontal dividers in the Neutral color. Icons within lists should be simplified line art with a 2px stroke width.
- **Checkboxes/Radios:** These should utilize the Primary Green for the selected state. The "check" or "dot" should be white to ensure high contrast and accessibility.