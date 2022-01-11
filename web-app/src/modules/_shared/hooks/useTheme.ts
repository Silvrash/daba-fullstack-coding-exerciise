import appTheme from "../appTheme";
import K from "../constants";

//  system's theme
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

export function useTheme() {
    const themeMode:any = 'light'?? localStorage.getItem(K.STORAGE_KEYS.THEME_MODE);
    const currentThemeMode =
        themeMode === "device" ? (prefersDarkTheme ? "dark" : "light") : themeMode;

    const colors = currentThemeMode === "light" ? appTheme.light : appTheme.dark;

    function updateTheme(themeMode: "light" | "dark") {
        localStorage.setItem(K.STORAGE_KEYS.THEME_MODE, themeMode);
    }

    function toggleTheme() {
        localStorage.setItem(K.STORAGE_KEYS.THEME_MODE, themeMode === "light" ? "dark" : "light");
    }

    return {
        themeMode: currentThemeMode,
        theme: colors,
        isDark: currentThemeMode !== "light",
        updateTheme,
        toggleTheme,
    };
}
