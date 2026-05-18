import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Radio } from "lucide-react";
import "./Footer.scss";

const footerPages = [
  { href: "/", label: "Home" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/quiz", label: "Quiz" },
  { href: "/story", label: "The Story" },
  { href: "/programs", label: "Programs" },
];

const footerResources = [
  "New episodes",
  "Short lessons",
  "Growth sessions",
  "Listener updates",
];

const socialLinks = [
  {
    index: "1",
    title: "YouTube",
    link: "https://www.youtube.com/@joemkhitaryan"
  },
  {
    index: "2",
    title: "Instagram",
    link: "https://www.instagram.com/jmkhitaryan/"
  },
  {
    index: "3",
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/joemkhitaryan/"
  }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerMain">
          <div className="footerBrand">
            <Link className="footerLogoLink" href="/" aria-label="Go home">
              <Image
                className="footerLogo"
                src="/icons/logoIcon.svg"
                alt="Social Venture Podcast"
                width={944}
                height={912}
              />
            </Link>
            <p className="footerEyebrow">Social Venture Podcast</p>
            <h2>Conversations that turn pressure into direction.</h2>
            <p className="footerBrandText">
              Joe brings founders, builders, and sharp thinkers into practical
              conversations about mindset, business, and the next move.
            </p>
            <div className="footerActions">
              <Link className="footerButton footerButtonPrimary" href="/podcasts">
                <Radio size={18} strokeWidth={2} />
                <span>Listen now</span>
              </Link>
              <Link className="footerButton footerButtonGhost" href="/programs">
                <span>Explore programs</span>
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="footerNavArea">
            <nav className="footerColumn" aria-label="Footer navigation">
              <h3>Pages</h3>
              {footerPages.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="footerColumn">
              <h3>For listeners</h3>
              {footerResources.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="footerColumn">
              <h3>Follow</h3>
              {socialLinks.map((item) => (
                <a href={item.link} key={item.index} target="_blank">
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footerNewsletter">
          <div>
            <Mail size={20} strokeWidth={2} />
            <p>Get a short note when new episodes and programs go live.</p>
          </div>
          <Link href="/podcasts">
            Stay in the loop
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>

        <div className="footerBottom">
          <p>© 2026 Social Venture Podcast. All rights reserved.</p>
          <div>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
