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

export const colors = {
  // Effects
  shadowGrey: 'rgba(230,230,230,0.1)',
  hoverGrey: 'rgba(230,230,230,0.5)',
  hoverBlue: 'rgba(0, 120, 225,0.1)',

  // Colors
  transparent: 'transparent',
  white: 'white',
  black: 'rgb(50,50,50)',
  lightGrey: 'rgba(230,230,230,0.3)',
  grey: 'rgb(200,200,200)',
  red: '#E63946',
  blue: 'rgba(50, 120, 225, 1)',
  darkBlue: '#134074'
}

// ==========================================================
export const sizes = {
  navigation: 70,

  tableHeader: '.65rem'
}
