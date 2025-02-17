"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  const handleScroll = (id: string) => {
    if (id === "home") {
      // Scroll para o topo da página
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const section = document.getElementById(id);
      if (section) {
        const offset = -50; // Ajuste de deslocamento para não cortar a seção
        window.scrollTo({
          top: section.offsetTop + offset,
          behavior: "smooth",
        });
      }
    }

    // Remove o hash da URL após o scroll
    setTimeout(() => {
      history.pushState(null, "", window.location.pathname + window.location.search);
    }, 1000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {navItems.map((navItem: any, idx: number) => (
          <button
            key={`link=${idx}`}
            onClick={() => handleScroll(navItem.link.replace("#", ""))} // Remove o # e rola até a seção correta
            className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 !cursor-pointer"
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="text-sm">{navItem.name}</span>
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
