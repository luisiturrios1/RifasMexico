import { ExpoConfig, ConfigContext } from 'expo/config'

const IS_PREVIEW = process.env.APP_VARIANT === 'preview'
const IS_PRODUCTION = process.env.APP_VARIANT === 'production'
const EXPO_PROJECT_ID = '76aae774-6ecf-4945-a641-c336b18e9ced'

const getAppName = () => {
  if (IS_PRODUCTION) {
    return 'Rifas Mexico'
  }

  if (IS_PREVIEW) {
    return 'Rifas Mexico (Preview)'
  }

  return 'Rifas Mexico (Dev)'
}

const getBundleIdentifier = () => {
  if (IS_PRODUCTION) {
    return 'com.iturriosdev.rifasmexico'
  }

  if (IS_PREVIEW) {
    return 'com.iturriosdev.rifasmexico.preview'
  }

  return 'com.iturriosdev.rifasmexico.dev'
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: 'RifasMexico',
  version: '0.1.4',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'rifasmexico',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  locales: { es: 'es-MX' },
  githubUrl: 'https://github.com/luisiturrios1/RifasMexico',
  runtimeVersion: 'appVersion',
  updates: {
    url: `https://u.expo.dev/${EXPO_PROJECT_ID}`
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: getBundleIdentifier(),
    googleServicesFile:
      process.env.GOOGLE_SERVICES_PLIST ?? './GoogleService-Info.plist'
  },
  android: {
    package: getBundleIdentifier(),
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png'
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
      }
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    '@react-native-firebase/messaging',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static'
        }
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: EXPO_PROJECT_ID
    }
  }
})
