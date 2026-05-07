"use client";

import {
    type MouseEvent,
    type SyntheticEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowDown,
    ArrowRight,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Pause,
    Play,
    Volume2,
    X,
} from "lucide-react";
import type {Swiper as SwiperType} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import ReactPlayer from "react-player";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import "swiper/css";
import "./HomePage.scss";
import quizImage1 from "@/Images/quiz1.webp";
import quizImage2 from "@/Images/quiz2.webp";
import quizImage3 from "@/Images/quiz3.webp";
import quizImage4 from "@/Images/quiz4.webp";
import joeImage from "@/Images/Joe.webp";
import programs from "@/Images/programs.webp";

type PodcastShort = {
    id: string;
    title: string;
    subtitle: string;
    videoSrc?: string;
    thumbnailSrc?: string;
};

const podcastShorts: PodcastShort[] = [
    {
        id: "mindset",
        title: "Short video title",
        subtitle: "Mindset reset",
        videoSrc: "https://youtube.com/shorts/jYptVOFUCrk?si=gvJdPposyJa0VaJZ",
        thumbnailSrc: "https://img.youtube.com/vi/jYptVOFUCrk/hqdefault.jpg",
    },
    {
        id: "business",
        title: "Short video title",
        subtitle: "Business move",
        videoSrc: "https://youtube.com/shorts/q28cql1TNRM?si=TErxZADo5WNF3H5_",
        thumbnailSrc: "https://img.youtube.com/vi/q28cql1TNRM/hqdefault.jpg",
    },
    {
        id: "story",
        title: "Short video title",
        subtitle: "Real story",
        videoSrc: "https://youtube.com/shorts/cQ0zGhbax68?si=TjiGPBoWwH9rH4mj",
        thumbnailSrc: "https://img.youtube.com/vi/cQ0zGhbax68/hqdefault.jpg",
    },
    {
        id: "habits",
        title: "Short video title",
        subtitle: "Daily habit",
        videoSrc: "https://youtube.com/shorts/QzXqMWmdIsY?si=JbLdPgr64bzpnhvi",
        thumbnailSrc: "https://img.youtube.com/vi/QzXqMWmdIsY/hqdefault.jpg",
    },
    {
        id: "leadership",
        title: "Short video title",
        subtitle: "Leadership clip",
        videoSrc: "https://youtube.com/shorts/H4M6ZJF7Qq4?si=2bqbSpKax0SrTVGU",
        thumbnailSrc: "https://img.youtube.com/vi/H4M6ZJF7Qq4/hqdefault.jpg",
    },
    {
        id: "energy",
        title: "Short video title",
        subtitle: "Energy shift",
        videoSrc: "https://youtube.com/shorts/m_8BAhWLMEw?si=y4ixoEijD44OGtX3",
        thumbnailSrc: "https://img.youtube.com/vi/m_8BAhWLMEw/hqdefault.jpg",
    },
    {
        id: "focus",
        title: "Short video title",
        subtitle: "Focus point",
        videoSrc: "https://youtube.com/shorts/5WM2Cs-6BHI?si=QrpQSFBVZH2BzvxD",
        thumbnailSrc: "https://img.youtube.com/vi/5WM2Cs-6BHI/hqdefault.jpg",
    },
];

const quizCards = [
    {
        title: "What is your natural pace?",
        text: "Find out whether you move best through patience, pressure, or steady daily action.",
        image: quizImage1,
    },
    {
        title: "How do you read opportunity?",
        text: "Discover the lens you use when the next move is not obvious yet.",
        image: quizImage2,
    },
    {
        title: "What gives you momentum?",
        text: "See what pushes you forward when the path gets loud, risky, or unclear.",
        image: quizImage3,
    },
    {
        title: "Which road are you choosing?",
        text: "A quick check-in for direction, decisions, and the kind of challenge you are ready for.",
        image: quizImage4,
    },
];

