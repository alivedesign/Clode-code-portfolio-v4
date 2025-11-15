import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '500px',
        'tablet': '768px',
        'desktop': '1200px',
      },
      colors: {
        background: "var(--color-background)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        accent: "var(--color-accent)",
        link: "var(--color-link)",
        "dark-text": "var(--color-dark-text)",
      },
      spacing: {
        'spacing-1': 'var(--spacing-1)',
        'spacing-2': 'var(--spacing-2)',
        'spacing-3': 'var(--spacing-3)',
        'spacing-4': 'var(--spacing-4)',
        'spacing-5': 'var(--spacing-5)',
        'spacing-6': 'var(--spacing-6)',
        'spacing-7': 'var(--spacing-7)',
        'spacing-8': 'var(--spacing-8)',
        'spacing-9': 'var(--spacing-9)',
        'spacing-12': 'var(--spacing-12)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      fontFamily: {
        sans: ['var(--font-sf-pro)', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'text-16': ['16px', { lineHeight: '1.4' }],
        'text-18': ['18px', { lineHeight: '1.2' }],
        'title-18': ['18px', { lineHeight: '1.2', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
