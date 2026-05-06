"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import "./header.scss";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/story", label: "The Story" },
  { href: "/quiz", label: "Quiz" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/programs", label: "Programs" },
];

export function Header() {
  const pathname = usePathname();
  const [isFixed, setIsFixed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 300);
    };

    const frameId = window.requestAnimationFrame(() => {
      setIsMounted(true);
      handleScroll();
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerMarkup = (className = "") => (
    <header className={className}>
      <div className="menuWrapper">
        <nav className="menuNav" aria-label="Primary navigation">
          {menuItems.map((item) => (
            <Link
              className={`menuLink ${pathname === item.href ? "active" : ""}`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="logoWrapper">
        <Image
          className="logoIcon"
          src="/icons/logoIcon.svg"
          alt="Social Venture Podcast"
          width={944}
          height={912}
          priority
        />
      </div>
      <div className="buttonWrapper">
        <button className="headerButton headerButtonGhost" type="button">
          Listen now
        </button>
        <button className="headerButton headerButtonPrimary" type="button">
          Subscribe
        </button>
      </div>
    </header>
  );

  return (
    <>
      {headerMarkup()}
      {isMounted && isFixed
        ? createPortal(headerMarkup("fixedHeader"), document.body)
        : null}
    </>
  );
}
