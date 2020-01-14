export type TColor =
  // Effects
  | 'shadowGrey'
  | 'hoverGrey'
  | 'hoverBlue'

  // Colors
  | 'transparent'
  | 'white'
  | 'black'
  | 'lightGrey'
  | 'grey'
  | 'red'
  | 'blue'
  | 'darkBlue'
  | 'green'

export const colors = {
  // Effects
  shadowGrey: 'rgba(230,230,230,0.1)',
  hoverGrey: 'rgba(230,230,230,0.5)',
  hoverBlue: 'rgba(0, 120, 225,0.1)',

  // Colors
  transparent: 'transparent',
  white: 'white',
  black: 'rgb(55,55,55)',
  lightGrey: 'rgba(240,240,240)',
  grey: 'rgb(200,200,200)',
  red: '#E63946',
  blue: 'rgba(50, 120, 225, 1)',
  darkBlue: '#134074',
  green: '#59C9A5'
}

// ==========================================================
export const sizes = {
  navigation: '4.5rem',

  tableHeader: '.65rem'
}
