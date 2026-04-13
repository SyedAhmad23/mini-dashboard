import React, { ReactNode } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      {/* The main tag wrapping width and padding can stay here or App.tsx but since it applies to all pages we can keep it here */}
      <main className="max-w-7xl mx-auto px-4 pt-12">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
