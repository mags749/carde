import React from "react";
import {
  createFont,
  createTamagui,
  createTokens,
  TamaguiProvider,
} from "tamagui";
import { createMedia } from "@tamagui/react-native-media-driver";
import { config } from "@tamagui/config/v3";
import { createAnimations } from "@tamagui/animations-css";
import { Swatch } from "../utils/types";

const media = createMedia({
  xs: {
    minWidth: 320,
  },
  sm: {
    minWidht: 480,
  },
  md: {
    minWidth: 768,
  },
  lg: {
    minWidth: 1200,
  },
  xl: {
    minWidth: 1600,
  },
});

const bodyFont = createFont({
  family: "Manrope",
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 24,
    5: 32,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
  },
  weight: {
    4: "300",
    6: "600",
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
});

const headingFont = createFont({
  family: "Manrope",
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 24,
    5: 32,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
  },
  weight: {
    4: "300",
    6: "600",
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
});

const animations = createAnimations({
  bouncy: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

const tokens = createTokens({
  color: {
    gray1: "#F5F5F5",
    gray2: "#F3F6F8",
    gray3: "#989AA1",
    gray4: "#E6E6E6",
    gray5: "#EBEBEB",
    black1: "#282C2E",
    black2: "#2C2D2F",
    black3: "#1B1B1B",
    white: "#FFFFFF",
    blue: "#2F80ED",
    green: "#408F35",
    yellow: "#E2B93B",
    red: "#EB5757",
  },
});

const tamaguiConfig = createTamagui({
  ...config,
  animations,
  media,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  defaultFont: "body",
  themes: {
    light: {
      bgColor: tokens.color.gray1,
      sectColor: tokens.color.white,
      modalColor: tokens.color.gray5,
      textColor: tokens.color.black3,
      primaryColor: tokens.color.black3,
      secondaryColor: tokens.color.gray4,
      iconColor: tokens.color.gray3,
    },
    dark: {
      bgColor: tokens.color.black3,
      sectColor: tokens.color.black1,
      modalColor: tokens.color.black2,
      textColor: tokens.color.white,
      primaryColor: tokens.color.gray3,
      secondaryColor: tokens.color.gray4,
      iconColor: tokens.color.gray3,
    },
  },
});

type Conf = typeof tamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

interface Props {
  children: React.ReactNode;
  defaultTheme: Swatch;
}

const TamaguiWrapper: React.FC<Props> = ({ children, defaultTheme }) => (
  <TamaguiProvider
    config={tamaguiConfig}
    defaultTheme={defaultTheme ?? "light"}
  >
    {children}
  </TamaguiProvider>
);

export { Conf, media, TamaguiWrapper };

export default tamaguiConfig;
