import appTheme from './appTheme';

type ThemeInterface = typeof appTheme.light & typeof appTheme.dark;

declare module 'styled-components' {
	interface DefaultTheme extends ThemeInterface {}
}
