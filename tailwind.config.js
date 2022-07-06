module.exports = {
  content:  [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  theme: {
    borderWidth: theme => ({
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '12': '12px'
    }),
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    extend: {
      backgroundImage: theme => ({
        'diyrecipe': "url('static/image/diyBackground.png')"
      }),
      boxShadow: {
        'recipecard': '0px 13px 10px -8px rgba(41,40,35,0.56)'
      },
      colors: {
        highlight: "#13c5cb",
        nookipedia: "#67af40",
        brown: {
          100: "#FFFBEE",
          200: "#F0EBDA",
          300: "#e6dfc4",
          400: "#d3cda5",
          500: "#D8C791",
          DEFAULT: "#dfd7ac",
          600: "#855d2d",
          700: "#604320",
        },
        "acnh-red": "#d8595a",
        "acnh-yellow": "#e7da77",
        "acnh-green": "#95d57c",
        "acnh-blue": "#bad5eb",
        "acnh-brick": "#bc9e6e",
        "acnh-light": "#b9babe",
        "acnh-pink": "#f9b9ba",
        "acnh-beige": "#e5daac",
        "acnh-brown": "#94693c",
        "acnh-orange": "#f6c568",
        "acnh-dark": "#6a6a6e",
        "acnh-white": "#e8e8e6",
        "acnh-gold": "#d6c574",
        "acnh-gold-border": "#AE9846",
        "acnh-silver": "#9e9fa3",
        "acnh-silver-border": "#787B7A"
      },
      gridAutoRows: {
        'recipes': '15rem'
      },
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem'
      },
      screens: {
        'hd': '1920px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
