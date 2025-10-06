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
  imageUrl?: string;
  rounds: Round[];
  contact: Contact[];
  faq: FAQ[];
  sponsors: string[];
};

export interface SessionUser {
  id?: string;    
  name?: string | null;
  email?: string | null;
  image?: string | null;
}


export interface Session {
  user?: SessionUser;
  expires: string; // ISO date string
}

export interface DashboardClientProps {
  session: Session;
}

// Updated Roles based on Prisma schema
export enum Role {
  USER = "USER",
  REFERRED_USER = "REFERRED_USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  CAMPUS_AMBASSADOR = "CAMPUS_AMBASSADOR",
}

// Payment enums
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum PaymentMethod {
  CARD = "CARD",
  NETBANKING = "NETBANKING",
  UPI = "UPI",
}

// Merchandise enum
export enum MerchandiseType {
  SHIRT = "SHIRT",
  // CAP can be added later if needed
}

// MongoDB ObjectId type
export type ObjectId = { $oid: string };

// User type matching Prisma schema
export type User = {
  _id?: ObjectId;
  email: string;
  name: string;
  emailVerified: boolean;
  gender: string;
  password: string;
  phone: string;
  college: string;
  year: string;
  branch: string;
  rollNo?: string;
  role: Role;
  foodPreference: string;
  referralCode: string;
  teamIDs: ObjectId[];
  shirtSize?: string; // XS, S, M, L, XL, XXL
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

// Team type
export type Team = {
  _id: ObjectId;
  memberIds: ObjectId[];
  members: User[];
};

// Payments type
export type Payments = {
  _id: ObjectId;
  userId: ObjectId;
  amount: number;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: PaymentStatus;
};

// MerchandiseOrder type
export type MerchandiseOrder = {
  _id: ObjectId;
  orderId: string;
  amount: number;
  currency: string;
  receipt?: string;
  status: string;
  paymentId?: ObjectId;
  userId: ObjectId;
  merchandise: MerchandiseType;
  size: string;
  couponUsed: boolean;
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
};

  

