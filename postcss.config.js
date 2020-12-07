const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: {
      tailwindcss: { config: './tailwind.config.js' },
    }
  }