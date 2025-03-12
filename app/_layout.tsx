import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "~/lib/i18n";
import LanguageSwitcher from "~/components/ui/language-switcher";
import {
  useFonts,
  UbuntuMono_400Regular,
  UbuntuMono_400Regular_Italic,
  UbuntuMono_700Bold,
  UbuntuMono_700Bold_Italic,
} from "@expo-google-fonts/ubuntu-mono";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    UbuntuMono_400Regular,
    UbuntuMono_400Regular_Italic,
    UbuntuMono_700Bold,
    UbuntuMono_700Bold_Italic,
  });
  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { t } = useTranslation();

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded || (!loaded && !error)) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

        {/* Main navigation stack */}
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: t("recipeBuilder.homeHeading"),
              headerTitleStyle: {
                fontFamily: "UbuntuMono_400Regular",
              },
              headerRight: () => (
                <View className="flex-row items-center">
                  <ThemeToggle />
                </View>
              ),
            }}
          />
        </Stack>

        {/* Main app portal host */}
        <PortalHost />

        {/* Special portal for navigation components */}
        <PortalHost name="navigationPortal" />
      </ThemeProvider>
    </I18nextProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
