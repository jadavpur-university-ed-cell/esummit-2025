type FAQ = {
  question: string;
  answer: string;
};

type Contact = {
  name: string;
  number: string;
  link: string;
};

type Round = {
  number: string;
  title: string;
  about: string;
  mode: string;
};

export type Event = {
  eventSlug: string;
  eventName: string;
  about: string;
  description: string;
  rounds: Round[];
  contact: Contact[];
  faq: FAQ[];
  sponsors: string[];
};
