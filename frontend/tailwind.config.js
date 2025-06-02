// tailwind.config.js
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        xs: '320px'
      },
    },
    extend: {
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
