"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  Volume2,
  X,
} from "lucide-react";
import ReactPlayer from "react-player";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import podcastImage1 from "@/Images/podMicr1.webp";
import podcastImage2 from "@/Images/podMicr2.webp";
import podcastImage3 from "@/Images/podMicr3.webp";
import podcastImage4 from "@/Images/podMicr4.webp";
import "swiper/css";
import "./PodcastsPage.scss";

type PodcastShort = {
  id: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  thumbnailSrc: string;
};

type PodcastAudioTrack = {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  audioSrc: string;
};

const podcastCards = [
  {
    label: "Guide",
    title: "How to make podcast easy",
    text: "Manage ideas, guests, recordings, and releases with a clean weekly rhythm.",
    image: podcastImage1,
    className: "podcastNewsCardFeatured",
  },
  {
    label: "New episode",
    title: "Studio talks that move fast",
    text: "Fresh conversations, sharp business lessons, and direct stories from Joe's guests.",
    image: podcastImage2,
    className: "podcastNewsCardWide",
  },
  {
    label: "Voice",
    title: "Build your voice on air",
    text: "Turn pressure, purpose, and practical moves into episodes people remember.",
    image: podcastImage3,
    className: "podcastNewsCardTall",
  },
  {
    label: "Latest",
    title: "Listen to the latest drop",
    text: "Catch the newest episode and follow the moments that shape the week.",
    image: podcastImage4,
    className: "podcastNewsCardCompact",
  },
];

const basePodcastShorts = [
  {
    videoSrc: "https://youtube.com/shorts/jYptVOFUCrk?si=gvJdPposyJa0VaJZ",
    subtitle: "Mindset reset",
  },
  {
    videoSrc: "https://youtube.com/shorts/q28cql1TNRM?si=TErxZADo5WNF3H5_",
    subtitle: "Business move",
  },
  {
    videoSrc: "https://youtube.com/shorts/cQ0zGhbax68?si=TjiGPBoWwH9rH4mj",
    subtitle: "Real story",
  },
  {
    videoSrc: "https://youtube.com/shorts/QzXqMWmdIsY?si=JbLdPgr64bzpnhvi",
    subtitle: "Daily habit",
  },
  {
    videoSrc: "https://youtube.com/shorts/H4M6ZJF7Qq4?si=2bqbSpKax0SrTVGU",
    subtitle: "Leadership clip",
  },
  {
    videoSrc: "https://youtube.com/shorts/m_8BAhWLMEw?si=y4ixoEijD44OGtX3",
    subtitle: "Energy shift",
  },
  {
    videoSrc: "https://youtube.com/shorts/5WM2Cs-6BHI?si=QrpQSFBVZH2BzvxD",
    subtitle: "Focus point",
  },
];

const shortTitles = [
  "One clear move",
  "Pressure into purpose",
  "The founder pause",
  "Better daily rhythm",
  "Lead with calm",
  "Energy before output",
  "Protect your focus",
  "Build sharper habits",
  "Talk less, move more",
  "Reset the room",
  "The honest answer",
  "Make the next call",
  "Small wins compound",
  "Train your attention",
  "Use the hard moment",
  "Ask a cleaner question",
  "Find the real blocker",
  "Choose the useful risk",
  "Keep the promise",
  "Turn noise into signal",
  "Decide with less drama",
  "Make discipline visible",
  "Hold the standard",
  "Move through doubt",
  "Ship the first version",
  "Protect the morning",
  "Listen for the lesson",
  "Own the hard feedback",
  "Make room for clarity",
  "Finish the week strong",
];

const initialVisibleShorts = 8;
const shortsPerReveal = 8;
const initialVisibleAudioTracks = 8;
const audioTracksPerReveal = 8;

const audioTrackTitles = [
  "A calm start before the big decision",
  "How Joe reads pressure in business",
  "The one habit that protects focus",
  "When the room gets uncertain",
  "A better way to reset your week",
  "Why discipline needs a real calendar",
  "The founder conversation nobody wants",
  "Small signals before a big move",
  "Protecting energy while building fast",
  "The question behind better leadership",
  "What momentum sounds like",
  "A practical note on risk",
  "Turning feedback into cleaner action",
  "How to slow down without stopping",
  "The story behind the next version",
  "Choosing the work that deserves you",
  "A short lesson on accountability",
  "Making clarity part of the process",
  "When ambition needs structure",
  "Finish strong without burning out",
];

