/** @type {import('tailwindcss').Config} */
export default {
    // content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    // important: "#root", // เพื่อให้ CSS ของ Tailwind มี ลำดับความสำคัญสูงกว่า และลดการชนกับ CSS อื่น ๆ
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "1020px",
            xl: "1440px",
        },
        extend: {
            colors: {
                lightBlue: "hsl(215.02, 98.39%, 51.18%)",
                darkBlue: "hsl(213.86, 58.82%, 46.67%)",
                lightGreen: "hsl(156.62, 73.33%, 58.82%)",
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            spacing: {
                180: "32rem",
            },
        },
    },
    plugins: [],
};
