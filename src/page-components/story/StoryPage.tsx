"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";
import ReactPlayer from "react-player";
import joeImage from "@/Images/Joe.webp";
import "./storyPage.scss";

const storyHeroVideoSrc = "/videos/storyVideo.mp4";

const storyPodcastPrinciples = [
  {
    title: "Substance over image",
    text: "The conversations are built for people who want real lessons, honest perspective, and ideas that last longer than a moment of motivation.",
  },
  {
    title: "Calculated risk",
    text: "Joe speaks to builders who understand that meaningful growth requires courage, preparation, patience, and the discipline to think clearly.",
  },
  {
    title: "Perspective through dialogue",
    text: "Growth requires hard questions, different viewpoints, respectful debate, and the willingness to ask before opportunity passes by.",
  },
];

const storyHealthcarePrinciples = [
  {
    label: "Pressure",
    title: "The unfiltered version of business",
    text: "Before the media platform, Joe learned through long hours, difficult decisions, operations, negotiation, setbacks, and responsibility.",
  },
  {
    label: "Systems",
    title: "Healthcare transportation as real work",
    text: "Building in healthcare transportation taught Joe that leadership is measured by execution, trust, timing, and the people depending on the system.",
  },
  {
    label: "Lessons",
    title: "Experience became the foundation",
    text: "The lessons from business, family, relationships, and adversity became the foundation for content that helps others build stronger lives.",
  },
];

const storyJourneyItems = [
  {
    year: "Origin",
    title: "Born in Armenia",
    text: "Joe’s story did not begin in a studio, on social media, or with a podcast. It began through immigration, adaptation, sacrifice, and the pursuit of opportunity.",
  },
  {
    year: "Los Angeles",
    title: "Raised between worlds",
    text: "Born in Armenia and eventually growing up in Los Angeles, Joe learned how to rebuild, adjust, and navigate uncertainty from an early age.",
  },
  {
    year: "Business",
    title: "Companies before content",
    text: "Long before content creation became part of the vision, Joe built companies in healthcare transportation and related industries.",
  },
  {
    year: "Lessons",
    title: "Pressure became perspective",
    text: "Leadership, operations, negotiation, growth, setbacks, and responsibility shaped the way Joe thinks about risk, discipline, and execution.",
  },
  {
    year: "Today",
    title: "Social Venture Podcast and beyond",
    text: "Through podcast conversations, videos, interviews, reflections, and storytelling, Joe shares ideas that help people think deeper, move smarter, and build stronger.",
  },
];

