module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
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
        }
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
