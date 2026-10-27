import { Geologica_500Medium, Geologica_600SemiBold, Geologica_700Bold } from '@expo-google-fonts/geologica';
import { GolosText_400Regular, GolosText_500Medium, GolosText_600SemiBold, GolosText_700Bold } from '@expo-google-fonts/golos-text';

export const fontAssets = {
  GolosText_400Regular,
  GolosText_500Medium,
  GolosText_600SemiBold,
  GolosText_700Bold,
  Geologica_500Medium,
  Geologica_600SemiBold,
  Geologica_700Bold,
};

export type Weight = 400 | 500 | 600 | 700;

/** Custom fonts in RN need one family per weight. Display = Geologica, text = Golos Text. */
export function fontFamily(family: 'sans' | 'display', weight: Weight = 400) {
  if (family === 'display') return weight >= 700 ? 'Geologica_700Bold' : weight >= 600 ? 'Geologica_600SemiBold' : 'Geologica_500Medium';
  return { 400: 'GolosText_400Regular', 500: 'GolosText_500Medium', 600: 'GolosText_600SemiBold', 700: 'GolosText_700Bold' }[weight];
}
