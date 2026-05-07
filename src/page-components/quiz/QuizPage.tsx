import Image from "next/image";
import { ArrowRight } from "lucide-react";
import quizImage1 from "@/Images/quiz1.webp";
import quizImage2 from "@/Images/quiz2.webp";
import quizImage3 from "@/Images/quiz3.webp";
import quizImage4 from "@/Images/quiz4.webp";
import quizCardImage1 from "@/Images/quizCard1.webp";
import quizCardImage2 from "@/Images/quizCard2.webp";
import quizCardImage3 from "@/Images/quizCard3.webp";
import quizCardImage4 from "@/Images/quizCard4.webp";
import quizCardImage5 from "@/Images/quizCard5.webp";
import quizCardImage6 from "@/Images/quizCard6.webp";
import quizHeroImage from "@/Images/quizHero.webp";
import "../screen.scss";
import "./quizPage.scss";

const quizPageCards = [
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
  {
    title: "What pace helps you grow?",
    text: "See whether your next step needs more urgency, patience, or steady consistency.",
    image: quizCardImage1,
  },
  {
    title: "How do you see the next chance?",
    text: "Understand the way you notice opportunity when the path is not fully clear yet.",
    image: quizCardImage2,
  },
  {
    title: "What creates momentum for you?",
    text: "Find out what helps you move forward when decisions feel risky or uncomfortable.",
    image: quizCardImage3,
  },
  {
    title: "Where should your focus go?",
    text: "Notice what deserves your energy now and what should wait for a better moment.",
    image: quizCardImage4,
  },
  {
    title: "Which direction fits this season?",
    text: "Choose the kind of challenge that matches how you are ready to grow next.",
    image: quizCardImage5,
  },
  {
    title: "What action should come first?",
    text: "Turn your result into a simple next move you can actually use after the quiz.",
    image: quizCardImage6,
  },
];

export function QuizPage() {
  return (
    <main className="screenPage">
      <section className="quizHeroSection">
        <Image
          className="quizHeroImage"
          src={quizHeroImage}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="quizHeroOverlay" aria-hidden="true" />
        <div className="quizHeroContent">
          <p className="quizHeroEyebrow">Personal direction quiz</p>
          <h1>Find the signal in how you move.</h1>
          <p>
            A short quiz built to reveal your pace, perspective, momentum, and
            the next kind of challenge you are ready to choose.
          </p>
        </div>
      </section>

      <section className="quizLibrarySection">
        <div className="quizLibraryContent">
          <div className="quizLibraryHeader">
            <p className="quizLibraryEyebrow">Inside the quiz</p>
            <h2>Choose the prompt that fits your next move.</h2>
          </div>

          <div className="quizLibraryGrid">
            {quizPageCards.map((card) => (
              <article className="quizLibraryCard" key={card.title}>
                <div className="quizLibraryImageWrap">
                  <Image
                    className="quizLibraryImage"
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
                  />
                  <span className="quizLibraryImageShade" />
                </div>
                <div className="quizLibraryCardContent">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <button className="quizLibraryButton" type="button">
                    <span>Start this quiz</span>
                    <ArrowRight size={17} strokeWidth={2} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
