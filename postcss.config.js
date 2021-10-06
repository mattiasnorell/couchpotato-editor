const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postcssNested = require('postcss-nested');
const atImport = require('postcss-import');

module.exports = {
    plugins: [atImport(), tailwindcss, postcssNested, autoprefixer]
};
