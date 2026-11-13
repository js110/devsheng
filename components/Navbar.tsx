"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaBars, FaTimes, FaHome, FaCode, FaUser, FaBookOpen } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Projects", href: "/#projects", icon: FaCode },
  { name: "Blog", href: "/blog", icon: FaBookOpen },
  { name: "About", href: "/#about", icon: FaUser },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <span className="text-[#00ff88] text-xl">{"{"}</span>
            <span className="font-bold text-white">EL</span>
            <span className="text-[#00ffff]">:</span>
            <span className="text-[#888888]">dev</span>
            <span className="text-[#00ff88] text-xl">{"}"}</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-sm text-[#888888] hover:text-[#00ff88] transition-colors"
              >
                <link.icon className="text-xs" />
                <span>{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.1, color: "#00ff88" }}
              href="https://github.com/js110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] transition-colors"
            >
              <FaGithub className="text-lg" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={isMobileMenuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#888888] hover:text-[#00ff88] transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-t border-[#222]"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-[#888888] hover:text-[#00ff88] hover:bg-[#111] rounded-lg transition-all"
                >
                  <link.icon />
                  <span>{link.name}</span>
                </a>
              ))}

              <div className="pt-4 border-t border-[#222]">
                <div className="flex justify-center gap-6">
                  <a href="https://github.com/js110" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#00ff88]">
                    <FaGithub className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
