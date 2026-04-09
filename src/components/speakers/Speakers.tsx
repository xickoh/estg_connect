import React, { FC, useState, useEffect } from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";
import { speakersData } from "../../data/SpeakerData";

const Speakers: FC = () => {
  const navigate = useNavigate();
  const [isCarousel, setIsCarousel] = useState(false);

  const handleSpeakerClick = (speakerId: string) => {
    navigate(`/speaker/${speakerId}`);
  };

  useEffect(() => {
    setIsCarousel(speakersData.length > 5);
  }, []);

  return (
    <section className="oradores" id="oradores">
      <div className="oradores__marqueeWrapper">
        <div className="oradores__marquee">
          <span>ORADORES</span>
          <span className="oradores__dot">*</span>
          <span>ORADORES</span>
          <span className="oradores__dot">*</span>
          <span>ORADORES</span>
          <span className="oradores__dot">*</span>
          <span>ORADORES</span>
          <span className="oradores__dot">*</span>
          <span>ORADORES</span>
        </div>
        <div className="oradores__marquee" aria-hidden="true">
          <span>ORADORES</span>
          <span className="oradores__dot">*</span>
          <span>ORADORES</span>
          <span className="oradores__dot">*</span>
          <span>ORADORES</span>
          <span className="oradores__dot">*</span>
          <span>ORADORES</span>
          <span className="oradores__dot">*</span>
          <span>ORADORES</span>
        </div>
      </div>

      <p className="oradores__subtitle">
        Descobre as mentes que estao a moldar o futuro da tecnologia
      </p>

      <div className={`oradores__container ${isCarousel ? "oradores__container--carousel" : ""}`}>
        <div className={`oradores__grid ${isCarousel ? "oradores__grid--carousel" : ""}`}>
          {speakersData.map((speaker) => (
            <button
              className="oradores__card"
              key={speaker.id}
              onClick={() => handleSpeakerClick(speaker.id)}
              aria-label={`Ver perfil de ${speaker.name}`}
              type="button"
            >
              <div className="oradores__imageWrap">
                <img src={speaker.image} alt={speaker.name} className="oradores__image" />
                <div className="oradores__fade" />
              </div>

              <div className="oradores__meta">
                <p className="oradores__roleLine">
                  {speaker.role} · {speaker.company}
                </p>

                <div className="oradores__nameRow">
                  <p className="oradores__name">{speaker.name}</p>
                  <span className="oradores__profileLink">↗</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
