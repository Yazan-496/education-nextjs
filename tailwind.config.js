/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            transitionDelay: {
                '2000': '2000ms',
                '3000': '3000ms',
            },
            boxShadow: {
                "vh-lg": "0 1.1vh 1.5vh rgb(0 0 0 / 0.1), 0 0.4vh 0.6vh rgb(0 0 0 / 0.1);",
              "vh-xl": "0 1.6vh 2.4vh rgba(0, 0, 0, 0.1), 0 .8vh 1.6vh rgba(0, 0, 0, 0.06)",
              "vh-2xl": "0 3.2vh 4.8vh rgba(0, 0, 0, 0.1), 0 1.6vh 3.2vh rgba(0, 0, 0, 0.06)"
            },
            transitionProperty: {
                'height': 'height',
                'width': 'width',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                bounce: 'bounce 1s ease-in-out 500ms infinite alternate',
                bounce1: 'bounce 1s ease-in-out 800ms infinite',
                bounce2: 'bounce 1s ease-in-out 1000ms infinite',
            }
        },
    },
    plugins: [],
}
