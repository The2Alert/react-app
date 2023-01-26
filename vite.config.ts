import {defineConfig} from "vite";
import {createHtmlPlugin} from "vite-plugin-html";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
    const devMode: boolean = process.env.NODE_ENV === "development";

    return {
        build: {
            sourcemap: devMode
        },
        plugins: [
            createHtmlPlugin({
                minify: true
            }),
            react()
        ]
    };
});