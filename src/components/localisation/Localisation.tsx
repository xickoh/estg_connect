import React, { FC } from "react";
import "./Styles.css";

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="localisation__icon">
    <path
      d="M7 2v2M17 2v2M3.5 9h17M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="localisation__icon">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 7v5l3 2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="localisation__icon">
    <path
      d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Localisation: FC = () => {
  const locationName = "Casa das Artes de Felgueiras";
  const address = "Av. Dr. Magalhaes Lemos 54, 4610-106 Felgueiras";
  const mapQuery = "Casa das Artes de Felgueiras, Felgueiras, Portugal";

  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  return (
    <section className="localisation localisation--event" id="localisation">
      <div className="localisation__mapLayer">
        <iframe
          title={`Mapa de ${locationName}`}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="localisation__tint" />

      <article className="localisation__card">
        <p className="localisation__eyebrow">ONDE ACONTECE</p>
        <h2 className="localisation__title">{locationName}</h2>

        <div className="localisation__divider" />

        <div className="localisation__item">
          <div className="localisation__labelRow">
            <CalendarIcon />
            <p className="localisation__label">DATA</p>
          </div>
          <p className="localisation__value">26 de Maio, 2026</p>
        </div>

        <div className="localisation__item">
          <div className="localisation__labelRow">
            <ClockIcon />
            <p className="localisation__label">HORARIO</p>
          </div>
          <p className="localisation__value">9:00 - 17:00</p>
        </div>

        <div className="localisation__item">
          <div className="localisation__labelRow">
            <PinIcon />
            <p className="localisation__label">MORADA</p>
          </div>
          <p className="localisation__value">{address}</p>
        </div>

        <a
          className="localisation__cta"
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Como Chegar <span aria-hidden="true">↗</span>
        </a>
      </article>
    </section>
  );
};

export default Localisation;
