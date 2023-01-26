/// <reference types="vite/client" />
import React from "react";
import {createRoot} from "react-dom/client";
import {App} from "./App";

(() => {
    const container: Element | null = document.querySelector(".app");

    if (!container) {
        return;
    }

    const root = createRoot(container);

    root.render(<App />);
})();
