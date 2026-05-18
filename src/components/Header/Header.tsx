"use client";

import { useEffect, useState } from "react";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, X } from "lucide-react";
import "./header.scss";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/story", label: "The Story" },
  { href: "/quiz", label: "Quiz" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/programs", label: "Programs" },
];

const YouTubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M21.5 7.4a3 3 0 0 0-2.1-2.1C17.6 4.8 12 4.8 12 4.8s-5.6 0-7.4.5a3 3 0 0 0-2.1 2.1A31.2 31.2 0 0 0 2 12a31.2 31.2 0 0 0 .5 4.6 3 3 0 0 0 2.1 2.1c1.8.5 7.4.5 7.4.5s5.6 0 7.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 22 12a31.2 31.2 0 0 0-.5-4.6Z" />
    <path d="m10 15.4 5.2-3.4L10 8.6v6.8Z" fill="#080a09" />
  </svg>
);

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M14.4 8.1V6.8c0-.6.4-.8.9-.8h2.1V2.4L14.5 2c-3.2 0-4.9 1.9-4.9 5.3v.8H6.4V12h3.2v10h4.1V12h3.3l.5-3.9h-3.1Z" />
  </svg>
);

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M6.8 8.9H3.1V21h3.7V8.9ZM5 7.3a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM21 14.3c0-3.6-1.9-5.6-4.8-5.6a4 4 0 0 0-3.6 2V8.9H9V21h3.7v-6.1c0-1.6.8-2.7 2.3-2.7 1.4 0 2.2 1 2.2 2.7V21H21v-6.7Z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M7.5 2.8h9A4.7 4.7 0 0 1 21.2 7.5v9a4.7 4.7 0 0 1-4.7 4.7h-9a4.7 4.7 0 0 1-4.7-4.7v-9a4.7 4.7 0 0 1 4.7-4.7Zm0 2A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Z"
      fillRule="evenodd"
    />
    <path d="M12 7.3A4.7 4.7 0 1 1 12 16.7 4.7 4.7 0 0 1 12 7.3Zm0 2A2.7 2.7 0 1 0 12 14.7 2.7 2.7 0 0 0 12 9.3ZM17.1 7.4a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z" />
  </svg>
);

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@joemkhitaryan", icon: YouTubeIcon },
  { label: "Facebook", href: "https://www.facebook.com/joemkhitaryan", icon: FacebookIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joemkhitaryan/", icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/jmkhitaryan/", icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/", icon: Music },
];

export function Header() {
  const pathname = usePathname();
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

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
    document.body.classList.toggle("menuIsOpen", isMenuOpen || isContactOpen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsContactOpen(false);
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
  }, [isMenuOpen, isContactOpen]);

  const openContactSidebar = () => {
    setIsMenuOpen(false);
    setIsContactOpen(true);
  };

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
        <button
          className="headerButton headerButtonGhost"
          type="button"
          onClick={openContactSidebar}
        >
          Contact us
        </button>
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
          <button
            className="headerButton headerButtonGhost"
            type="button"
            onClick={openContactSidebar}
          >
            Contact us
          </button>
          <Link className="headerButton headerButtonPrimary" href="/programs">
            Subscribe
          </Link>
        </div>
      </div>
      {isContactOpen ? (
        <>
          <div
            className="contactSidebarBackdrop"
            aria-hidden="true"
            onClick={() => setIsContactOpen(false)}
          />
          <aside
            className="contactSidebar open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-sidebar-title"
          >
            <div className="contactSidebarHeader">
              <h2 id="contact-sidebar-title">Contact Us</h2>
              <button
                className="contactSidebarClose"
                type="button"
                aria-label="Close contact sidebar"
                onClick={() => setIsContactOpen(false)}
              >
                <X size={22} strokeWidth={2.4} />
              </button>
            </div>
            <div className="contactSidebarBody">
              <div className="contactSidebarIntro">
                <p className="contactSidebarEyebrow">Build with Joe</p>
                <h3>Think deeper. Move smarter. Build stronger.</h3>
                <p>
                  For podcast conversations, interviews, media, partnerships,
                  speaking, or business opportunities, connect with the Joe
                  Mkhitaryan platform.
                </p>
              </div>

              <div className="contactSidebarTopics" aria-label="Contact topics">
                <span>Podcast inquiries</span>
                <span>Collaborations</span>
                <span>Media</span>
                <span>Speaking</span>
                <span>Business</span>
                <span>Education</span>
              </div>

              <div className="contactSocialBlock">
                <p>Follow and reach out through social channels.</p>
                <div className="contactSocialLinks">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        className="contactSocialLink"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        key={item.label}
                      >
                        <Icon size={20} strokeWidth={2.2} />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </header>
  );
}
