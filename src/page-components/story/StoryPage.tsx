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
    title: "Founders and builders",
    text: "Conversations with people who know what it means to carry risk, make decisions, and keep moving when the outcome is still uncertain.",
  },
  {
    title: "Practical lessons",
    text: "The podcast looks for usable insight: how leaders think, how teams grow, how pressure is handled, and what can be learned from the real work.",
  },
  {
    title: "Purpose-led business",
    text: "Joe brings business back to the human layer: faith, family, community, service, and the responsibility to build something that matters.",
  },
];

const storyHealthcarePrinciples = [
  {
    label: "Access",
    title: "Care begins with getting there",
    text: "Medical transportation is often the first step in care. General Medical is built around helping patients move safely, reliably, and with dignity.",
  },
  {
    label: "Response",
    title: "Operations under pressure",
    text: "Ambulance and transport work demands clear systems, trained teams, and decisions that hold up when timing matters.",
  },
  {
    label: "Trust",
    title: "Support beyond the ride",
    text: "The mission extends past logistics: patients, families, facilities, and care teams all need consistency they can count on.",
  },
];

const storyJourneyItems = [
  {
    year: "1983",
    title: "Born in Armenia",
    text: "Joe’s story begins in Armenia, with roots that continue to shape his identity, faith, family values, and sense of community.",
  },
  {
    year: "Early years",
    title: "Shaped across cultures",
    text: "Part of his youth was spent in Russia before life moved him toward the United States, giving him a wider view of people, pressure, and opportunity.",
  },
  {
    year: "Education",
    title: "Woodbury University",
    text: "In Burbank, Joe studied Business Management and Administration, then continued with a master’s in Organizational Leadership.",
  },
  {
    year: "2010",
    title: "General Medical",
    text: "He began leading General Medical in Southern California, building around medical transportation, ambulance services, and patient care.",
  },
  {
    year: "Today",
    title: "Social Venture Podcast",
    text: "Joe brings entrepreneurs, builders, and leaders into conversations about business, purpose, community, and the responsibility behind growth.",
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
            Serial entrepreneur, healthcare innovator, investor, and host of
            the Social Venture Podcast. Born in Armenia, shaped across Russia
            and the United States, Joe builds ventures where business,
            community, and purpose meet.
          </p>
        </div>
      </section>
      <section className="storyInfoOne">
        <div className="storyInfoOneContent">
          <div className="storyInfoIntro">
            <p className="storyInfoEyebrow">About Joe</p>
            <h2>A life shaped by movement, work, and purpose.</h2>
          </div>

          <div className="storyInfoBody">
            <p>
              Gagik “Joe” Mkhitaryan was born in Armenia in 1983, spent part of
              his youth in Russia, and later moved to the United States. Today,
              he is known as a serial entrepreneur, healthcare innovator,
              investor, and host of the Social Venture Podcast.
            </p>
            <p>
              He studied at Woodbury University in Burbank, earning a degree in
              Business Management and Administration, followed by a master’s in
              Organizational Leadership. Since 2010, Joe has led General Medical
              in Southern California, building work around medical
              transportation, ambulance services, and patient care.
            </p>
            <p>
              Beyond business, Joe is a father of three, fluent in English,
              Russian, and Armenian, and remains connected to faith, community,
              and the idea that strong ventures should create meaningful social
              value.
            </p>

            <div className="storyInfoFacts">
              <div>
                <span>Born</span>
                <strong>Armenia, 1983</strong>
              </div>
              <div>
                <span>Education</span>
                <strong>Woodbury University</strong>
              </div>
              <div>
                <span>Current work</span>
                <strong>CEO & Co-Founder, General Medical</strong>
              </div>
              <div>
                <span>Languages</span>
                <strong>English, Russian, Armenian</strong>
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
            <h2>Building systems around care, access, and trust.</h2>
            <p className="storyBusinessLead">
              Joe’s work in healthcare grew from a practical belief: the best
              companies solve hard human problems with discipline, speed, and
              responsibility.
            </p>
            <p className="storyBusinessText">
              Through General Medical, he helped shape services around medical
              transportation, ambulance operations, and patient support. That
              operating experience now informs how he invests, mentors, and
              leads conversations with entrepreneurs on the Social Venture
              Podcast.
            </p>

            <div className="storyBusinessPillars">
              <article>
                <span>01</span>
                <h3>Healthcare operations</h3>
                <p>
                  Building reliable care logistics for people who need safe,
                  timely medical transportation.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Entrepreneurial discipline</h3>
                <p>
                  Turning pressure, risk, and fast decisions into systems that
                  can keep serving beyond one moment.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Social venture voice</h3>
                <p>
                  Hosting conversations about purpose-led growth, leadership,
                  family, faith, and community value.
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
              General Medical / Healthcare Mission
            </p>
            <h2>Healthcare is a system of trust before it is a business.</h2>
          </div>

          <div className="storyHealthcareBody">
            <p className="storyHealthcareLead">
              Since 2010, Joe’s work with General Medical has centered on a
              practical healthcare need in Southern California: helping people
              reach care through dependable medical transportation, ambulance
              services, and patient-centered support.
            </p>

            <div className="storyHealthcareStatement">
              <span>Mission</span>
              <p>
                Build healthcare operations that treat movement, timing, safety,
                and communication as part of the care experience.
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
            <h2>From Armenia to building ventures in Southern California.</h2>
            <p>
              The story is not one straight line. It is movement, education,
              responsibility, family, and the steady work of turning experience
              into something useful for others.
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
            <h2>Real conversations for people building with purpose.</h2>
            <p>
              Social Venture Podcast is where Joe brings the same operating
              mindset into conversation: honest questions, practical lessons,
              and a deeper look at why people build.
            </p>
          </div>

          <div className="storyPodcastPanel">
            <p className="storyPodcastStatement">
              The goal is not only to talk about success. It is to understand
              the pressure behind leadership, the values behind growth, and the
              human story behind every venture.
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
