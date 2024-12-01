import React from "react";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "../theme/ThemeProvider";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </div>
  );
}
