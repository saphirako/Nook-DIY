module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderColor: theme => ({
      ...theme('colors'),
      'diycard': "#f5f0e2"
    }),
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
        brown: {
          lightest: "#e6dfc4",
          lighter: "#d3cda5",
          light: "#D8C791",
          DEFAULT: "#dfd7ac",
          dark: "#855d2d",
          darker: "#734F3D",
        }
      },
      gridAutoRows: {
        'recipes': '15rem'
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
