"use client";

import {type SyntheticEvent, useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowDown,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Play,
    X,
} from "lucide-react";
import type {Swiper as SwiperType} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import ReactPlayer from "react-player";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
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
};

const podcastShorts: PodcastShort[] = [
    {
        id: "mindset",
        title: "Short video title",
        subtitle: "Mindset reset",
        videoSrc: "https://youtube.com/shorts/jYptVOFUCrk?si=gvJdPposyJa0VaJZ",
    },
    {
        id: "business",
        title: "Short video title",
        subtitle: "Business move",
        videoSrc: "https://youtube.com/shorts/q28cql1TNRM?si=TErxZADo5WNF3H5_",
    },
    {
        id: "story",
        title: "Short video title",
        subtitle: "Real story",
        videoSrc: "https://youtube.com/shorts/cQ0zGhbax68?si=TjiGPBoWwH9rH4mj",
    },
    {
        id: "habits",
        title: "Short video title",
        subtitle: "Daily habit",
        videoSrc: "https://youtube.com/shorts/QzXqMWmdIsY?si=JbLdPgr64bzpnhvi",
    },
    {
        id: "leadership",
        title: "Short video title",
        subtitle: "Leadership clip",
        videoSrc: "https://youtube.com/shorts/H4M6ZJF7Qq4?si=2bqbSpKax0SrTVGU",
    },
    {
        id: "energy",
        title: "Short video title",
        subtitle: "Energy shift",
        videoSrc: "https://youtube.com/shorts/m_8BAhWLMEw?si=y4ixoEijD44OGtX3",
    },
    {
        id: "focus",
        title: "Short video title",
        subtitle: "Focus point",
        videoSrc: "https://youtube.com/shorts/5WM2Cs-6BHI?si=QrpQSFBVZH2BzvxD",
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
    },
];

const storyVideoSrc = "https://youtu.be/rSD5aqhuuH0?si=vArqCXH-bYmyw5_P";
const heroBackgroundVideoSrc = "/videos/heroVideo.mp4";
const heroBackgroundLoopSeconds = 30;
const heroBackgroundPlaybackRate = 0.70;

