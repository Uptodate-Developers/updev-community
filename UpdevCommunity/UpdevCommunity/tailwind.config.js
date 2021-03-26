module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: {
                    50: '#f2f7fb',
                    100: '#e6f0f8',
                    200: '#bfd9ed',
                    300: '#99c3e2',
                    400: '#4d95cd',
                    500: '#0068b7',
                    600: '#005ea5',
                    700: '#004e89',
                    800: '#003e6e',
                    900: '#00335a'
                }
            },
            height: theme => ({
                "screen/1.2": "calc(100vh / 1.25)",
                "screen/1.5": "calc(100vh / 1.5)",
                "screen/1.8": "calc(100vh / 1.76)",
                "screen/2": "50vh",
                "screen/3": "calc(100vh / 3)",
                "screen/4": "calc(100vh / 4)",
                "screen/5": "calc(100vh / 5)",
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
