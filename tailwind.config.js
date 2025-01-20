/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"], // Regular Montserrat
        MontserratBold: ["Montserrat-Bold", "sans-serif"], // Bold Montserrat
        MontserratExtraBold: ["Montserrat-ExtraBold", "sans-serif"], // Extra Bold Montserrat
        MontserratExtraLight: ["Montserrat-ExtraLight", "sans-serif"], // Extra Light Montserrat
        MontserratLight: ["Montserrat-Light", "sans-serif"], // Light Montserrat
        MontserratMedium: ["Montserrat-Medium", "sans-serif"], // Medium Montserrat
        MontserratSemiBold: ["Montserrat-SemiBold", "sans-serif"], // Semi Bold Montserrat
        ZainBold: ["Zain-Bold", "sans-serif"], // Bold ZAIN
        ZainExtraBold: ["Zain-ExtraBold", "sans-serif"], // Extra Bold ZAIN
        ZainExtraLight: ["Zain-ExtraLight", "sans-serif"], // Extra Light ZAIN
        ZainLight: ["Zain-Light", "sans-serif"], // Light ZAIN
        ZainMedium: ["Zain-Medium", "sans-serif"], // Medium ZAIN
        ZainRegular: ["Zain-Regular", "sans-serif"], // Regular ZAIN
      },

      colors: {
        primary: {
          50: "#FFEAE6", // Lightest tint
          100: "#FFD0C8",
          200: "#FFA28F",
          300: "#FF7456", // Lighter shade of primary
          400: "#FF5C39", // Primary color (main)
          500: "#E65333", // Slightly darker than main
          600: "#CC4A2D",
          700: "#B34127", // Darker shade of primary
          800: "#8C311F",
          900: "#662319", // Darkest shade
        },
        secondary: {
          white: "#FFFFFF",
          black: {
            50: "#F2F2F2", // Lightest gray
            100: "#E6E6E6",
            200: "#CCCCCC",
            300: "#B3B3B3",
            400: "#999999", // Medium gray
            500: "#666666", // Darker gray
            600: "#4D4D4D",
            700: "#333333", // Almost black
            800: "#1A1A1A", // Dark black
            900: "#000000", // Black (main)
          },
        },
        textColor: {
          50: "#F1F1F2", // Lightest tint of optional color
          100: "#D6D6D8",
          200: "#B8B8BB",
          300: "#999A9E",
          400: "#7B7C81",
          500: "#63666A", // Optional color (main)
          600: "#505257",
          700: "#3D3E43", // Darker shade
          800: "#2A2B2E",
          900: "#17181A", // Darkest shade
        },
      },
    },
  },
  plugins: [],
};
