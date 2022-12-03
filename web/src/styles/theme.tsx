import { extendTheme } from "@chakra-ui/react";

const fonts = { Inconsolata: `'Inconsolata', monospace` };

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    transparent: "transparent",
    primaryBlue: "#063589",
    primaryDarkBlue: "#020123",
    actionPurple: "#E620EA",
    lightGray: "#D1C6C6"
  },
  fonts,
});

export default theme;
