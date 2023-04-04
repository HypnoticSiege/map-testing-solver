/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./views/**/*.{ejs,html,js}",
        "./views/*.{ejs,html,js}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("daisyui")
    ],

    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#1089FF",        
                    "secondary": "#009EFF",
                    "accent": "#7cc4f2",
                    "neutral": "#8dd1fc",
                    "base-100": "#2A303C",
                    "info": "#31E1F7",
                    "success": "#16a34a",
                    "warning": "#f59e0b",
                    "error": "#FA1616",
                },                    
            }
        ]
    }
}