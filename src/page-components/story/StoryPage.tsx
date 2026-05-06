"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import ReactPlayer from "react-player";
import "./storyPage.scss";

const storyHeroVideoSrc = "/videos/storyVideo.mp4";

export function StoryPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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

  return (
    <main className="screenPage">
      <section className="storyHeroWrapper">
        <div className="storyHeroVideoLayer" aria-hidden="true">
          <ReactPlayer
            className="storyHeroVideo"
            src={storyHeroVideoSrc}
            playing
            muted
            loop
            playsInline
            controls={false}
            playbackRate={0.72}
            width="100%"
            height="100%"
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
          />
        </div>
        <div className="storyHeroContent">
          <button
            className="storyHeroPlay"
            type="button"
            onClick={() => setIsVideoOpen(true)}
            aria-label="Play Joe Mkhitaryan story video"
          >
            <Play size={34} fill="currentColor" strokeWidth={0} />
          </button>
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
