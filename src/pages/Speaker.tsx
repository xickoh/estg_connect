import React from "react";
import { useParams } from "react-router-dom";

import SpeakerDetailSection from "../components/speakerDetail/SpeakerDetailSection";
import { speakersData } from "../data/SpeakerData";

// ajustar isto para componentes corretos
import Navbar from "../components/navbar/Navbar";
//import Footer from "../components/Footer";


const Speaker = () => {
  const { id } = useParams();

  const speaker = speakersData.find((item) => item.id === id);

  if (!speaker) {
    return <div>Orador não encontrado.</div>;
  }

  return (
    <>
      <Navbar />
      <SpeakerDetailSection speaker={speaker} />
    </>
  );
};

export default Speaker;