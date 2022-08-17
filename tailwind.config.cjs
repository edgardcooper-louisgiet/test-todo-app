const {slate} = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                neutral: slate
            }
        },
        // colors: {
        // }
    },
    plugins: [],
}
module.exports = config