const programCards = [
    {
        title: "Joe Podcast Circle",
        meta: "Weekly",
        description:
            "For listeners who want sharper ideas, practical stories, and steady momentum from every episode.",
        features: [
            "Curated podcast lessons from Joe's conversations",
            "Weekly mindset and business takeaways",
            "Short clips built for quick action",
            "Access to new episode drops and updates",
        ],
        action: "Explore podcast",
        href: "/podcasts",
    },
    {
        title: "Joe Growth Sessions",
        meta: "Program",
        description:
            "For builders who want a deeper path through decisions, direction, and real execution.",
        features: [
            "Focused sessions around business and personal growth",
            "Frameworks from founder stories and hard pivots",
            "Practical prompts for your next move",
            "Designed for founders, creators, and ambitious teams",
        ],
        action: "Start program",
        href: "/programs",
    },
];

const storyVideoSrc = "https://youtu.be/rSD5aqhuuH0?si=vArqCXH-bYmyw5_P";
const storyPreviewVideoSrc = "/videos/storyVideo.mp4";
const heroBackgroundVideoSrc = "/videos/heroVideo.mp4";
const heroBackgroundLoopSeconds = 30;
const heroBackgroundPlaybackRate = 0.70;

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

function PodcastShortCard({
                              short,
    onOpen,
                          }: {
    short: PodcastShort;
    onOpen: () => void;
}) {
    const [isVideoReady, setIsVideoReady] = useState(false);

    return (
        <article className="podcastShortCard">
            <div className="podcastShortMedia">
                <div
                    className="podcastShortPlaceholder"
                    style={
                        short.thumbnailSrc
                            ? ({
                                "--podcast-short-thumbnail": `url(${short.thumbnailSrc})`,
                            } as React.CSSProperties)
                            : undefined
                    }
                >
                    <Play size={22} strokeWidth={2}/>
                </div>
                {short.videoSrc ? (
                    <ReactPlayer
                        className={`podcastShortVideo ${
                            isVideoReady ? "isReady" : ""
                        }`}
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
                ) : null}
            </div>
            {short.videoSrc ? (
                <button
                    className="podcastShortOpenButton"
                    type="button"
                    onClick={onOpen}
                    aria-label={`Open ${short.title}`}
                />
            ) : null}
            <div className="podcastShortInfo">
                <p>{short.subtitle}</p>
                <h3>{short.title}</h3>
            </div>
        </article>
    );
}

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

