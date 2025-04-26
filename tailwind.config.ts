import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Kuriftu custom colors - updated with exact brand colors
        "kuriftu-green": "#1B4332", // Deep forest green - primary brand color
        "kuriftu-green-light": "#2D6A4F", // Lighter green for hover states
        "kuriftu-sand": "#EDE6DA", // Warm beige/sand for backgrounds
        "kuriftu-gold": "#D4AF37", // Gold for accents and premium features
        "kuriftu-terracotta": "#B76E48", // Terracotta for cultural elements
        "kuriftu-charcoal": "#2D2D2D", // Dark charcoal for text
        "kuriftu-gray": "#AFAFAF", // Cool gray for secondary text
        "kuriftu-white": "#FFFFFF", // Pure white
        "emerald-light": "#34D399", // Light emerald for success states
        "terracotta-light": "#D4917A", // Lighter terracotta for hover states
      },
      backgroundImage: {
        "ethiopian-pattern": "url('/patterns/ethiopian-pattern.svg')",
        "coffee-pattern": "url('/patterns/coffee-pattern.svg')",
        "kuriftu-pattern": "url('/patterns/kuriftu-pattern.svg')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "stamp-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(212, 175, 55, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.8)" },
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100px) rotate(720deg)", opacity: "0" },
        },
        "path-draw": {
          to: { strokeDashoffset: "0" },
        },
        "map-marker-pulse": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "stamp-bounce": "stamp-bounce 0.5s ease-in-out",
        "glow-pulse": "glow-pulse 2s infinite",
        confetti: "confetti 3s forwards",
        "path-draw": "path-draw 2s ease-in-out forwards",
        "map-marker-pulse": "map-marker-pulse 2s infinite",
        shimmer: "shimmer 2s infinite linear",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        amharic: ["var(--font-amharic)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
