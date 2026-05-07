"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import ReactPlayer from "react-player";
import "./storyPage.scss";

const storyHeroVideoSrc = "/videos/storyVideo.mp4";

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
