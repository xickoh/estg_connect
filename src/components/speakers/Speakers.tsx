import React, { FC } from "react";
import "./Styles.css";

type Speaker = {
  id: number;
  name: string;
  role: string;
  company: string;
  companyUrl: string;
  profileUrl: string;
  imageUrl: string;
};

const speakers: Speaker[] = [
  {
    id: 1,
    name: "John Doe",
    role: "CTO",
    company: "OpenAI",
    companyUrl: "https://openai.com",
    profileUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "John Doe",
    role: "ENGINEER",
    company: "Anthropic",
    companyUrl: "https://www.anthropic.com",
    profileUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "John Doe",
    role: "FOUNDER",
    company: "MistralAI",
    companyUrl: "https://mistral.ai",
    profileUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "John Doe",
    role: "SENIOR DEVELOPER",
    company: "NVIDIA",
    companyUrl: "https://www.nvidia.com",
    profileUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1542204625-de293a02b6d0?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "John Doe",
    role: "CTO",
    company: "Google",
    companyUrl: "https://about.google",
    profileUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
  },
];

const Speakers: FC = () => {
  return (
    <section className="oradores" id="oradores">
      <div className="oradores__marquee" aria-hidden="true">
        <span>ORADORES</span>
        <span className="oradores__dot">*</span>
        <span>ORADORES</span>
        <span className="oradores__dot">*</span>
        <span>ORADORES</span>
      </div>

      <p className="oradores__subtitle">
        Descobre as mentes que estao a moldar o futuro da tecnologia
      </p>

      <div className="oradores__grid">
        {speakers.map((speaker) => (
          <article className="oradores__card" key={speaker.id}>
            <div className="oradores__imageWrap">
              <img src={speaker.imageUrl} alt={speaker.name} className="oradores__image" />
              <div className="oradores__fade" />
            </div>

            <div className="oradores__meta">
              <p className="oradores__roleLine">
                {speaker.role} ·{" "}
                <a href={speaker.companyUrl} target="_blank" rel="noreferrer">
                  {speaker.company}
                </a>
              </p>

              <div className="oradores__nameRow">
                <p className="oradores__name">{speaker.name}</p>
                <a
                  className="oradores__profileLink"
                  href={speaker.profileUrl}
                  aria-label={`Ver perfil de ${speaker.name}`}
                >
                  ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Speakers;
