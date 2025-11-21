# App Resources

This folder contains icons and splash screens for the mobile app.

## Required Assets

### App Icon
- **icon.png**: 1024x1024px PNG with transparency
  - This will be automatically resized for all required sizes on both iOS and Android

### Splash Screen
- **splash.png**: 2732x2732px PNG
  - This will be automatically resized and cropped for all device sizes
  - Keep important content in the center safe zone (about 1200x1200px)
  - Background color can be set in `capacitor.config.ts`

## Generating Assets

1. Place `icon.png` and `splash.png` in this folder
2. Install the Capacitor Assets tool:
   ```bash
   npm install -g @capacitor/assets
   ```
3. Generate all required sizes:
   ```bash
   npx @capacitor/assets generate
   ```

This will automatically create all required icon and splash screen sizes for iOS and Android.

## Design Guidelines

### Icon Design
- Use simple, recognizable imagery
- Avoid text (unless it's part of your brand)
- Fill the entire 1024x1024px space
- Use transparency if needed
- Test on different backgrounds (light/dark)

### Splash Screen Design
- Keep it simple and fast-loading
- Match your app's branding
- Center important visual elements
- Consider both portrait and landscape orientations
