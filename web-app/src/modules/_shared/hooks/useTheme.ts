import { useState } from "react";
import appTheme from "../appTheme";
import K from "../constants";

//  system's theme
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

export function useTheme() {
    const [themeMode, updateThemeMode] = useState(
        localStorage.getItem(K.STORAGE_KEYS.THEME_MODE) ?? "light"
    );

    const currentThemeMode =
        themeMode === "device" ? (prefersDarkTheme ? "dark" : "light") : themeMode;

    const colors = currentThemeMode === "light" ? appTheme.light : appTheme.dark;

    function updateTheme(themeMode: "light" | "dark" | "device") {
        updateThemeMode(themeMode);
        localStorage.setItem(K.STORAGE_KEYS.THEME_MODE, themeMode);
        window.location.reload();
    }

    return {
        themeMode: currentThemeMode,
        theme: colors,
        isDark: currentThemeMode !== "light",
        updateTheme,
    };
}
