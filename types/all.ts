export type FAQ = {
  question: string;
  answer: string;
};

export type Contact = {
  name: string;
  number: string;
  link: string;
};

export type Round = {
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

export enum Role {
  participant = "Participant",
  admin = "Admin",
  superadmin = "Super-Admin",
}

export interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  gender: string;
  graduationYear: string;
  phone: string;
  role: Role;
  institution: string;
  foodPreference: string;
  merchandise: {
    src: string;
    status: string;
    color: string;
    size: string;
  };
  registeredEvents: string[];
  wishlist: string[];
  pendingEvents: string[];
}
