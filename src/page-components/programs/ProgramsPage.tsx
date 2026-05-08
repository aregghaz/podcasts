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
    title: "Turn ambition into a plan",
    text: "Joe helps you take the big idea out of your head and shape it into a clear next move.",
  },
  {
    icon: HeartHandshake,
    title: "Build better relationships",
    text: "Strengthen how you communicate with partners, clients, teams, and the people closest to you.",
  },
  {
    icon: Brain,
    title: "Quiet the inner noise",
    text: "Use Joe's questions and stories to work through doubt, pressure, and fear before they slow you down.",
  },
  {
    icon: Activity,
    title: "Protect your energy",
    text: "Create habits that support clearer thinking, stronger execution, and a healthier daily rhythm.",
  },
  {
    icon: ShieldCheck,
    title: "Make smarter money moves",
    text: "Think through risk, opportunity, and discipline with the practical lens Joe brings to business.",
  },
  {
    icon: Compass,
    title: "Find your direction",
    text: "Connect your work to a purpose you can return to when the path gets loud or uncertain.",
  },
];

const insightCards = [
  {
    label: "Mindset",
    title: "The decision filter Joe uses before making a serious move",
    text: "A practical way to separate pressure from opportunity when everyone has an opinion.",
    image: mindsetImage,
  },
  {
    label: "Business",
    title: "How to turn one honest conversation into your next strategy",
    text: "Joe's best interviews keep coming back to clarity, accountability, and action.",
    image: businessImage,
  },
  {
    label: "Discipline",
    title: "Build momentum when motivation is already gone",
    text: "Small commitments, direct feedback, and the kind of structure that keeps you moving.",
    image: disciplineImage,
  },
  {
    label: "Leadership",
    title: "What strong founders do when the room gets uncertain",
    text: "Lead with calm, ask better questions, and make the next step visible for the team.",
    image: leadershipImage,
  },
  {
    label: "Purpose",
    title: "Find the work that deserves your full attention",
    text: "Use Joe's program prompts to reconnect ambition with a direction that actually fits.",
    image: purposeImage,
  },
  {
    label: "Accountability",
    title: "Why your next level needs people who challenge your thinking",
    text: "The right circle helps you see blind spots faster and commit to stronger decisions.",
    image: accountabilityImage,
  },
  {
    label: "Clarity",
    title: "Turn a loud season into a simple plan you can follow",
    text: "Joe's framework keeps attention on the few moves that create real progress.",
    image: clarityImage,
  },
  {
    label: "Growth",
    title: "Use every setback as better data for the next attempt",
    text: "Progress gets easier when mistakes become signals instead of stop signs.",
    image: growthImage,
  },
  {
    label: "Focus",
    title: "Protect your best hours from work that only feels urgent",
    text: "A tighter rhythm gives your biggest goals the space they actually need.",
    image: focusImage,
  },
];

const programsVideoSrc = "/videos/programsVideo.mp4";

const faqItems = [
  {
    question: "What is Joe Podcast Programs?",
    answer:
      "It is a focused path built from Joe's conversations around mindset, business, discipline, leadership, and practical execution.",
  },
  {
    question: "Do I need to listen to the podcast before joining?",
    answer:
      "No. The podcast is a great entry point, but the programs are designed to stand on their own with clear prompts, themes, and next steps.",
  },
  {
    question: "Who is this built for?",
    answer:
      "It is for founders, creators, team leaders, and ambitious listeners who want sharper thinking and a more consistent way to act on it.",
  },
  {
    question: "How much time should I set aside each week?",
    answer:
      "Start with one focused hour. The goal is not to consume more content, but to turn Joe's best ideas into decisions and visible progress.",
  },
  {
    question: "Will the programs help with business and personal growth?",
    answer:
      "Yes. The work connects both sides because stronger businesses usually need clearer habits, better relationships, and calmer decision-making.",
  },
  {
    question: "Can I use this with my team?",
    answer:
      "Yes. The topics work well for team conversations, founder check-ins, planning sessions, and shared accountability.",
  },
  {
    question: "Where should I start if I am new to Joe?",
    answer:
      "Start with the podcast, then use the programs page to choose the theme that matches your current season: clarity, discipline, leadership, or growth.",
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
            <h1>Build the next version of your business with sharper moves.</h1>
            <p className="programsHeroText">
              Focused growth sessions for founders, creators, and teams who want
              practical strategy, clear direction, and momentum that lasts.
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
                <span>Weekly</span>
                <strong>Strategy</strong>
              </div>
              <div>
                <span>Clear</span>
                <strong>Action Plans</strong>
              </div>
              <div>
                <span>Real</span>
                <strong>Execution</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="programsVideoWrapper">
        <div className="programsProgressContent">
          <div className="programsProgressHeader">
            <p className="programsProgressEyebrow">Growth with Joe</p>
            <h2>Progress in every area that shapes the person behind the work.</h2>
            <p>
              The programs are built around the same conversations Joe brings to
              the podcast: honest decisions, stronger discipline, better
              relationships, and business moves you can actually execute.
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
            <h2>Take the fast track to sustainable success.</h2>
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
              <p className="programsInsightsEyebrow">Joe's playbook</p>
              <h2>Explore field notes</h2>
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
              Start listening
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
