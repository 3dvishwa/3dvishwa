/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#3E312C',
                    muted: '#65554D',
                    green: '#3F5B43',
                    sage: '#7B8F63',
                    cream: '#FCF8F3',
                },
            },
        },
    },
    plugins: [],
};