export type Speaker = {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  about: string;
  linkedinUrl: string;
  image: string;
  companyLogoText?: string;
};

export const speakersData: Speaker[] = [
  {
    id: "john-doe",
    name: "John Doe",
    role: "CTO",
    company: "Google",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet eleifend arcu in posuere. Integer pulvinar feugiat ex, auctor tristique tortor elementum id. Integer laoreet nunc eu ligula ornare, et faucibus diam bibendum. Quisque tincidunt nibh in ante dictum, sed porta augue auctor.",
    about: "Lorem ipsum dolor sit amet",
    linkedinUrl: "https://medal.tv/u/GreenColossus?tab=clips",
    image: "/assets/images/placeholder-speaker.png",
    companyLogoText: "Google",
  },
  {
    id: "ana-silva",
    name: "Ana Silva",
    role: "Head of Product",
    company: "Microsoft",
    bio: "Texto da Ana Silva. Podes escrever manualmente o conteúdo de cada orador aqui.",
    about: "Mais informação sobre a Ana Silva",
    linkedinUrl: "https://www.linkedin.com/",
    image: "/assets/images/placeholder-speaker.png",
    companyLogoText: "Microsoft",
  },
];