import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };


const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    transparent: "transparent",
  },
  fonts,
});

export default theme;
