import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { ThemeProvider } from './context/ThemeContext';
import { AppWrapper } from './pages/admin/components/common/PageMeta';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </React.StrictMode>
);