export function StoryPage() {
  const storyHeroVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const video = storyHeroVideoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playbackRate = 0.72;

    const playVideo = () => {
      video.playbackRate = 0.72;
      void video.play().catch(() => undefined);
    };

    playVideo();
    window.addEventListener("pageshow", playVideo);

    return () => {
      window.removeEventListener("pageshow", playVideo);
    };
  }, []);

  useEffect(() => {
    if (!isVideoOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  const openVideo = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsVideoOpen(true);
  };

  return (
    <main className="screenPage">
      <section className="storyHeroWrapper">
        <div className="storyHeroVideoLayer" aria-hidden="true">
          <video
            ref={storyHeroVideoRef}
            className="storyHeroVideo"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            onCanPlay={() => {
              if (storyHeroVideoRef.current) {
                storyHeroVideoRef.current.playbackRate = 0.72;
              }
            }}
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
          >
            <source src={storyHeroVideoSrc} type="video/mp4" />
          </video>
        </div>
        <div className="storyHeroContent">
          <a
            className="storyHeroPlay"
            href={storyHeroVideoSrc}
            target="_blank"
            rel="noreferrer"
            onClick={openVideo}
            aria-label="Play Joe Mkhitaryan story video"
          >
            <Play size={34} fill="currentColor" strokeWidth={0} />
          </a>
          <p className="storyHeroEyebrow">The story of Joe Mkhitaryan</p>
          <h1>Gagik “Joe” Mkhitaryan</h1>
          <p className="storyHeroText">
            Born in Armenia and eventually raised in Los Angeles, Joe built his
            perspective through immigration, adaptation, business, pressure, and
            the pursuit of opportunity before the podcast ever began.
          </p>
        </div>
      </section>
      <section className="storyInfoOne">
        <div className="storyInfoOneContent">
          <div className="storyInfoIntro">
            <p className="storyInfoEyebrow">About Joe</p>
            <h2>A life shaped by movement, discipline, and perspective.</h2>
          </div>

          <div className="storyInfoBody">
            <p>
              Joe Mkhitaryan’s story did not begin in a studio, on social
              media, or with a podcast. It began through immigration,
              adaptation, sacrifice, and the pursuit of opportunity.
            </p>
            <p>
              Born in Armenia and eventually growing up in Los Angeles, Joe
              experienced firsthand what it means to rebuild, adjust, and learn
              how to navigate uncertainty. Those experiences shaped the
              foundation of his mindset: resilience, calculated risk,
              discipline, and perspective.
            </p>
            <p>
              Long before content creation became part of the vision, the focus
              was business. Joe built companies in healthcare transportation and
              related industries, learning the realities of leadership,
              operations, negotiation, growth, setbacks, and responsibility.
            </p>

            <div className="storyInfoFacts">
              <div>
                <span>Origin</span>
                <strong>Born in Armenia</strong>
              </div>
              <div>
                <span>Shaped in</span>
                <strong>Los Angeles</strong>
              </div>
              <div>
                <span>Business roots</span>
                <strong>Healthcare transportation</strong>
              </div>
              <div>
                <span>Philosophy</span>
                <strong>Life in Moderation</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theStoryBusinessSection">
        <div className="storyBusinessContent">
          <div className="storyBusinessMedia">
            <Image
              className="storyBusinessPortrait"
              src={joeImage}
              alt="Joe Mkhitaryan"
              sizes="(max-width: 820px) 92vw, (max-width: 1180px) 42vw, 500px"
            />
            <div className="storyBusinessStats" aria-label="Joe business facts">
              <div>
                <span>Since</span>
                <strong>2010</strong>
              </div>
              <div>
                <span>Built in</span>
                <strong>Southern California</strong>
              </div>
            </div>
          </div>

          <div className="storyBusinessCopy">
            <p className="storyBusinessEyebrow">Business & impact</p>
            <h2>Business came before the microphone.</h2>
            <p className="storyBusinessLead">
              While much of the internet glamorized entrepreneurship, Joe was
              living the unfiltered version of it: long hours, pressure,
              difficult decisions, and the constant challenge of building
              something sustainable.
            </p>
            <p className="storyBusinessText">
              Over time, Joe realized that the lessons learned through business,
              leadership, family, friends, relationships, and adversity carried
              value beyond the companies themselves. Those conversations and
              experiences became the foundation for a larger mission.
            </p>

            <div className="storyBusinessPillars">
              <article>
                <span>01</span>
                <h3>Calculated risk</h3>
                <p>
                  Risk is part of every meaningful life, but it should be
                  measured, thought through, and backed by preparation.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Operator mindset</h3>
                <p>
                  Calm decision-making, emotional control, long-term strategy,
                  and problem solving under pressure guide the work.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Legacy over attention</h3>
                <p>
                  The goal is not temporary popularity. It is building a name,
                  philosophy, reputation, and body of work that carries meaning.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="storyHealthcareSection">
        <div className="storyHealthcareContent">
          <div className="storyHealthcareHeader">
            <p className="storyHealthcareEyebrow">
              Business foundation
            </p>
            <h2>Real lessons from real operations.</h2>
          </div>

          <div className="storyHealthcareBody">
            <p className="storyHealthcareLead">
              Joe’s business experience in healthcare transportation and related
              industries taught him that entrepreneurship is not a performance.
              It is responsibility, execution, relationships, pressure, and the
              discipline to keep building when life gets difficult.
            </p>

            <div className="storyHealthcareStatement">
              <span>Foundation</span>
              <p>
                The experiences that shaped Joe’s companies also shaped the
                platform: real business, real lessons, real conversations, and a
                mindset built on purpose, patience, and discipline.
              </p>
            </div>

            <div className="storyHealthcarePrinciples">
              {storyHealthcarePrinciples.map((principle) => (
                <article key={principle.title}>
                  <span>{principle.label}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="storyJourneySection">
        <div className="storyJourneyContent">
          <div className="storyJourneyHeader">
            <p className="storyJourneyEyebrow">Journey</p>
            <h2>From Armenia to a platform built around growth.</h2>
            <p>
              This is not a movement built around perfection. It is built around
              growth, ownership, perspective, and the belief that if you never
              ask, you will never find out.
            </p>
          </div>

          <ol className="storyJourneyTimeline">
            {storyJourneyItems.map((item) => (
              <li className="storyJourneyItem" key={`${item.year}-${item.title}`}>
                <span className="storyJourneyYear">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="storyPodcastSection">
        <div className="storyPodcastContent">
          <div className="storyPodcastIntro">
            <p className="storyPodcastEyebrow">Podcast Philosophy</p>
            <h2>Ideas that stay with people after the content ends.</h2>
            <p>
              Through podcast conversations, videos, interviews, reflections,
              and storytelling, Joe explores the ideas that shape business,
              leadership, family, ambition, risk, legacy, and personal
              development.
            </p>
          </div>

          <div className="storyPodcastPanel">
            <p className="storyPodcastStatement">
              The goal is not simply to entertain people for a moment. The goal
              is to create ideas and frameworks that help people think deeper,
              move smarter, and build stronger lives.
            </p>

            <div className="storyPodcastPrinciples">
              {storyPodcastPrinciples.map((principle) => (
                <article key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>

            <Link className="storyPodcastLink" href="/podcasts">
              <Play size={16} fill="currentColor" strokeWidth={0} />
              <span>Listen to the podcast</span>
            </Link>
          </div>
        </div>
      </section>
      {isVideoOpen ? (
        <div
          className="storyHeroOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Joe Mkhitaryan story video"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="storyHeroOverlayInner"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="storyHeroClose"
              type="button"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close story video"
            >
              <X size={22} strokeWidth={2} />
            </button>
            <ReactPlayer
              className="storyHeroFullVideo"
              src={storyHeroVideoSrc}
              playing
              controls
              playsInline
              width="100%"
              height="100%"
              preload="auto"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
