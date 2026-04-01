import React from "react";
import "./SpeakerDetailSection.css";
import { Speaker } from "../../data/SpeakerData";

type SpeakerDetailSectionProps = {
  speaker: Speaker;
};

const SpeakerDetailSection = ({ speaker }: SpeakerDetailSectionProps) => {
  return (
    <section className="speaker-detail">
      <div className="speaker-detail__hero">
        <div className="speaker-detail__image-wrap">
          <svg
            className="speaker-detail__image-svg"
            viewBox="0 0 620 760"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id="speakerWaveClip">
                <path d="M0,0 H620 V585 C470,585 260,555 95,470 C40,440 12,412 0,388 Z" />
              </clipPath>
            </defs>

            <image
              href={speaker.image}
              width="620"
              height="760"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#speakerWaveClip)"
            />
          </svg>
        </div>

        <div className="speaker-detail__company">
          {speaker.companyLogoText || speaker.company}
        </div>
      </div>

      <div className="speaker-detail__content-wrap">
        <div className="speaker-detail__content">
          <p className="speaker-detail__role">
            {speaker.role} <span>@ {speaker.company}</span>
          </p>

          <h1 className="speaker-detail__name">{speaker.name}</h1>

          <p className="speaker-detail__bio">{speaker.bio}</p>

          <div className="speaker-detail__about-box">
            <span className="speaker-detail__about-label">IRÁ FALAR SOBRE</span>
            <p>{speaker.about}</p>
          </div>

          <a
            href={speaker.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="speaker-detail__linkedin"
          >
            Ver perfil no LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpeakerDetailSection;