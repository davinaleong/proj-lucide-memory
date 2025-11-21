# Mobile App Deployment Guide

Your Lucide Memory web app has been successfully configured as a mobile app for iOS (App Store) and Android (Play Store).

## ✅ What's Been Configured

1. **Capacitor Setup**
   - iOS and Android platforms added
   - Native plugins installed: SplashScreen, StatusBar, Haptics
   - Capacitor config updated with proper app ID: `dev.gracesoft.lucidememory`

2. **App Configuration**
   - Main app file updated to initialize native plugins
   - Android manifest configured with necessary permissions
   - Build scripts added to package.json

3. **Project Structure**
   - `/android` - Android native project
   - `/ios` - iOS native project (requires Xcode)
   - `/resources` - App icons and splash screens folder

## 📱 Development Workflow

### Building for Development

```bash
# Sync web app with native platforms
npm run cap:sync

# Open Android Studio to build/test Android app
npm run cap:android

# Open Xcode to build/test iOS app (requires macOS with Xcode installed)
npm run cap:ios
```

## 🎨 Creating App Icons & Splash Screens

### Required Assets

1. **App Icon**: Create a 1024x1024px PNG named `icon.png` in the `/resources` folder
   - No transparency for iOS
   - Simple, recognizable design
   - Avoid small details or text

2. **Splash Screen**: Create a 2732x2732px PNG named `splash.png` in the `/resources` folder
   - Keep important content centered (1200x1200px safe zone)
   - Simple, fast-loading design

### Generate All Sizes

```bash
# Install Capacitor Assets tool globally
npm install -g @capacitor/assets

# Generate all required icon and splash screen sizes
npx @capacitor/assets generate --iconBackgroundColor '#ffffff' --splashBackgroundColor '#ffffff'
```

This automatically creates all required sizes for both iOS and Android.

## 🤖 Android (Play Store) Deployment

### Prerequisites

1. Install [Android Studio](https://developer.android.com/studio)
2. Install Android SDK (via Android Studio)
3. Create a [Google Play Developer account](https://play.google.com/console) ($25 one-time fee)

### Build Steps

1. **Open the project in Android Studio**
   ```bash
   npm run cap:android
   ```

2. **Update app details** in `android/app/build.gradle`:
   - Increment `versionCode` for each release
   - Update `versionName` (e.g., "1.0.0" → "1.0.1")

3. **Generate a signed APK/Bundle**
   - In Android Studio: Build → Generate Signed Bundle/APK
   - Create a keystore (keep it secure!)
   - Choose "Android App Bundle" (AAB) for Play Store
   - Select "release" build variant

4. **Test the release build**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

5. **Upload to Play Console**
   - Go to [Google Play Console](https://play.google.com/console)
   - Create new app
   - Fill in store listing (description, screenshots, etc.)
   - Upload AAB file
   - Complete content rating questionnaire
   - Set pricing (free/paid)
   - Submit for review

### Important Android Files

- `android/app/build.gradle` - App version and configuration
- `android/app/src/main/AndroidManifest.xml` - Permissions and app info
- `android/app/src/main/res/` - Icons, strings, and resources

## 🍎 iOS (App Store) Deployment

### Prerequisites

1. **macOS with Xcode installed** (required for iOS development)
   ```bash
   xcode-select --install
   sudo gem install cocoapods
   ```

2. **Apple Developer Account** ($99/year)
   - Enroll at [developer.apple.com](https://developer.apple.com)

3. **Install CocoaPods dependencies**
   ```bash
   cd ios/App
   pod install
   ```

### Build Steps

1. **Open the project in Xcode**
   ```bash
   npm run cap:ios
   ```

2. **Configure signing**
   - Select the App target
   - Go to "Signing & Capabilities"
   - Select your Team
   - Xcode will automatically manage provisioning profiles

3. **Update app version**
   - In Xcode project settings
   - Increment Build number for each upload
   - Update Version for user-facing releases

4. **Configure app info**
   - Update `ios/App/App/Info.plist` with required permissions
   - Add app icons (via Assets.xcassets or use generated ones)

5. **Archive and upload**
   - In Xcode: Product → Archive
   - When archive completes, click "Distribute App"
   - Choose "App Store Connect"
   - Follow the wizard to upload

6. **Submit via App Store Connect**
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Complete app information
   - Add screenshots (required for all device sizes)
   - Fill privacy policy and support URLs
   - Submit for review

### Important iOS Files

- `ios/App/App/Info.plist` - App configuration and permissions
- `ios/App/App.xcodeproj` - Xcode project file
- `ios/App/Podfile` - CocoaPods dependencies

## 🔧 Common Tasks

### Update App Content

```bash
# 1. Make changes to your React app in /src
# 2. Build and sync
npm run build
npx cap sync
```

### Adding Native Plugins

```bash
# Example: Add camera plugin
npm install @capacitor/camera
npx cap sync
```

### Debugging

**Android:**
- Use Chrome DevTools: `chrome://inspect`
- Or Android Studio Logcat

**iOS:**
- Use Safari Web Inspector (Develop menu)
- Or Xcode console

### Clean Build

```bash
# Clean and rebuild everything
npm run build
npx cap sync

# Android
cd android && ./gradlew clean && cd ..

# iOS (requires macOS)
cd ios/App && pod install && cd ../..
```

## 📋 Pre-Launch Checklist

### Both Platforms

- [ ] App icon created (1024x1024px)
- [ ] Splash screen created (2732x2732px)
- [ ] Assets generated with `@capacitor/assets`
- [ ] App description written (short & long)
- [ ] Screenshots prepared (multiple device sizes)
- [ ] Privacy policy URL ready
- [ ] Support/contact email set up
- [ ] Content rating completed
- [ ] Pricing decided (free/paid)

### Android Specific

- [ ] Keystore created and backed up securely
- [ ] `versionCode` and `versionName` updated
- [ ] Release APK/AAB tested
- [ ] Feature graphic created (1024x500px)
- [ ] Google Play Console account created

### iOS Specific

- [ ] Apple Developer account active
- [ ] Xcode signing configured
- [ ] Build and version numbers updated
- [ ] App Store screenshots for all required sizes
- [ ] Privacy policy and support URLs added
- [ ] App Store Connect listing completed

## 🚀 Next Steps

1. **Create your app icons and splash screens**
   - Design files should be in the `/resources` folder
   - Run `npx @capacitor/assets generate`

2. **Test on physical devices**
   - Android: Enable USB debugging and connect device
   - iOS: Register device in Apple Developer portal

3. **Prepare store listings**
   - Write compelling descriptions
   - Create marketing screenshots
   - Prepare promotional materials

4. **Submit for review**
   - Android review: Usually 1-3 days
   - iOS review: Usually 1-3 days (can be longer)

## 📚 Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/distribute)
- [iOS App Store Guide](https://developer.apple.com/app-store/submissions/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)

## 🆘 Troubleshooting

### "CocoaPods not installed" (iOS)

```bash
sudo gem install cocoapods
cd ios/App
pod install
```

### "Xcode not found" (iOS)

Install Xcode from the Mac App Store, then:
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

### Android build errors

```bash
cd android
./gradlew clean
cd ..
npm run cap:sync
```

### Web assets not updating

```bash
rm -rf android/app/src/main/assets/public
rm -rf ios/App/App/public
npm run build
npx cap sync
```

---

**Note**: iOS development requires a Mac with Xcode. If you only want to deploy to Android, you can build the APK on any platform with Android Studio installed.
