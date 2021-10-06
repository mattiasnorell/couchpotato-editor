// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.pug'],
  jit: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    
  },
  variants: {
    extend: {
      borderWidth: ['last']
    },
  },
  plugins: [],
}