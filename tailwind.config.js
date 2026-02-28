/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':    '#0d1117',
        'bg-secondary':  '#161b22',
        'bg-card':       '#1c2333',
        'accent-cyan':   '#00d4ff',
        'accent-purple': '#7c3aed',
        'border-dark':   '#30363d',
        'text-primary':  '#e6edf3',
        'text-muted':    '#8b949e',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
