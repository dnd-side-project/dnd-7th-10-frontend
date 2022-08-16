export const FontFamily = {
  Black: 'Pretendard-Black',
  Bold: 'Pretendard-Bold',
  ExtraBold: 'Pretendard-ExtraBold',
  ExtraLight: 'Pretendard-ExtraLight',
  Light: 'Pretendard-Light',
  Medium: 'Pretendard-Medium',
  Regular: 'Pretendard-Regular',
  SemiBold: 'Pretendard-SemiBold',
  Thin: 'Pretendard-Thin'
}

export type IFontFamily = keyof typeof FontFamily

export const ColorPalette = {
  gray_1: '#ffffff',
  gray_2: '#F4F5F9',
  gray_3: '#E7ECF2',
  gray_4: '#CFD8E7',
  gray_5: '#A4B4CD',
  gray_6: '#6C7D99',
  gray_7: '#394A66',
  gray_8: '#26344A',
  gray_9: '#1E2634',
  gray_10: '#0C1118',
  main_1: '#FF5216',
  main_2: 'rgba(255,82,22,0.3)',
  system_blue: '#2792FF',
  system_red: '#FF4F55',
  background_1: '#F4F5F9',
  White: '#FFFFFF',
  background_2: '#F7FAFC',
  BlueGray_1: '#EEF5FA',
  LinkkleLightBlueGray: '#DEEBF5',
  BlueGray_2: '#D6E1ED',
  BlueGray_3: '#93ABC6',
  LinkkleBlueGray: '#5E7294',
  BlueGray_4: '#394A66',
  LinkkleDarkBlueGray: '#26344A',
  BlueGray_5: '#18253E',
  BlueGray_6: '#151D29',
  LinkkleOrange: '#FF5216',
  LinkkleLightOrange_2: '#FFAA73',
  LinkkleLightOrange_1: '#FFE9D0',
  Background_1: '#F4F5F9',
  Background_2: '#F7FAFC',
  Function_Red: '#FF4F55',
  Function_Blue: '#2792FF'
}

export type IColorPalette = keyof typeof ColorPalette
