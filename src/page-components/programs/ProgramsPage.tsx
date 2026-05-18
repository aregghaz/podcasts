"use client";

import "../screen.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Award,
  Brain,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  HeartHandshake,
  Play,
  ShieldCheck,
  X,
} from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import accountabilityImage from "@/Images/Accountability.webp";
import businessImage from "@/Images/Business.webp";
import clarityImage from "@/Images/Clarity.webp";
import disciplineImage from "@/Images/Discipline.webp";
import focusImage from "@/Images/focus.webp";
import growthImage from "@/Images/Growth.webp";
import leadershipImage from "@/Images/Leadership.webp";
import mindsetImage from "@/Images/Mindset.webp";
import purposeImage from "@/Images/Purpose.webp";
import programsImage from "@/Images/programs.webp";
import "swiper/css";
import "./programsPage.scss";

const progressAreas = [
  {
    icon: Award,
    title: "Turn ambition into discipline",
    text: "Build the structure to pursue more without losing your values, focus, or self-control.",
  },
  {
    icon: HeartHandshake,
    title: "Use relationships as leverage",
    text: "Strengthen reputation, trust, communication, and the network that helps serious builders grow.",
  },
  {
    icon: Brain,
    title: "Think clearly under pressure",
    text: "Use Joe's questions and stories to separate fear, ego, noise, and opportunity before you act.",
  },
  {
    icon: Activity,
    title: "Practice life in moderation",
    text: "Create habits that support ambition without self-destruction, confidence without arrogance, and success without emptiness.",
  },
  {
    icon: ShieldCheck,
    title: "Risk it intelligently",
    text: "Think through risk, preparation, timing, and execution with the practical lens Joe brings to business.",
  },
  {
    icon: Compass,
    title: "Build toward legacy",
    text: "Connect your work to a direction, reputation, family, philosophy, and body of work that can last.",
  },
];

const insightCards = [
  {
    label: "Mindset",
    title: "The operator mindset behind calm decisions",
    text: "A practical way to solve problems under pressure without letting emotion lead the room.",
    image: mindsetImage,
  },
  {
    label: "Business",
    title: "There is no bad business, only bad execution",
    text: "Joe's business lens keeps coming back to leadership, model, customer, market, and discipline.",
    image: businessImage,
  },
  {
    label: "Discipline",
    title: "Life in moderation is strength",
    text: "Ambition works better when it is guided by rhythm, restraint, values, and self-control.",
    image: disciplineImage,
  },
  {
    label: "Leadership",
    title: "Leadership begins with self-control",
    text: "Before you lead a company, family, or movement, you have to lead your own emotions and decisions.",
    image: leadershipImage,
  },
  {
    label: "Purpose",
    title: "Success is control, not just status",
    text: "Use Joe's program prompts to reconnect ambition with time, choices, direction, and values.",
    image: purposeImage,
  },
  {
    label: "Accountability",
    title: "Relationships compound faster than money",
    text: "The right people help you see blind spots, open doors, and commit to stronger decisions.",
    image: accountabilityImage,
  },
  {
    label: "Clarity",
    title: "Bring substance back to ambition",
    text: "Joe's framework keeps attention on clear thinking, principles, and the few moves that matter.",
    image: clarityImage,
  },
  {
    label: "Growth",
    title: "Build stronger from setbacks",
    text: "Progress gets easier when pressure, mistakes, and adversity become information instead of identity.",
    image: growthImage,
  },
  {
    label: "Focus",
    title: "Legacy over temporary attention",
    text: "A tighter rhythm gives meaningful work the space it needs to outlast noise and popularity.",
    image: focusImage,
  },
];

const programsVideoSrc = "/videos/programsVideo.mp4";

const faqItems = [
  {
    question: "What are Joe Mkhitaryan Programs?",
    answer:
      "They are focused paths built from Joe's philosophy around entrepreneurship, leadership, calculated risk, discipline, perspective, and legacy.",
  },
  {
    question: "Do I need to listen to the podcast before joining?",
    answer:
      "No. The podcast is a strong entry point, but the programs are designed to stand on their own with clear prompts, principles, and next steps.",
  },
  {
    question: "Who is this built for?",
    answer:
      "It is for entrepreneurs, founders, creators, leaders, students, professionals, and ambitious individuals who want to think better and build stronger.",
  },
  {
    question: "How much time should I set aside each week?",
    answer:
      "Start with one focused hour. The goal is not to consume more content, but to turn principles into decisions, habits, and visible progress.",
  },
  {
    question: "Will the programs help with business and personal growth?",
    answer:
      "Yes. The work connects both sides because stronger businesses usually require clearer habits, better relationships, calmer decisions, and stronger character.",
  },
  {
    question: "Can I use this with my team?",
    answer:
      "Yes. The topics work well for team conversations, founder check-ins, planning sessions, leadership development, and shared accountability.",
  },
  {
    question: "Where should I start if I am new to Joe?",
    answer:
      "Start with the podcast, then choose the program theme that matches your current season: calculated risk, moderation, leadership, relationships, clarity, or legacy.",
  },
];

