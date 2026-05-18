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
    title: "How do you handle risk?",
    text: "See whether you avoid risk, rush into it, or prepare well enough to move with clarity.",
    image: quizImage1,
  },
  {
    title: "What does success mean to you?",
    text: "Separate status from control over your time, choices, direction, and values.",
    image: quizImage2,
  },
  {
    title: "Can you lead yourself first?",
    text: "Check how you respond to pressure, emotion, responsibility, and hard decisions.",
    image: quizImage3,
  },
  {
    title: "Who is shaping your next move?",
    text: "Look at the relationships, reputation, and network that can strengthen your direction.",
    image: quizImage4,
  },
  {
    title: "Where do you need moderation?",
    text: "Find the balance between ambition and self-control, confidence and humility, push and pause.",
    image: quizCardImage1,
  },
  {
    title: "Do you ask or wait?",
    text: "Opportunity often belongs to the person willing to ask before fear closes the door.",
    image: quizCardImage2,
  },
  {
    title: "What is your operator mindset?",
    text: "Understand how calmly you solve problems, think long-term, and execute under pressure.",
    image: quizCardImage3,
  },
  {
    title: "What deserves your discipline?",
    text: "Notice which goal needs clearer systems, stronger habits, and fewer distractions.",
    image: quizCardImage4,
  },
  {
    title: "What legacy are you building?",
    text: "Move past temporary attention and choose the work, reputation, and values that can last.",
    image: quizCardImage5,
  },
  {
    title: "What move comes first?",
    text: "Turn your result into one clear next action you can take with courage and preparation.",
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
          <p className="quizHeroEyebrow">Builder mindset quiz</p>
          <h1>Discover how you think, risk, lead, and build.</h1>
          <p>
            A short quiz built around calculated risk, moderation, leadership,
            relationships, discipline, and the kind of success that gives you
            control over your direction.
          </p>
        </div>
      </section>

      <section className="quizLibrarySection">
        <div className="quizLibraryContent">
          <div className="quizLibraryHeader">
            <p className="quizLibraryEyebrow">Inside the quiz</p>
            <h2>Choose the prompt that reveals your next move.</h2>
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
