---
name: Serene Wellness
colors:
  surface: '#f9f9ff'
  surface-dim: '#cedaf4'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d7e3fc'
  on-surface: '#0f1c2e'
  on-surface-variant: '#434656'
  inverse-surface: '#253144'
  inverse-on-surface: '#ebf1ff'
  outline: '#747688'
  outline-variant: '#c4c5d9'
  surface-tint: '#104af0'
  primary: '#0040df'
  on-primary: '#ffffff'
  primary-container: '#2d5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#b8c3ff'
  secondary: '#006d3c'
  on-secondary: '#ffffff'
  secondary-container: '#70fda7'
  on-secondary-container: '#007440'
  tertiary: '#4c5851'
  on-tertiary: '#ffffff'
  tertiary-container: '#647069'
  on-tertiary-container: '#e7f4eb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001355'
  on-primary-fixed-variant: '#0035bd'
  secondary-fixed: '#70fda7'
  secondary-fixed-dim: '#51df8e'
  on-secondary-fixed: '#00210e'
  on-secondary-fixed-variant: '#00522c'
  tertiary-fixed: '#d9e6dd'
  tertiary-fixed-dim: '#bdcac1'
  on-tertiary-fixed: '#131e19'
  on-tertiary-fixed-variant: '#3e4943'
  background: '#f9f9ff'
  on-background: '#0f1c2e'
  surface-variant: '#d7e3fc'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  h4:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
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
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.0'
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

The design system is centered on the intersection of scientific authority and human empathy. It aims to eliminate the anxiety often associated with sexual health education by utilizing a "Modern Wellness" aesthetic. This style moves away from the sterile, cold environments of traditional medicine (clinical whites and high-contrast reds) and instead embraces a "Soft Corporate" approach.

The brand personality is **Empowering, Safe, and Transparent**. The UI should feel like a supportive digital mentor—professional enough to trust with sensitive information, yet warm enough to encourage exploration and learning. Visually, this is achieved through generous whitespace, high-quality typography, and a "fresh" surface strategy that uses subtle tints instead of pure grayscale.

## Colors

The color palette is designed to be "Serene and Healthy." 
- **Primary Blue:** A deep, trustworthy blue used for primary actions, navigation, and key brand moments. It provides the "professional" anchor.
- **Secondary Green:** A vibrant, "leafy" green used to signify health, safety, and positive outcomes. It acts as a soothing accent.
- **Surface Strategy:** To avoid "clinical whites," the design system uses a very light off-blue (`#F8FAFC`) for the main background. This keeps the interface fresh and modern without being stark.
- **Functional Colors:** Success, Warning, and Error states should be softened—using tints of the primary green for success and a muted coral for errors—to maintain the calm atmosphere.

## Typography

This design system utilizes **Plus Jakarta Sans** for all levels of communication. Its geometric yet slightly rounded character provides a contemporary and accessible feel that balances expertise with friendliness.

- **Headlines:** Use Bold and Semi-Bold weights with tighter letter spacing to create a distinctive, editorial look.
- **Body Text:** Use Regular weight with generous line height (1.6) to ensure maximum readability, especially for long-form educational content.
- **Accessibility:** Ensure a minimum contrast ratio of 4.5:1 for all body text against background tints. The "Body-lg" size should be the default for educational articles to reduce eye strain.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid grid**. 
- On desktop, content is contained within a 1200px max-width container to prevent line lengths from becoming too long for educational reading.
- A 12-column grid is used with 24px gutters.
- Vertical rhythm is maintained through an 8px base unit. 

The design system encourages "Heavy Whitespace" between sections (using `xl` spacing) to give the user "breathing room" when processing sensitive or complex health information.

## Elevation & Depth

To maintain a clean and professional look, the design system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Ambient Shadows**:

- **Tonal Layers:** High-level containers (like cards) should use a pure white background to subtly pop against the off-blue (`#F8FAFC`) page background.
- **Ambient Shadows:** When elevation is required (e.g., for modals or floating action buttons), use extremely diffused shadows with a slight blue tint (e.g., `rgba(45, 91, 255, 0.08)`) to maintain the serene aesthetic.
- **Borders:** Use low-contrast, 1px strokes in a slightly darker version of the background color to define boundaries without adding visual clutter.

## Shapes

The shape language is **Medium-Rounded**, striking a balance between the precision of professional health tools and the approachability of a lifestyle app.

- **Base Components:** Buttons and input fields use a 0.5rem (8px) radius.
- **Large Components:** Cards and educational modules use a 1rem (16px) radius to feel more inviting.
- **Iconography:** Icons should feature rounded caps and corners to match the typography's softness. Avoid sharp 90-degree angles in all decorative elements.

## Components

### Buttons
Primary buttons use the Brand Blue with white text. Secondary buttons should use a ghost style (blue border/text) or a light green tint. All buttons feature a 0.5rem radius and a slight scale-down effect on press to feel tactile.

### Cards
Educational cards are the primary vessel for information. They should have a white background, 1rem corner radius, and a subtle 1px border. On hover, a soft ambient shadow may be applied to indicate interactivity.

### Input Fields
Inputs use a light-gray border that transforms into a 2px primary blue border on focus. Label text should always be visible above the field for accessibility.

### Educational Progress Bars
A custom component for tracking learning modules. Use the secondary green for progress to provide a "healthy" sense of accomplishment.

### Quick Exit Button
A specialized component for privacy. A high-visibility, high-contrast button (often using a muted red or dark gray) that immediately redirects the user to a neutral site (like Google) and clears the current view, essential for sexual health privacy.

### Chips/Tags
Used for categorizing topics (e.g., "Contraception," "Consent"). Use the secondary green tint for background and a dark green for text.