export function ProgramsPage() {
  const [insightsSwiper, setInsightsSwiper] = useState<SwiperType | null>(null);
  const [canSlideInsightsPrev, setCanSlideInsightsPrev] = useState(false);
  const [canSlideInsightsNext, setCanSlideInsightsNext] = useState(true);
  const [isProgramsVideoOpen, setIsProgramsVideoOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isProgramsVideoOpen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProgramsVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProgramsVideoOpen]);

  const updateInsightsControls = (swiper: SwiperType) => {
    setCanSlideInsightsPrev(!swiper.isBeginning);
    setCanSlideInsightsNext(!swiper.isEnd);
  };

  const handleInsightsSwiper = (swiper: SwiperType) => {
    setInsightsSwiper(swiper);
    window.requestAnimationFrame(() => {
      swiper.update();
      updateInsightsControls(swiper);
    });
  };

  const slideInsightsPrev = () => {
    if (!insightsSwiper) {
      return;
    }

    insightsSwiper.update();
    insightsSwiper.slidePrev();
  };

  const slideInsightsNext = () => {
    if (!insightsSwiper) {
      return;
    }

    insightsSwiper.update();
    insightsSwiper.slideNext();
  };

  return (
    <main className="screenPage">
      <section className="programsPageHero">
        <div className="programsHeroWrapper">
          <div className="programsHeroContent">
            <p className="programsHeroEyebrow">Programs</p>
            <h1>Build character, companies, wisdom, and legacy.</h1>
            <p className="programsHeroText">
              Focused growth paths for entrepreneurs, leaders, and builders who
              want to think clearly, risk intelligently, lead responsibly, and
              build a life that means something.
            </p>

            <div className="programsHeroActions">
              <a href="#programs" className="programsHeroButton programsHeroButtonPrimary">
                Explore programs
              </a>
              <a href="/podcasts" className="programsHeroButton programsHeroButtonSecondary">
                Listen first
              </a>
            </div>
          </div>

          <div className="programsHeroMedia">
            <Image
              className="programsHeroImage"
              src={programsImage}
              alt="Business program session"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
            <div className="programsHeroStats" aria-label="Program highlights">
              <div>
                <span>Clear</span>
                <strong>Thinking</strong>
              </div>
              <div>
                <span>Smart</span>
                <strong>Risk</strong>
              </div>
              <div>
                <span>Lasting</span>
                <strong>Legacy</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="programsVideoWrapper">
        <div className="programsProgressContent">
          <div className="programsProgressHeader">
            <p className="programsProgressEyebrow">Build with Joe</p>
            <h2>Programs for the person behind the ambition.</h2>
            <p>
              The programs are built around the same principles Joe brings to
              the platform: calculated risk, moderation, self-control,
              relationships, clear thinking, and meaningful execution.
            </p>
          </div>

          <div className="programsProgressGrid">
            {progressAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article className="programsProgressItem" key={area.title}>
                  <span className="programsProgressIcon" aria-hidden="true">
                    <Icon size={26} strokeWidth={2.2} />
                  </span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="programsSliderWrapper" id="programs">
        <div className="programsFastTrack">
          <div className="programsFastTrackMedia" aria-hidden="true">
            <video autoPlay loop muted playsInline preload="metadata">
              <source src={programsVideoSrc} type="video/mp4" />
            </video>
          </div>
          <div className="programsFastTrackOverlay" />
          <div className="programsFastTrackContent">
            <p className="programsFastTrackEyebrow">Joe Inner Circle</p>
            <h2>Think clearly, move smarter, build stronger.</h2>
            <button
              className="programsFastTrackButton"
              type="button"
              onClick={() => setIsProgramsVideoOpen(true)}
            >
              <Play size={17} fill="currentColor" strokeWidth={2.4} />
              Watch video
            </button>
          </div>
        </div>

        <div className="programsInsightsShell">
          <div className="programsInsightsHeader">
            <div>
              <p className="programsInsightsEyebrow">Joe&apos;s playbook</p>
              <h2>Explore the principles</h2>
            </div>
            <a className="programsInsightsLink" href="/podcasts">
              Explore all
              <ArrowRight size={17} strokeWidth={2.4} />
            </a>
            <div className="programsInsightsControls">
              <button
                className="programsInsightsControl"
                type="button"
                aria-label="Previous field note"
                disabled={!canSlideInsightsPrev}
                onClick={slideInsightsPrev}
              >
                <ChevronLeft size={22} strokeWidth={2.4} />
              </button>
              <button
                className="programsInsightsControl"
                type="button"
                aria-label="Next field note"
                disabled={!canSlideInsightsNext}
                onClick={slideInsightsNext}
              >
                <ChevronRight size={22} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          <Swiper
            className="programsInsightsCarousel"
            slidesPerView="auto"
            spaceBetween={18}
            speed={620}
            grabCursor
            onSwiper={handleInsightsSwiper}
            onSlideChange={updateInsightsControls}
            onResize={updateInsightsControls}
          >
            {insightCards.map((card) => (
              <SwiperSlide className="programsInsightsSlide" key={card.title}>
                <article className="programsInsightCard">
                  <div className="programsInsightMedia">
                    <Image
                      className="programsInsightImage"
                      src={card.image}
                      alt={card.title}
                      sizes="(max-width: 640px) 88vw, (max-width: 980px) 74vw, 385px"
                    />
                  </div>
                  <div className="programsInsightBody">
                    <span>{card.label}</span>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="programsFaqSection">
        <div className="programsFaqContent">
          <div className="programsFaqIntro">
            <p className="programsFaqEyebrow">Frequently asked questions</p>
            <h2>FAQs</h2>
            <a className="programsFaqButton" href="/podcasts">
              Listen first
            </a>
          </div>

          <div className="programsFaqList">
            {faqItems.map((item) => (
              <details className="programsFaqItem" key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <ChevronDown size={22} strokeWidth={2.4} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {isProgramsVideoOpen ? (
        <div className="programsVideoOverlay" role="dialog" aria-modal="true">
          <div className="programsVideoOverlayInner">
            <button
              className="programsVideoClose"
              type="button"
              aria-label="Close video"
              onClick={() => setIsProgramsVideoOpen(false)}
            >
              <X size={24} strokeWidth={2.4} />
            </button>
            <video className="programsVideoFull" controls autoPlay playsInline>
              <source src={programsVideoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      ) : null}
    </main>
  );
}
