import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { Button, Text, View, styled, useTheme } from "tamagui";
import { TamaguiWrapper } from "./config/tamagui";
import { SwatchProvider, useSwatch } from "./hooks";

SplashScreen.preventAutoHideAsync();

const AppContainer = styled(View, {
  flex: 1,
  backgroundColor: "$bgColor",
  alignItems: "center",
  justifyContent: "center",
});

const AppLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded] = useFonts({
    Manrope: require("../assets/fonts/Manrope.ttf"),
  });
  const { swatch } = useSwatch();
  const theme = useTheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Perform any pre-loading tasks here
        // For example, load fonts, make API calls, etc.
        if (loaded) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, [loaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !loaded) {
    return null;
  }

  return (
    <AppContainer onLayout={onLayoutRootView}>
      <View
        backgroundColor={theme.sectColor}
        padding={32}
        borderRadius={24}
        gap={16}
      >
        <Text color={theme.textColor}>
          Open up App.tsx to start working on your app!
        </Text>
        <Button backgroundColor={theme.primaryColor} color={theme.sectColor}>
          Hello World
        </Button>
      </View>

      <StatusBar
        style={swatch === "dark" ? "light" : "dark"}
        backgroundColor={theme.bgColor.val}
      />
    </AppContainer>
  );
};

const ThemeWrapper = () => {
  const { swatch } = useSwatch();

  return (
    <TamaguiWrapper defaultTheme={swatch}>
      <AppLayout />
    </TamaguiWrapper>
  );
};

const App = () => (
  <SwatchProvider>
    <ThemeWrapper />
  </SwatchProvider>
);

export default App;
