"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ParticleField } from "./ParticleField";
import { useEffect, useCallback } from "react";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const preventImageSave = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "IMG" ||
      target.closest("img")
    ) {
      e.preventDefault();
    }
  }, []);

  const preventDrag = useCallback((e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "IMG" ||
      target.closest("img")
    ) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("contextmenu", preventImageSave);
    document.addEventListener("dragstart", preventDrag);
    return () => {
      document.removeEventListener("contextmenu", preventImageSave);
      document.removeEventListener("dragstart", preventDrag);
    };
  }, [preventImageSave, preventDrag]);

  return (
    <>
      <ParticleField />
      <Header />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}
