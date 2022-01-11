const Constants = {
    APP_VERSION: require("../../../package.json").version,
    BASE_API_URL: {
        STAGING: "localhost:8080",
        PRODUCTION: "benspace.herokuapp.com",
    },
    STORAGE_KEYS: {
		JWT_TOKEN: 'interview.ben.aa.jwt',
		CURRENT_USER: 'interview.ben.aa.currentUser',
        THEME_MODE: 'interview.ben.aa.themeMode',
	},
    ERRORS: {
		FAILED_CONNECTION: 'Connection Failed. Please check your internet connection',
	},
    EVENTS: {
		RELOAD: 'reload',
		SHOW_NOTIFICATION: 'show_top_level_notification',
	},
    ROUTES: {
        login: "/login",
        signUp: "/signUp",
        home: "/home",
        edit: "/edit",
    },
};

export default Constants;
