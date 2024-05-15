import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Open Sans", "sans-serif"],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.charcoal-gray"),
            a: {
              color: theme("colors.deep-forest-green"),
              "&:hover": {
                color: theme("colors.muted-sage"),
              },
            },
            h1: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "700",
              color: theme("colors.charcoal-gray"),
            },
            h2: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "700",
              color: theme("colors.charcoal-gray"),
            },
            h3: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "600",
              color: theme("colors.charcoal-gray"),
            },
            h4: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "600",
              color: theme("colors.charcoal-gray"),
            },
            h5: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "500",
              color: theme("colors.charcoal-gray"),
            },
            h6: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "500",
              color: theme("colors.charcoal-gray"),
            },
            p: {
              fontFamily: theme("fontFamily.sans").join(", "),
              fontWeight: "400",
              color: theme("colors.charcoal-gray"),
            },
            blockquote: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontStyle: "italic",
              color: theme("colors.deep-forest-green"),
              borderLeftColor: theme("colors.muted-sage"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.deep-forest-green"),
            },
            code: {
              color: theme("colors.pale-terracotta"),
              backgroundColor: theme("colors.warm-sand"),
            },
            pre: {
              color: theme("colors.pale-terracotta"),
              backgroundColor: theme("colors.warm-sand"),
            },
            hr: {
              borderColor: theme("colors.muted-sage"),
            },
          },
        },
      }),
      colors: {
        "deep-forest-green": "hsl(180, 25%, 25%)",
        "muted-sage": "hsl(120, 25%, 70%)",
        "soft-clay": "hsl(34, 44%, 69%)",
        "warm-sand": "hsl(39, 77%, 85%)",
        "pale-terracotta": "hsl(25, 63%, 72%)",
        "charcoal-gray": "hsl(60, 2%, 28%)",
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
        buttonheartbeat: {
          "0%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT")',
            transform: "scale(1)",
          },
          "50%": {
            "box-shadow": '0 0 0 7px theme("colors.primary.DEFAULT/0")',
            transform: "scale(1.05)",
          },
          "100%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT/0")',
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        buttonheartbeat: "buttonheartbeat 2s infinite ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;

export default config;
