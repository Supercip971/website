module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            lg: "1024px",
            bsm: "700px",
            // => @media (min-width: 640px) { ... }
        },
    },
    plugins: [],
};