function PodcastShortCard({
                              short,
                              isActive,
                              onOpen,
                              onHoverStart,
                              onHoverEnd,
                          }: {
    short: PodcastShort;
    isActive: boolean;
    onOpen: () => void;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}) {
    return (
        <article
            className="podcastShortCard"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            <div className="podcastShortMedia">
                {short.videoSrc ? (
                    <ReactPlayer
                        className="podcastShortVideo"
                        src={short.videoSrc}
                        playing={isActive}
                        muted
                        loop
                        playsInline
                        controls={false}
                        width="100%"
                        height="100%"
                    />
                ) : (
                    <div className="podcastShortPlaceholder">
                        <Play size={22} strokeWidth={2}/>
                    </div>
                )}
            </div>
            {short.videoSrc ? (
                <button
                    className="podcastShortOpenButton"
                    type="button"
                    onClick={onOpen}
                    onFocus={onHoverStart}
                    onBlur={onHoverEnd}
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

export function HomePage() {
    const homePageRef = useRef<HTMLElement>(null);
    const heroVideoRef = useRef<HTMLVideoElement>(null);
    const productsSectionRef = useRef<HTMLElement>(null);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [podcastSwiper, setPodcastSwiper] = useState<SwiperType | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrollProgressVisible, setIsScrollProgressVisible] = useState(false);
    const [activeShortId, setActiveShortId] = useState<string | null>(null);
    const [canScrollPodcastPrev, setCanScrollPodcastPrev] = useState(false);
    const [canScrollPodcastNext, setCanScrollPodcastNext] = useState(false);
    const [isStoryVideoOpen, setIsStoryVideoOpen] = useState(false);
    const [openShort, setOpenShort] = useState<PodcastShort | null>(null);
    const [isHeroVideoResetting, setIsHeroVideoResetting] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let context: gsap.Context | null = null;
        let firstFrameId = 0;
        let secondFrameId = 0;

        const setupAnimations = () => {
            context = gsap.context(() => {
                const heroTimeline = gsap.timeline({defaults: {ease: "power3.out"}});

                heroTimeline
                    .from(".videoPlayerWrapper", {
                        autoAlpha: 0,
                        scale: 1.04,
                        duration: 1.25,
                    })
                    .from(
                        "header",
                        {
                            autoAlpha: 0,
                            y: -18,
                            duration: 0.7,
                        },
                        "-=0.78",
                    )
                    .from(
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

                gsap.from(".podcastShortCard", {
                    autoAlpha: 0,
                    y: 44,
                    scale: 0.96,
                    duration: 0.72,
                    ease: "power3.out",
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: ".podcastSliderShell",
                        start: "top 76%",
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

                gsap.to(".podcastShortPlaceholder svg", {
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
                setIsStoryVideoOpen(false);
                setOpenShort(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isStoryVideoOpen, openShort]);

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

    const scrollToNextSection = () => {
        productsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const handleHeroVideoTimeUpdate = (
        event: SyntheticEvent<HTMLVideoElement>,
    ) => {
        const video = event.currentTarget;

        if (video.currentTime >= heroBackgroundLoopSeconds) {
            setIsHeroVideoResetting(true);

            window.setTimeout(() => {
                video.currentTime = 0;
                void video.play();
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
        updatePodcastSliderButtons(swiper);
    };

    const scrollPodcastPrev = () => {
        podcastSwiper?.slidePrev();
    };

    const scrollPodcastNext = () => {
        podcastSwiper?.slideNext();
    };

    return (
        <main className="homePage" ref={homePageRef}>
            <section className="heroSection">
                <div className="videoPlayerWrapper" aria-hidden="true">
                    <ReactPlayer
                        ref={heroVideoRef}
                        className={`heroVideoPlayer ${
                            isHeroVideoResetting ? "isResetting" : ""
                        }`}
                        src={heroBackgroundVideoSrc}
                        playing
                        muted
                        loop
                        playsInline
                        controls={false}
                        playbackRate={heroBackgroundPlaybackRate}
                        onTimeUpdate={handleHeroVideoTimeUpdate}
                        width="100%"
                        height="100%"
                        preload="auto"
                        disablePictureInPicture
                        disableRemotePlayback
                        tabIndex={-1}
                    />
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
                    <button
                        className={`heroScrollButton ${
                            isScrollProgressVisible ? "progressVisible" : ""
                        }`}
                        style={
                            {
                                "--scroll-progress": `${scrollProgress * 360}deg`,
                            } as React.CSSProperties
                        }
                        type="button"
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
                    </button>
                </div>
            </section>

            <section className="heroStorySection">
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
                        <article className="storyPreviewVideo">
                            <ReactPlayer
                                className="storyPreviewPlayer"
                                src={storyVideoSrc}
                                playing
                                muted
                                loop
                                playsInline
                                controls={false}
                                width="100%"
                                height="100%"
                                preload="metadata"
                                disablePictureInPicture
                                disableRemotePlayback
                                tabIndex={-1}
                            />
                            <span className="storyPreviewVideoShade"/>
                            <button
                                className="storyPreviewPlay"
                                type="button"
                                onClick={() => setIsStoryVideoOpen(true)}
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
                            watchOverflow
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
                            onSlideChange={updatePodcastSliderButtons}
                            onResize={updatePodcastSliderButtons}
                            aria-label="Podcast shorts"
                        >
                            {podcastShorts.map((short) => (
                                <SwiperSlide className="podcastSlide" key={short.id}>
                                    <PodcastShortCard
                                        short={short}
                                        isActive={activeShortId === short.id}
                                        onOpen={() => setOpenShort(short)}
                                        onHoverStart={() => setActiveShortId(short.id)}
                                        onHoverEnd={() => setActiveShortId(null)}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="podcastSliderControls" aria-label="Podcast slider">
                            <button
                                className="podcastSliderControl"
                                type="button"
                                onClick={scrollPodcastPrev}
                                disabled={!canScrollPodcastPrev}
                                aria-label="Previous podcast short"
                            >
                                <ChevronLeft size={20} strokeWidth={2}/>
                            </button>
                            <button
                                className="podcastSliderControl"
                                type="button"
                                onClick={scrollPodcastNext}
                                disabled={!canScrollPodcastNext}
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
                                <button className="programCardButton" type="button">
                                    {card.action}
                                </button>
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
                    className="storyVideoOverlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label={openShort.title}
                    onClick={() => setOpenShort(null)}
                >
                    <div
                        className="storyVideoOverlayInner shortVideoOverlayInner"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="storyVideoClose"
                            type="button"
                            onClick={() => setOpenShort(null)}
                            aria-label="Close short video"
                        >
                            <X size={22} strokeWidth={2}/>
                        </button>
                        <ReactPlayer
                            className="storyVideoFullscreenPlayer"
                            src={openShort.videoSrc}
                            playing
                            controls
                            playsInline
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            ) : null}
        </main>
    );
}
