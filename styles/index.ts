import { Theme } from 'theme-ui';
import theme from '@theme-ui/preset-tailwind';
import { defaultTheme } from 'prestyled';
export const myWorldTheme: Theme = {
  initialColorModeName: 'light',
  useColorSchemeMediaQuery: true,
  ...theme,
  ...defaultTheme,
};
