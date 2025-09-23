import { ThemeProvider } from "./providers/theme-provider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Toaster } from "./components/ui/sonner.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <TooltipProvider delayDuration={100}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster position="top-center" />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </StrictMode>
);
