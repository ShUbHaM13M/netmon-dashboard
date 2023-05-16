/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F37821',
          'navy-blue': '#3053BF',
          'sky-blue': '#19B0FE',
        },
        chart: {
          blue: '#655BD6',
          pink: '#C649AF',
          lime: '#9BB849',
          green: '#17B155',
          peach: '#EC5784',
        },
        status: {
          safe: '#00BF54',
          medium: '#FAC848',
          major: '#E17538',
          critical: '#ED3445',
        },
        icon: {
          white: '#FEFEFE',
          grey: '#9CA3B2',
          'dark-grey': '#595D66',
        },
        card: {
          dark: '#141518',
          grey: '#212229',
          light: '#32333D',
        },
        disabled: '#595D66',
      },
      boxShadow: {
        light: '0px 18px 24px -10px #0F0F0F33',
        medium: '0px 24px 24px -16px #0F0F0F33',
        dark: '0px 27px 24px -5px #0F0F0F33',
      },
      keyframes: {
        'in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'in-right': 'in-right .5s',
      },
    },
  },
  plugins: [],
};
