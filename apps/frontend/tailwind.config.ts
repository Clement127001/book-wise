import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/shadcn-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        app: {
          admin: {
            primary: {
              100: "hsl(229, 58%, 90%)",
              200: "hsl(229, 58%, 80%)",
              300: "hsl(229, 58%, 70%)",
              400: "hsl(229, 58%, 60%)",
              500: "hsl(229, 58%, 50%)",
              600: "hsl(229, 58%, 40%)",
              700: "hsl(229, 58%, 35%)",
              800: "hsl(229, 58%, 30%)",
            },
            bg: "hsl(240, 100%, 99%)",
            link: "hsl(206, 100%, 47%)",
            book: {
              borrowed: "hsl(258, 54%, 52%)",
              returned: "hsl(201, 98%, 32%)",
              latereturn: "hsl(341, 85%, 41%)",
            },
            status: {
              pending: "hsl(22, 75%, 54%)",
              accepted: "hsl(155, 97%, 24%)",
              denied: "hsl(341, 85%, 41%)",
            },
          },
          gray: {
            100: "hsla(214, 32%, 91%, 1)",
            200: "hsl(214, 6%, 79%)",
            300: "hsl(0, 0%, 56%)",
            400: "hsl(100, 5%, 53%)",
            500: "hsl(220, 11%, 64%)",
            600: "hsl(0, 0%, 47%)",
            700: "hsl(229, 5%, 55%)",
            800: "hsla(0, 0%, 40%, 1)",
          },
          black: {
            100: "hsl(0, 0%, 20%)",
            200: "hsla(0, 0%, 13%, 0)",
            300: "hsl(0, 0%, 7%)",
          },
          purple: {
            100: "hsl(246, 17%, 35%)",
            200: "hsl(267, 100%, 92%)",
          },
          accent: {
            success: {
              "100": "var(--app-accent-success-100)",
              "200": "var(--app-accent-success-200)",
              "300": "var(--app-accent-success-300)",
              "400": "var(--app-accent-success-400)",
              "500": "var(--app-accent-success-500)",
              "600": "var(--app-accent-success-600)",
              "700": "var(--app-accent-success-700)",
              "800": "var(--app-accent-success-800)",
              "900": "var(--app-accent-success-900)",
            },
            error: {
              "100": "var(--app-accent-error-100)",
              "200": "var(--app-accent-error-200)",
              "300": "var(--app-accent-error-300)",
              "400": "var(--app-accent-error-400)",
              "500": "var(--app-accent-error-500)",
              "600": "var(--app-accent-error-600)",
              "700": "var(--app-accent-error-700)",
              "800": "var(--app-accent-error-800)",
              "900": "var(--app-accent-error-900)",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
