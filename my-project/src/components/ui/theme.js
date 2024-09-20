
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    // Core dark tones
    background: "#1a202c", // Dark gray/black for the main background
    darkGray: "#2d3748", // Secondary dark tone
    metallic: "#4a5568", // Steely metallic gray

    // Warhammer-specific accents
    bloodRed: "#9b2c2c", // Deep, blood-like red
    gold: "#d4af37", // Tarnished gold
    nurgleGreen: "#3b5323", // Muted, plague-like green

    // Expanded Warhammer colors
    chaosRed: "#c53030", // Vibrant, chaotic red
    imperialBlue: "#2c5282", // Dark, military blue (Space Marines, Imperium)
    orkGreen: "#4caf50", // Wild, aggressive Ork green
    necromundaRust: "#d2691e", // Rusty industrial orange
    tzeentchPurple: "#6b46c1", // Arcane, mystical purple
    warDust: "#d3d3c4", // Light beige or tan, useful for backgrounds or accents

    // Text and highlights
    whiteAlpha: "#f5f5f5", // Off-white for readable text
    darkHighlight: "#718096", // Subtle light gray for UI elements
  },

  styles: {
    global: {
      body: {
        bg: "background", // Set the global background
        color: "darkGray", // Set default text color
      },
    },
  },

  // Set initial dark mode
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default theme;