export function HomePage() {
    const homePageRef = useRef<HTMLElement>(null);
    const heroVideoRef = useRef<HTMLVideoElement>(null);
    const storySectionRef = useRef<HTMLElement>(null);
    const productsSectionRef = useRef<HTMLElement>(null);
    const shortIframeRef = useRef<HTMLIFrameElement>(null);
    const shouldAutoplayShortRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [podcastSwiper, setPodcastSwiper] = useState<SwiperType | null>(null);
    const [shortViewerSwiper, setShortViewerSwiper] =
        useState<SwiperType | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrollProgressVisible, setIsScrollProgressVisible] = useState(false);
    const [canScrollPodcastPrev, setCanScrollPodcastPrev] = useState(false);
    const [canScrollPodcastNext, setCanScrollPodcastNext] = useState(true);
    const [isStoryVideoOpen, setIsStoryVideoOpen] = useState(false);
    const [openShort, setOpenShort] = useState<PodcastShort | null>(null);
    const [isShortPlaying, setIsShortPlaying] = useState(false);
    const [isShortMuted, setIsShortMuted] = useState(true);
    const [isHeroVideoResetting, setIsHeroVideoResetting] = useState(false);

    useEffect(() => {
        const video = heroVideoRef.current;

        if (!video) {
            return;
        }

        video.defaultMuted = true;
        video.muted = true;
        video.playbackRate = heroBackgroundPlaybackRate;

        const playVideo = () => {
            video.playbackRate = heroBackgroundPlaybackRate;
            void video.play().catch(() => undefined);
        };

        playVideo();
        window.addEventListener("pageshow", playVideo);

        return () => {
            window.removeEventListener("pageshow", playVideo);
        };
    }, []);

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
        }, 120);
        window.setTimeout(() => {
            sendShortPlayerCommand("mute");
            sendShortPlayerCommand("playVideo");
        }, 420);
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
        }, 80);
        window.setTimeout(() => {
            sendShortPlayerCommand("unMute");
            sendShortPlayerCommand("setVolume", [100]);
            sendShortPlayerCommand("playVideo");
        }, 320);
        window.setTimeout(() => {
            sendShortPlayerCommand("unMute");
            sendShortPlayerCommand("setVolume", [100]);
            sendShortPlayerCommand("playVideo");
        }, 760);
    }, [sendShortPlayerCommand]);

    const switchPodcastShort = useCallback((direction: 1 | -1) => {
        if (shortViewerSwiper) {
            if (direction === 1) {
                shortViewerSwiper.slideNext();
            } else {
                shortViewerSwiper.slidePrev();
            }

            return;
        }

        setOpenShort((currentShort) => getAdjacentPodcastShort(currentShort, direction));
        if (isShortMuted) {
            playShortMuted();
        } else {
            playShortWithSound();
        }
    }, [isShortMuted, playShortMuted, playShortWithSound, shortViewerSwiper]);

    const openPreviousShort = useCallback(() => {
        switchPodcastShort(-1);
    }, [switchPodcastShort]);

    const openNextShort = useCallback(() => {
        switchPodcastShort(1);
    }, [switchPodcastShort]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let context: gsap.Context | null = null;
        let firstFrameId = 0;
        let secondFrameId = 0;

        const setupAnimations = () => {
            context = gsap.context(() => {
                const heroTimeline = gsap.timeline({defaults: {ease: "power3.out"}});
                const headerElement = document.querySelector("header");
                const podcastPlaceholderIcons = gsap.utils.toArray(
                    ".podcastShortPlaceholder svg",
                );

                heroTimeline
                    .from(".videoPlayerWrapper", {
                        autoAlpha: 0,
                        scale: 1.04,
                        duration: 1.25,
                    });

                if (headerElement) {
                    heroTimeline.from(
                        headerElement,
                        {
                            autoAlpha: 0,
                            y: -18,
                            duration: 0.7,
                        },
                        "-=0.78",
                    );
                }

                heroTimeline.from(
                    [".heroEyebrow", ".heroInfoGlob h1", ".heroText"],
                    {
                        autoAlpha: 0,
                        y: 34,
                        duration: 0.78,
                        stagger: 0.12,
                    },
                    "-=0.35",
                );

                gsap.from(".podcastPreviewHeader > *", {
                    autoAlpha: 0,
                    y: 34,
                    duration: 0.72,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".heroPoductsSection",
                        start: "top 72%",
                    },
                });

                gsap.from(".podcastPreviewButton", {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.58,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".podcastPreviewButton",
                        start: "top 90%",
                    },
                });

                gsap.from(".quizPreviewHeader > *", {
                    autoAlpha: 0,
                    y: 36,
                    duration: 0.72,
                    ease: "power3.out",
                    stagger: 0.11,
                    scrollTrigger: {
                        trigger: ".heroQuizSection",
                        start: "top 74%",
                    },
                });

                gsap.from(".quizCard", {
                    autoAlpha: 0,
                    y: 54,
                    scale: 0.96,
                    duration: 0.82,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".quizCardsGrid",
                        start: "top 78%",
                    },
                });

                gsap.from(
                    [
                        ".storyPreviewEyebrow",
                        ".storyPreviewCopy h2",
                        ".storyPreviewLead",
                        ".storyPreviewText",
                    ],
                    {
                        autoAlpha: 0,
                        y: 34,
                        duration: 0.72,
                        ease: "power3.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: ".heroStorySection",
                            start: "top 74%",
                        },
                    });

                gsap.from([".storyPreviewVideo", ".storyPreviewPortrait"], {
                    autoAlpha: 0,
                    y: 44,
                    scale: 0.96,
                    duration: 0.84,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: ".heroStorySection",
                        start: "top 78%",
                    },
                });

                gsap.from(".programPreviewHeader > *", {
                    autoAlpha: 0,
                    y: 34,
                    duration: 0.72,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".heroProgramSection",
                        start: "top 74%",
                    },
                });

                gsap.from(".programCard", {
                    autoAlpha: 0,
                    y: 52,
                    scale: 0.96,
                    duration: 0.84,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: ".programCardsGrid",
                        start: "top 80%",
                    },
                });

                gsap.to(".heroScrollIconFloat", {
                    y: -8,
                    duration: 1.2,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });

                if (podcastPlaceholderIcons.length > 0) {
                    gsap.to(podcastPlaceholderIcons, {
                        y: -6,
                        scale: 1.06,
                        duration: 1.45,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        stagger: {
                            each: 0.18,
                            repeat: -1,
                            yoyo: true,
                        },
                    });
                }

                gsap.to(".storyPreviewPortraitImage", {
                    y: -10,
                    duration: 2.6,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });

                gsap.to(".storyPreviewPlay", {
                    boxShadow: "0 18px 42px rgba(255, 255, 255, 0.18)",
                    duration: 1.7,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });

                gsap.to(".quizCardNumber", {
                    boxShadow: "0 0 28px rgba(255, 255, 255, 0.22)",
                    duration: 1.7,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    stagger: {
                        each: 0.24,
                        repeat: -1,
                        yoyo: true,
                    },
                });
            }, homePageRef);
        };

        firstFrameId = window.requestAnimationFrame(() => {
            secondFrameId = window.requestAnimationFrame(setupAnimations);
        });

        return () => {
            window.cancelAnimationFrame(firstFrameId);
            window.cancelAnimationFrame(secondFrameId);
            context?.revert();
        };
    }, []);

    useEffect(() => {
        if (!isStoryVideoOpen && !openShort) {
            return;
        }

        const previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (openShort) {
                    setOpenShort(null);
                    setShortViewerSwiper(null);
                    setIsShortPlaying(false);
                    return;
                }

                setIsStoryVideoOpen(false);
            }

            if (!openShort) {
                return;
            }

            if (event.key === "ArrowDown" || event.key === "PageDown") {
                event.preventDefault();
                openNextShort();
            }

            if (event.key === "ArrowUp" || event.key === "PageUp") {
                event.preventDefault();
                openPreviousShort();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isStoryVideoOpen, openNextShort, openPreviousShort, openShort]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress =
                scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

            setScrollProgress(Math.min(Math.max(progress, 0), 1));
            setIsScrollProgressVisible(true);

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrollProgressVisible(false);
            }, 850);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, {passive: true});

        return () => {
            window.removeEventListener("scroll", handleScroll);

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const scrollToNextSection = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const nextSection = storySectionRef.current;

        if (!nextSection) {
            return;
        }

        window.scrollTo({
            top: nextSection.getBoundingClientRect().top + window.scrollY,
            behavior: "smooth",
        });
    };

    const openStoryVideo = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsStoryVideoOpen(true);
    };

    const openPodcastShort = (short: PodcastShort) => {
        setOpenShort(short);
        playShortWithSound();
    };

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

    const closePodcastShort = () => {
        setOpenShort(null);
        setShortViewerSwiper(null);
        shouldAutoplayShortRef.current = false;
        setIsShortPlaying(false);
        setIsShortMuted(true);
    };

    const openShortIndex = openShort
        ? Math.max(
            podcastShorts.findIndex((short) => short.id === openShort.id),
            0,
        )
        : 0;

    const handleHeroVideoTimeUpdate = (
        event: SyntheticEvent<HTMLVideoElement>,
    ) => {
        const video = event.currentTarget;

        if (video.currentTime >= heroBackgroundLoopSeconds) {
            setIsHeroVideoResetting(true);

            window.setTimeout(() => {
                video.currentTime = 0;
                void video.play().catch(() => undefined);
                setIsHeroVideoResetting(false);
            }, 240);
        }
    };

    const updatePodcastSliderButtons = (swiper: SwiperType) => {
        setCanScrollPodcastPrev(!swiper.isBeginning);
        setCanScrollPodcastNext(!swiper.isEnd);
    };

    const handlePodcastSwiper = (swiper: SwiperType) => {
        setPodcastSwiper(swiper);
        window.requestAnimationFrame(() => {
            swiper.update();
            updatePodcastSliderButtons(swiper);
        });
    };

    const scrollPodcastPrev = () => {
        if (!podcastSwiper) {
            return;
        }

        podcastSwiper.update();
        podcastSwiper.slidePrev();
    };

    const scrollPodcastNext = () => {
        if (!podcastSwiper) {
            return;
        }

        podcastSwiper.update();
        podcastSwiper.slideNext();
    };

    return (
        <main className="homePage" ref={homePageRef}>
            <section className="heroSection">
                <div className="videoPlayerWrapper" aria-hidden="true">
                    <video
                        ref={heroVideoRef}
                        className={`heroVideoPlayer ${
                            isHeroVideoResetting ? "isResetting" : ""
                        }`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={false}
                        onTimeUpdate={handleHeroVideoTimeUpdate}
                        onCanPlay={() => {
                            if (heroVideoRef.current) {
                                heroVideoRef.current.playbackRate =
                                    heroBackgroundPlaybackRate;
                            }
                        }}
                        preload="auto"
                        disablePictureInPicture
                        disableRemotePlayback
                        tabIndex={-1}
                    >
                        <source src={heroBackgroundVideoSrc} type="video/mp4"/>
                    </video>
                </div>
                <div className="heroContent">
                    <div className="heroInfoGlob">
                        <p className="heroEyebrow">Podcast for bold builders</p>
                        <h1>Listen. Learn. Move.</h1>
                        <p className="heroText">
                            Conversations about mindset, business, and the moments that
                            change direction.
                        </p>
                    </div>
                    <a
                        className={`heroScrollButton ${
                            isScrollProgressVisible ? "progressVisible" : ""
                        }`}
                        style={
                            {
                                "--scroll-progress": `${scrollProgress * 360}deg`,
                            } as React.CSSProperties
                        }
                        href="#home-story"
                        onClick={scrollToNextSection}
                        aria-label="Scroll down"
                    >
            <span className="heroScrollButtonInner">
              <ArrowDown
                  className="heroScrollIcon heroScrollIconFloat"
                  size={22}
                  strokeWidth={2}
              />
            </span>
                    </a>
                </div>
            </section>

            <section className="heroStorySection" id="home-story" ref={storySectionRef}>
                <div className="storyPreviewContent">
                    <div className="storyPreviewMedia">
                        <article className="storyPreviewPortrait">
                            <span className="storyPreviewPortraitGlow"/>
                            <Image
                                className="storyPreviewPortraitImage"
                                src={joeImage}
                                alt="Joe"
                                sizes="(max-width: 760px) 92vw, (max-width: 980px) 560px, 560px"
                            />
                        </article>
                    </div>
                    <div className="storyPreviewCopy">
                        <p className="storyPreviewEyebrow">The story</p>
                        <h2>Real conversations behind every bold move.</h2>
                        <p className="storyPreviewLead">
                            Joe brings founders, builders, and sharp thinkers into honest
                            conversations about pressure, purpose, and the decisions that
                            change direction.
                        </p>
                        <p className="storyPreviewText">
                            A quiet section for the human side of the podcast: the lessons,
                            pivots, and moments that make each episode feel useful beyond the
                            microphone.
                        </p>
                        <article
                            className="storyPreviewVideo"
                            onClick={openStoryVideo}
                        >
                            <video
                                className="storyPreviewPlayer"
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls={false}
                                preload="metadata"
                                disablePictureInPicture
                                disableRemotePlayback
                                tabIndex={-1}
                            >
                                <source src={storyPreviewVideoSrc} type="video/mp4"/>
                            </video>
                            <span className="storyPreviewVideoShade"/>
                            <button
                                className="storyPreviewPlay"
                                type="button"
                                onClick={openStoryVideo}
                                aria-label="Watch story video"
                            >
                                <Play size={17} fill="currentColor" strokeWidth={0}/>
                                <span>Watch story</span>
                            </button>
                        </article>
                    </div>
                </div>
            </section>
            <section className="heroQuizSection">
                <div className="quizPreviewContent">
                    <div className="quizPreviewHeader">
                        <p className="quizPreviewEyebrow">Quiz</p>
                        <h2>Find the signal in how you move.</h2>
                        <p>
                            Four quick prompts built to reveal your pace, perspective,
                            momentum, and next direction.
                        </p>
                    </div>
                    <div className="quizCardsGrid">
                        {quizCards.map((card, index) => (
                            <Link className="quizCard" href="/quiz" key={card.title}>
                                <Image
                                    className="quizCardImage"
                                    src={card.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 25vw"
                                />
                                <span className="quizCardShade"/>
                                <div className="quizCardContent">
                  <span className="quizCardNumber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                                    <h3>{card.title}</h3>
                                    <p>{card.text}</p>
                                    <span className="quizCardAction">
                    Start quiz
                    <ArrowRight size={17} strokeWidth={2}/>
                  </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="heroPoductsSection" ref={productsSectionRef}>
                <div className="podcastPreviewContent">
                    <div className="podcastPreviewHeader">
                        <div>
                            <p className="podcastPreviewEyebrow">Podcast</p>
                            <h2>Short lessons for bigger moves.</h2>
                        </div>
                        <p className="podcastPreviewText">
                            Quick conversations, sharp ideas, and practical moments from the
                            show. Hover any short to preview the clip when videos are ready.
                        </p>
                    </div>
                    <div className="podcastSliderShell">
                        <Swiper
                            className="podcastSlider"
                            slidesPerView={4}
                            slidesPerGroup={1}
                            spaceBetween={18}
                            speed={520}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.18,
                                    spaceBetween: 16,
                                },
                                640: {
                                    slidesPerView: 2.2,
                                    spaceBetween: 16,
                                },
                                960: {
                                    slidesPerView: 3,
                                    spaceBetween: 18,
                                },
                                1180: {
                                    slidesPerView: 4,
                                    spaceBetween: 18,
                                },
                            }}
                            onSwiper={handlePodcastSwiper}
                            onAfterInit={updatePodcastSliderButtons}
                            onSlideChange={updatePodcastSliderButtons}
                            onResize={updatePodcastSliderButtons}
                            aria-label="Podcast shorts"
                        >
                            {podcastShorts.map((short) => (
                                <SwiperSlide className="podcastSlide" key={short.id}>
                                    <PodcastShortCard
                                        short={short}
                                        onOpen={() => openPodcastShort(short)}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="podcastSliderControls" aria-label="Podcast slider">
                            <button
                                className={`podcastSliderControl${
                                    canScrollPodcastPrev ? "" : " isDisabled"
                                }`}
                                type="button"
                                onClick={scrollPodcastPrev}
                                aria-disabled={!canScrollPodcastPrev}
                                aria-label="Previous podcast short"
                            >
                                <ChevronLeft size={20} strokeWidth={2}/>
                            </button>
                            <button
                                className={`podcastSliderControl${
                                    canScrollPodcastNext ? "" : " isDisabled"
                                }`}
                                type="button"
                                onClick={scrollPodcastNext}
                                aria-disabled={!canScrollPodcastNext}
                                aria-label="Next podcast short"
                            >
                                <ChevronRight size={20} strokeWidth={2}/>
                            </button>
                        </div>
                    </div>
                    <Link className="podcastPreviewButton" href="/podcasts">
                        <span>Open podcast</span>
                        <ArrowRight size={18} strokeWidth={2}/>
                    </Link>
                </div>
            </section>
            <section
                className="heroProgramSection"
                style={{backgroundImage: `url(${programs.src})`}}
                aria-label="Programs"
            >
                <span className="heroProgramSectionShade" aria-hidden="true"/>
                <div className="programPreviewContent">
                    <div className="programPreviewHeader">
                        <p className="programPreviewEyebrow">Programs</p>
                        <h2>Take the next step with Joe.</h2>
                        <p>
                            Choose a path built around real conversations, useful lessons,
                            and the kind of momentum you can carry into the week.
                        </p>
                    </div>
                    <div className="programCardsGrid">
                        {programCards.map((card) => (
                            <article className="programCard" key={card.title}>
                                <div className="programCardTop">
                                    <h3>{card.title}</h3>
                                    <span>{card.meta}</span>
                                </div>
                                <p className="programCardDescription">{card.description}</p>
                                <ul className="programFeatureList">
                                    {card.features.map((feature) => (
                                        <li key={feature}>
                                            <Check size={19} strokeWidth={2.4}/>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link className="programCardButton" href={card.href}>
                                    {card.action}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            {isStoryVideoOpen ? (
                <div
                    className="storyVideoOverlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Story video"
                    onClick={() => setIsStoryVideoOpen(false)}
                >
                    <div
                        className="storyVideoOverlayInner"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="storyVideoClose"
                            type="button"
                            onClick={() => setIsStoryVideoOpen(false)}
                            aria-label="Close story video"
                        >
                            <X size={22} strokeWidth={2}/>
                        </button>
                        <ReactPlayer
                            className="storyVideoFullscreenPlayer"
                            src={storyVideoSrc}
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
            {openShort?.videoSrc ? (
                <div
                    className="storyVideoOverlay shortVideoOverlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label={openShort.title}
                    onClick={closePodcastShort}
                >
                    <button
                        className="storyVideoClose shortVideoClose"
                        type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            closePodcastShort();
                        }}
                        aria-label="Close short video"
                    >
                        <X size={22} strokeWidth={2}/>
                    </button>
                    <div className="shortVideoShell">
                        <div
                            className="shortVideoStage"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <Swiper
                                className="shortVideoSwiper"
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
                                    <SwiperSlide className="shortVideoSlide" key={short.id}>
                                        <div
                                            className={`storyVideoOverlayInner shortVideoOverlayInner${
                                                openShort.id === short.id && !isShortPlaying
                                                    ? " isPaused"
                                                    : ""
                                            }${
                                                openShort.id === short.id && isShortMuted
                                                    ? " isMuted"
                                                    : ""
                                            }`}
                                        >
                                            {openShort.id === short.id && isShortPlaying ? (
                                                <iframe
                                                    ref={shortIframeRef}
                                                    key={`${short.id}-${isShortMuted ? "muted" : "sound"}`}
                                                    className="storyVideoFullscreenPlayer"
                                                    src={getYouTubeEmbedSrc(
                                                        short.videoSrc ?? "",
                                                        isShortMuted,
                                                    )}
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
                                                    className="shortVideoInactivePoster"
                                                    style={
                                                        short.thumbnailSrc
                                                            ? ({
                                                                "--short-video-thumbnail": `url(${short.thumbnailSrc})`,
                                                            } as React.CSSProperties)
                                                            : undefined
                                                    }
                                                />
                                            )}
                                            <div
                                                className="shortVideoSwipeLayer"
                                                role="button"
                                                tabIndex={0}
                                                onClick={toggleShortPlayback}
                                                onKeyDown={(event) => {
                                                    if (
                                                        event.key !== "Enter" &&
                                                        event.key !== " "
                                                    ) {
                                                        return;
                                                    }

                                                    event.preventDefault();
                                                    toggleShortPlayback();
                                                }}
                                                aria-label={
                                                    openShort.id === short.id && isShortPlaying
                                                        ? "Pause short video"
                                                        : "Play short video"
                                                }
                                            >
                                                <span className="shortVideoPlaybackHint">
                                                    {openShort.id === short.id && isShortPlaying ? (
                                                        isShortMuted ? (
                                                            <Volume2 size={34} strokeWidth={2}/>
                                                        ) : (
                                                            <Pause
                                                                size={34}
                                                                fill="currentColor"
                                                                strokeWidth={0}
                                                            />
                                                        )
                                                    ) : (
                                                        <Play
                                                            size={34}
                                                            fill="currentColor"
                                                            strokeWidth={0}
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                            <div className="shortVideoMeta">
                                                <p>{short.subtitle}</p>
                                                <h3>{short.title}</h3>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div
                            className="shortVideoControls"
                            aria-label="Shorts navigation"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button
                                className="shortVideoControl"
                                type="button"
                                onClick={openPreviousShort}
                                aria-label="Previous short"
                            >
                                <ChevronUp size={24} strokeWidth={2}/>
                            </button>
                            <button
                                className="shortVideoControl"
                                type="button"
                                onClick={openNextShort}
                                aria-label="Next short"
                            >
                                <ChevronDown size={24} strokeWidth={2}/>
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </main>
    );
}
