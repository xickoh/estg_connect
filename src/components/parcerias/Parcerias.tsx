import React from "react";
import { FC } from "react";
import "./Styles.css";

type SponsorType = {
  path: string; // nome do ficheiro dentro da pasta sponsors
  alt: string;
};

// google apenas está aqui como exemplo
// remover quando obtivermos a lista de parceiros
const sponsors: Array<SponsorType> = [
  { alt: "Google", path: "google.svg" },
];

const repeatedSponsors = Array.from({ length: 20 }, () => sponsors).flat();

const Parcerias: FC = () => {
  return (
    <section id="parcerias" className="parcerias-section">
      <h2 className="parcerias-title">Parcerias</h2>

      <div className="marquee-container">
        <div className="marquee-content">
          {repeatedSponsors.map((item, index) => (
            <div
              key={`${item.path}-${index}`}
              className="marquee-item"
            >
              <img
                src={`/sponsors/${item.path}`}
                alt={item.alt}
                className="brand-logo"
              />
            </div>
          ))}
        </div>
        <div className="overlay overlay-left"></div>
        <div className="overlay overlay-right"></div>
      </div>
    </section>
  );
};

export default Parcerias;