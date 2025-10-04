import { User, Role } from "@/types/all";

export const mockUserData: User = {
  name: "Sarin",
  email: "sarin@example.com",
  emailVerified: true,
  gender: "Male",
  year: "2028",
  password : "123",
  phone: "9876543210",
  role: Role.ADMIN,
  college: "Jadavpur University",
  foodPreference: "Non-Vegetarian",
  merchandise: {
    src: "/merchandise/merch-in-dashboard.svg",
    status: "Ordered",
    color: "Black",
    size: "M"
  },
  registeredEvents: [
    "mockstock",   // Mockstock
    "dizmart"      // Dizmart
  ],
  wishlist: [
    "hacknpitch",  // HackNPitch
    "corporate-clash" // Corporate Clash
  ],
  pendingEvents: [
    "summit-cup"   // Summit Cup
  ]
};
