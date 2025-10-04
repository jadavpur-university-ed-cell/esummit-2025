export interface Member {
  name: string;
  role: string;
  imageUrl: string;
  instaUrl: string;
  linkedinUrl: string;
}

export interface Team {
  name: string;
  members: Member[];
}

export const teams: Team[] = [
  {
    name: "",
    members: [
      {
        name: "John Doe",
        role: "Frontend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/john",
        linkedinUrl: "https://linkedin.com/in/john"
      },
      {
        name: "Jane Smith",
        role: "Backend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/jane",
        linkedinUrl: "https://linkedin.com/in/jane"
      },
      {
        name: "John Doe",
        role: "Frontend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/john",
        linkedinUrl: "https://linkedin.com/in/john"
      },
      {
        name: "Jane Smith",
        role: "Backend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/jane",
        linkedinUrl: "https://linkedin.com/in/jane"
      },
      {
        name: "John Doe",
        role: "Frontend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/john",
        linkedinUrl: "https://linkedin.com/in/john"
      },
      {
        name: "Jane Smith",
        role: "Backend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/jane",
        linkedinUrl: "https://linkedin.com/in/jane"
      },
      // Add more members...
    ]
  },
  {
    name: "Tech",
    members: [
      {
        name: "Mike Johnson",
        role: "UI/UX Designer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/mike",
        linkedinUrl: "https://linkedin.com/in/mike"
      },
      // Add more members...
    ]
  },
  {
    name: "Sponsorship & Finance",
    members: [
      {
        name: "Sarah Wilson",
        role: "Digital Marketer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/sarah",
        linkedinUrl: "https://linkedin.com/in/sarah"
      },
      // Add more members...
    ]
  },
  {
    name: "Content & Design",
    members: [
      {
        name: "Sarah Wilson",
        role: "Digital Marketer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/sarah",
        linkedinUrl: "https://linkedin.com/in/sarah"
      },
      // Add more members...
    ]
  },
  {
    name: "PR & Marketing",
    members: [
      {
        name: "Sarah Wilson",
        role: "Digital Marketer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/sarah",
        linkedinUrl: "https://linkedin.com/in/sarah"
      },
      // Add more members...
    ]
  },
  {
    name: "Logistics & Operations",
    members: [
      {
        name: "Sarah Wilson",
        role: "Digital Marketer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/sarah",
        linkedinUrl: "https://linkedin.com/in/sarah"
      },
      // Add more members...
    ]
  }
  // Add more teams...
];