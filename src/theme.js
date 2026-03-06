// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. Étendre le thème avec tes couleurs
const theme = extendTheme({ 
  config,
  styles: {
    global: {
      body: {
        bg: "#1A1A1A", // Ton gris anthracite très sombre
        color: "white",
      },
    },
  },
  colors: {
    brand: {
      pink: "#D53F8C", // Ton rose foncé
      gold: "#D4AF37", // Ton doré
    },
  },
});

export default theme;
