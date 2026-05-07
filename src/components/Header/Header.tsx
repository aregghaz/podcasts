"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMenuOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menuIsOpen", isMenuOpen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1120) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.classList.remove("menuIsOpen");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`siteHeader ${isFixed ? "fixedHeader" : ""} ${
        isMenuOpen ? "menuOpen" : ""
      }`}
    >
      <div className="menuWrapper">
        <nav className="menuNav" aria-label="Primary navigation">
          {menuItems.map((item) => (
            <Link
              className={`menuLink ${isActiveLink(item.href) ? "active" : ""}`}
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
        <Link className="headerButton headerButtonGhost" href="/podcasts">
          Listen now
        </Link>
        <Link className="headerButton headerButtonPrimary" href="/programs">
          Subscribe
        </Link>
      </div>
      <button
        className="burgerMenuWrapper"
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-controls="mobile-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        className="mobileMenuBackdrop"
        aria-hidden="true"
        onClick={() => setIsMenuOpen(false)}
      />
      <div className="burgerMenuOpen" id="mobile-navigation">
        <nav className="mobileMenuNav" aria-label="Mobile navigation">
          {menuItems.map((item) => (
            <Link
              className={`menuLink ${isActiveLink(item.href) ? "active" : ""}`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobileButtonWrapper">
          <Link className="headerButton headerButtonGhost" href="/podcasts">
            Listen now
          </Link>
          <Link className="headerButton headerButtonPrimary" href="/programs">
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
