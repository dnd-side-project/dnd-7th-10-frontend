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
  background_1: '#F4F5F9'
}

export type IColorPalette = keyof typeof ColorPalette