const audioCategories = [
  "Mindset",
  "Business",
  "Focus",
  "Leadership",
  "Reset",
  "Discipline",
  "Founder note",
  "Strategy",
  "Energy",
  "Conversation",
];

const podcastAudioTracks: PodcastAudioTrack[] = audioTrackTitles.map((title, index) => {
  const songNumber = (index % 16) + 1;

  return {
    id: `podcast-audio-${index + 1}`,
    title,
    description:
      "A compact audio note from Joe's podcast world, ready to be replaced by backend media.",
    category: audioCategories[index % audioCategories.length],
    duration: `${Math.floor(4 + index / 3)}:${String(18 + ((index * 7) % 40)).padStart(2, "0")}`,
    audioSrc: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${songNumber}.mp3`,
  };
});

function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function getYouTubeVideoId(videoSrc: string) {
  const match = videoSrc.match(
    /(?:shorts\/|youtu\.be\/|watch\?v=|embed\/)([A-Za-z0-9_-]{6,})/,
  );

  return match?.[1] ?? "";
}

function getYouTubeEmbedSrc(videoSrc: string, isMuted = true) {
  const videoId = getYouTubeVideoId(videoSrc);

  if (!videoId) {
    return videoSrc;
  }

  const params = new URLSearchParams({
    autoplay: "1",
    controls: "0",
    disablekb: "1",
    enablejsapi: "1",
    fs: "0",
    loop: "1",
    modestbranding: "1",
    playsinline: "1",
    playlist: videoId,
    rel: "0",
  });

  if (isMuted) {
    params.set("mute", "1");
  }

  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

const podcastShorts: PodcastShort[] = shortTitles.map((title, index) => {
  const short = basePodcastShorts[index % basePodcastShorts.length];
  const videoId = getYouTubeVideoId(short.videoSrc);

  return {
    id: `podcast-short-${index + 1}`,
    title,
    subtitle: short.subtitle,
    videoSrc: short.videoSrc,
    thumbnailSrc: videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : "",
  };
});

function getAdjacentPodcastShort(
  currentShort: PodcastShort | null,
  direction: 1 | -1,
) {
  if (!currentShort) {
    return currentShort;
  }

  const currentIndex = podcastShorts.findIndex(
    (short) => short.id === currentShort.id,
  );

  if (currentIndex === -1) {
    return currentShort;
  }

  const nextIndex =
    (currentIndex + direction + podcastShorts.length) % podcastShorts.length;

  return podcastShorts[nextIndex];
}

function PodcastShortCard({
  short,
  onOpen,
}: {
  short: PodcastShort;
  onOpen: () => void;
}) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <article className="podcastShortsCard">
      <div className="podcastShortsMedia">
        <div
          className="podcastShortsPlaceholder"
          style={
            short.thumbnailSrc
              ? ({
                  "--podcast-shorts-thumbnail": `url(${short.thumbnailSrc})`,
                } as React.CSSProperties)
              : undefined
          }
        >
          <Play size={22} fill="currentColor" strokeWidth={0} />
        </div>
        <ReactPlayer
          className={`podcastShortsVideo ${isVideoReady ? "isReady" : ""}`}
          src={short.videoSrc}
          playing
          muted
          loop
          playsInline
          controls={false}
          width="100%"
          height="100%"
          onReady={() => setIsVideoReady(true)}
          onStart={() => setIsVideoReady(true)}
        />
      </div>
      <button
        className="podcastShortsOpenButton"
        type="button"
        onClick={onOpen}
        aria-label={`Open ${short.title}`}
      />
      <div className="podcastShortsInfo">
        <p>{short.subtitle}</p>
        <h3>{short.title}</h3>
      </div>
    </article>
  );
}

export function PodcastsPage() {
  const shortIframeRef = useRef<HTMLIFrameElement>(null);
  const shouldAutoplayShortRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [visibleShortCount, setVisibleShortCount] = useState(initialVisibleShorts);
  const [visibleAudioCount, setVisibleAudioCount] = useState(initialVisibleAudioTracks);
  const [shortViewerSwiper, setShortViewerSwiper] = useState<SwiperType | null>(null);
  const [openShort, setOpenShort] = useState<PodcastShort | null>(null);
  const [isShortPlaying, setIsShortPlaying] = useState(false);
  const [isShortMuted, setIsShortMuted] = useState(true);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioSeekPercent, setAudioSeekPercent] = useState(0);

  const visibleShorts = podcastShorts.slice(0, visibleShortCount);
  const hasMoreShorts = visibleShortCount < podcastShorts.length;
  const visibleAudioTracks = podcastAudioTracks.slice(0, visibleAudioCount);
  const hasMoreAudioTracks = visibleAudioCount < podcastAudioTracks.length;
  const activeAudioTrack = podcastAudioTracks.find((track) => track.id === activeAudioId);

  const sendShortPlayerCommand = useCallback((command: string, args: unknown[] = []) => {
    shortIframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args,
      }),
      "*",
    );
  }, []);

  const playShortMuted = useCallback(() => {
    shouldAutoplayShortRef.current = true;
    setIsShortPlaying(true);
    setIsShortMuted(true);
    sendShortPlayerCommand("mute");
    sendShortPlayerCommand("playVideo");
    window.requestAnimationFrame(() => {
      sendShortPlayerCommand("mute");
      sendShortPlayerCommand("playVideo");
    });
    window.setTimeout(() => {
      sendShortPlayerCommand("mute");
      sendShortPlayerCommand("playVideo");
    }, 160);
  }, [sendShortPlayerCommand]);

  const playShortWithSound = useCallback(() => {
    shouldAutoplayShortRef.current = true;
    setIsShortPlaying(true);
    setIsShortMuted(false);
    sendShortPlayerCommand("unMute");
    sendShortPlayerCommand("setVolume", [100]);
    sendShortPlayerCommand("playVideo");
    window.requestAnimationFrame(() => {
      sendShortPlayerCommand("unMute");
      sendShortPlayerCommand("setVolume", [100]);
      sendShortPlayerCommand("playVideo");
    });
    window.setTimeout(() => {
      sendShortPlayerCommand("unMute");
      sendShortPlayerCommand("setVolume", [100]);
      sendShortPlayerCommand("playVideo");
    }, 220);
  }, [sendShortPlayerCommand]);

  const openPodcastShort = (short: PodcastShort) => {
    audioRef.current?.pause();
    setIsAudioPlaying(false);
    setOpenShort(short);
    playShortWithSound();
  };

  const closePodcastShort = useCallback(() => {
    setOpenShort(null);
    setShortViewerSwiper(null);
    shouldAutoplayShortRef.current = false;
    setIsShortPlaying(false);
    setIsShortMuted(true);
  }, [setIsShortMuted, setIsShortPlaying, setOpenShort, setShortViewerSwiper]);

  const toggleShortPlayback = () => {
    if (isShortMuted) {
      playShortWithSound();
      return;
    }

    if (isShortPlaying) {
      sendShortPlayerCommand("pauseVideo");
      setIsShortPlaying(false);
      return;
    }

    playShortWithSound();
  };

  const openPreviousShort = useCallback(() => {
    if (shortViewerSwiper) {
      shortViewerSwiper.slidePrev();
      return;
    }

    setOpenShort((currentShort) => getAdjacentPodcastShort(currentShort, -1));
    if (isShortMuted) {
      playShortMuted();
    } else {
      playShortWithSound();
    }
  }, [isShortMuted, playShortMuted, playShortWithSound, setOpenShort, shortViewerSwiper]);

  const openNextShort = useCallback(() => {
    if (shortViewerSwiper) {
      shortViewerSwiper.slideNext();
      return;
    }

    setOpenShort((currentShort) => getAdjacentPodcastShort(currentShort, 1));
    if (isShortMuted) {
      playShortMuted();
    } else {
      playShortWithSound();
    }
  }, [isShortMuted, playShortMuted, playShortWithSound, setOpenShort, shortViewerSwiper]);

  const showMoreShorts = () => {
    setVisibleShortCount((currentCount) =>
      Math.min(currentCount + shortsPerReveal, podcastShorts.length),
    );
  };

  const showMoreAudioTracks = () => {
    setVisibleAudioCount((currentCount) =>
      Math.min(currentCount + audioTracksPerReveal, podcastAudioTracks.length),
    );
  };

  const toggleAudioTrack = (track: PodcastAudioTrack) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (activeAudioId === track.id && isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
      return;
    }

    if (activeAudioId !== track.id) {
      audio.src = track.audioSrc;
      audio.currentTime = 0;
      setActiveAudioId(track.id);
      setAudioCurrentTime(0);
      setAudioDuration(0);
      setAudioSeekPercent(0);
    }

    void audio
      .play()
      .then(() => setIsAudioPlaying(true))
      .catch(() => setIsAudioPlaying(false));
  };

  const seekAudioBy = (seconds: number) => {
    const audio = audioRef.current;

    if (!audio || !activeAudioId) {
      return;
    }

    const duration = Number.isFinite(audio.duration) ? audio.duration : audioDuration;
    const unclampedTime = audio.currentTime + seconds;
    const nextTime =
      duration > 0
        ? Math.min(Math.max(unclampedTime, 0), duration)
        : Math.max(unclampedTime, 0);

    audio.currentTime = nextTime;
    setAudioCurrentTime(nextTime);
    setAudioSeekPercent(duration > 0 ? (nextTime / duration) * 100 : 0);
  };

  const seekAudioToPercent = (percentValue: string) => {
    const audio = audioRef.current;
    const nextPercent = Number(percentValue);

    if (!audio || !activeAudioId || Number.isNaN(nextPercent)) {
      return;
    }

    const nextClampedPercent = Math.min(Math.max(nextPercent, 0), 100);

    setAudioSeekPercent(nextClampedPercent);

    const duration = Number.isFinite(audio.duration) ? audio.duration : audioDuration;

    if (duration <= 0) {
      return;
    }

    const nextTime = (nextClampedPercent / 100) * duration;

    audio.currentTime = nextTime;
    setAudioCurrentTime(nextTime);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const updateCurrentTime = () => {
      setAudioCurrentTime(audio.currentTime);

      if (audio.duration > 0) {
        setAudioSeekPercent((audio.currentTime / audio.duration) * 100);
      }
    };

    const updateDuration = () => {
      if (audio.duration > 0) {
        setAudioDuration(audio.duration);
        setAudioSeekPercent((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsAudioPlaying(false);
      setAudioCurrentTime(0);
      setAudioSeekPercent(0);
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("canplay", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("canplay", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = openShort ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePodcastShort();
        return;
      }

      if (!openShort) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        openNextShort();
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        openPreviousShort();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePodcastShort, openNextShort, openPreviousShort, openShort]);

  const openShortIndex = openShort
    ? Math.max(
        podcastShorts.findIndex((short) => short.id === openShort.id),
        0,
      )
    : 0;

  return (
    <main className="screenPage">
      <section className="podcastHero">
        <div className="podcastWrapper">
          <div className="podcastNewsHeader">
            <div>
              <p className="podcastNewsEyebrow">Podcast journal</p>
              <h1>Best news of this week</h1>
            </div>
            <div className="podcastNewsIntro">
              <p>
                Joe&apos;s latest podcast moments, studio stories, and practical
                ideas gathered into one sharp weekly section.
              </p>
              <a href="#podcast-news" className="podcastNewsButton">
                Read more
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </a>
            </div>
          </div>

          <div className="podcastNewsGrid" id="podcast-news">
            {podcastCards.map((card) => (
              <article
                className={`podcastNewsCard ${card.className}`}
                key={card.title}
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 45vw"
                  className="podcastNewsImage"
                />
                <div className="podcastNewsOverlay">
                  <span>{card.label}</span>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="podcastShortsSection">
        <div className="podcastShortsWrapper">
          <div className="podcastShortsHeader">
            <div>
              <p className="podcastShortsEyebrow">Shorts</p>
              <h2>Short lessons for bigger moves.</h2>
            </div>
            <p>
              Quick clips from Joe&apos;s conversations, built for fast ideas,
              sharper decisions, and a cleaner reset between episodes.
            </p>
          </div>

          <div className="podcastShortsGrid">
            {visibleShorts.map((short) => (
              <PodcastShortCard
                short={short}
                onOpen={() => openPodcastShort(short)}
                key={short.id}
              />
            ))}
          </div>

          {hasMoreShorts ? (
            <div className="podcastShortsActions">
              <button
                className="podcastShortsShowMore"
                type="button"
                onClick={showMoreShorts}
              >
                Show more
                <ChevronDown size={18} strokeWidth={2.4} />
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="podcastAudioSection">
        <div className="podcastAudioWrapper">
          <div className="podcastAudioHeader">
            <div>
              <p className="podcastAudioEyebrow">Audio notes</p>
              <h2>Listen to the full rhythm.</h2>
            </div>
            <p>
              Twenty lightweight MP3 records with one shared player. Later this
              list can come straight from your backend without changing the UI.
            </p>
          </div>

          {activeAudioTrack ? (
            <div className="podcastAudioNowPlaying">
              <span>Now playing</span>
              <p>{activeAudioTrack.title}</p>
            </div>
          ) : null}

          <div className="podcastAudioList">
            {visibleAudioTracks.map((track, index) => {
              const isActiveTrack = activeAudioId === track.id;
              const displayDuration =
                isActiveTrack && audioDuration > 0
                  ? `${formatAudioTime(audioCurrentTime)} / ${formatAudioTime(audioDuration)}`
                  : track.duration;

              return (
                <article
                  className={`podcastAudioCard${isActiveTrack ? " isActive" : ""}`}
                  key={track.id}
                >
                  <div className="podcastAudioIndex">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <button
                    className="podcastAudioPlayButton"
                    type="button"
                    onClick={() => toggleAudioTrack(track)}
                    aria-label={
                      isActiveTrack && isAudioPlaying
                        ? `Pause ${track.title}`
                        : `Play ${track.title}`
                    }
                  >
                    {isActiveTrack && isAudioPlaying ? (
                      <Pause size={18} fill="currentColor" strokeWidth={0} />
                    ) : (
                      <Play size={18} fill="currentColor" strokeWidth={0} />
                    )}
                  </button>
                  <div className="podcastAudioContent">
                    <div className="podcastAudioMeta">
                      <span>{track.category}</span>
                      <time>{displayDuration}</time>
                    </div>
                    <h3>{track.title}</h3>
                    <p>{track.description}</p>
                    <div className="podcastAudioControls">
                      <button
                        type="button"
                        onClick={() => seekAudioBy(-10)}
                        disabled={!isActiveTrack}
                      >
                        -10s
                      </button>
                      <label className="podcastAudioProgress">
                        <span className="podcastAudioProgressLabel">
                          Audio progress
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={isActiveTrack ? Math.min(audioSeekPercent, 100) : 0}
                          onChange={(event) => seekAudioToPercent(event.currentTarget.value)}
                          disabled={!isActiveTrack}
                          style={
                            {
                              "--audio-progress": `${
                                isActiveTrack ? Math.min(audioSeekPercent, 100) : 0
                              }%`,
                            } as React.CSSProperties
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => seekAudioBy(10)}
                        disabled={!isActiveTrack}
                      >
                        +10s
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {hasMoreAudioTracks ? (
            <div className="podcastAudioActions">
              <button
                className="podcastAudioShowMore"
                type="button"
                onClick={showMoreAudioTracks}
              >
                Show more
                <ChevronDown size={18} strokeWidth={2.4} />
              </button>
            </div>
          ) : null}

          <audio ref={audioRef} preload="metadata" />
        </div>
      </section>

      {openShort ? (
        <div
          className="podcastShortsOverlay"
          role="dialog"
          aria-modal="true"
          aria-label={openShort.title}
          onClick={closePodcastShort}
        >
          <button
            className="podcastShortsClose"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              closePodcastShort();
            }}
            aria-label="Close short video"
          >
            <X size={22} strokeWidth={2} />
          </button>
          <div className="podcastShortsViewer" onClick={(event) => event.stopPropagation()}>
            <div className="podcastShortsStage">
              <Swiper
                className="podcastShortsSwiper"
                direction="vertical"
                slidesPerView={1}
                speed={520}
                rewind
                initialSlide={openShortIndex}
                onSwiper={setShortViewerSwiper}
                onSlideChange={(swiper) => {
                  const nextShort = podcastShorts[swiper.activeIndex];

                  if (!nextShort) {
                    return;
                  }

                  setOpenShort(nextShort);
                  if (isShortMuted) {
                    playShortMuted();
                  } else {
                    playShortWithSound();
                  }
                  window.setTimeout(() => {
                    if (isShortMuted) {
                      sendShortPlayerCommand("mute");
                    } else {
                      sendShortPlayerCommand("unMute");
                      sendShortPlayerCommand("setVolume", [100]);
                    }
                    sendShortPlayerCommand("playVideo");
                  }, 120);
                }}
              >
                {podcastShorts.map((short) => (
                  <SwiperSlide className="podcastShortsSlide" key={short.id}>
                    <div
                      className={`podcastShortsViewerInner${
                        openShort.id === short.id && !isShortPlaying ? " isPaused" : ""
                      }${
                        openShort.id === short.id && isShortMuted ? " isMuted" : ""
                      }`}
                    >
                      {openShort.id === short.id && isShortPlaying ? (
                        <iframe
                          ref={shortIframeRef}
                          key={`${short.id}-${isShortMuted ? "muted" : "sound"}`}
                          className="podcastShortsFullscreenPlayer"
                          src={getYouTubeEmbedSrc(short.videoSrc, isShortMuted)}
                          title={short.title}
                          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                          onLoad={() => {
                            if (!shouldAutoplayShortRef.current) {
                              return;
                            }

                            if (isShortMuted) {
                              sendShortPlayerCommand("mute");
                            } else {
                              sendShortPlayerCommand("unMute");
                              sendShortPlayerCommand("setVolume", [100]);
                            }
                            sendShortPlayerCommand("playVideo");
                            window.setTimeout(() => {
                              if (isShortMuted) {
                                sendShortPlayerCommand("mute");
                              } else {
                                sendShortPlayerCommand("unMute");
                                sendShortPlayerCommand("setVolume", [100]);
                              }
                              sendShortPlayerCommand("playVideo");
                            }, 220);
                          }}
                        />
                      ) : (
                        <div
                          className="podcastShortsInactivePoster"
                          style={
                            short.thumbnailSrc
                              ? ({
                                  "--podcast-shorts-active-thumbnail": `url(${short.thumbnailSrc})`,
                                } as React.CSSProperties)
                              : undefined
                          }
                        />
                      )}
                      <button
                        className="podcastShortsPlaybackLayer"
                        type="button"
                        onClick={toggleShortPlayback}
                        aria-label={
                          openShort.id === short.id && isShortPlaying
                            ? "Pause short video"
                            : "Play short video"
                        }
                      >
                        <span>
                          {openShort.id === short.id && isShortPlaying ? (
                            isShortMuted ? (
                              <Volume2 size={34} strokeWidth={2} />
                            ) : (
                              <Pause size={34} fill="currentColor" strokeWidth={0} />
                            )
                          ) : (
                            <Play size={34} fill="currentColor" strokeWidth={0} />
                          )}
                        </span>
                      </button>
                      <div className="podcastShortsViewerMeta">
                        <p>{short.subtitle}</p>
                        <h3>{short.title}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="podcastShortsControls" aria-label="Shorts navigation">
              <button
                className="podcastShortsControl"
                type="button"
                onClick={openPreviousShort}
                aria-label="Previous short"
              >
                <ChevronUp size={24} strokeWidth={2} />
              </button>
              <button
                className="podcastShortsControl"
                type="button"
                onClick={openNextShort}
                aria-label="Next short"
              >
                <ChevronDown size={24} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
