import { Event } from "@/types/all"; // adjust the path as needed

export const mockEventData: Event[] = [
  {
    eventSlug: "mockstock",
    eventName: "Mockstock",
    about: "Simulate the stock market in a thrilling trading competition.",
    description: "Players compete in a virtual stock trading simulation, testing financial acumen.",
    rounds: [
      { number: "1", title: "Preliminary Round", about: "Basic trading tasks to filter participants.", mode: "Online" },
      { number: "2", title: "Final Round", about: "Advanced simulation with real-time challenges.", mode: "Online" }
    ],
    contact: [
      { name: "John Doe", number: "9876543210", link: "mailto:john@example.com" },
      { name: "Jane Smith", number: "9123456780", link: "" }
    ],
    faq: [
      { question: "Do I need prior knowledge of stock markets?", answer: "No, basic rules will be explained before the event." },
      { question: "Is it team-based?", answer: "Yes, teams of up to 3 participants are allowed." }
    ],
    sponsors: ["FinanceCorp", "StockSim"]
  },
  {
    eventSlug: "hacknpitch",
    eventName: "HackNPitch",
    about: "48-hour hackathon with pitching sessions for innovative ideas.",
    description: "Teams brainstorm, build, and pitch their tech-driven solutions.",
    rounds: [
      { number: "1", title: "Hackathon", about: "Teams work on solutions within 48 hours.", mode: "Offline" },
      { number: "2", title: "Pitch Round", about: "Top teams present ideas to judges.", mode: "Offline" }
    ],
    contact: [
      { name: "Alex Kumar", number: "9988776655", link: "mailto:alex@example.com" }
    ],
    faq: [
      { question: "Can I participate solo?", answer: "Yes, but team participation is encouraged." }
    ],
    sponsors: ["TechLabs", "InnovateX"]
  },
  {
    eventSlug: "dizmart",
    eventName: "Dizmart",
    about: "Marketing strategy competition where creativity meets business.",
    description: "Teams develop innovative marketing campaigns for real or hypothetical products.",
    rounds: [
      { number: "1", title: "Idea Round", about: "Submit your marketing strategy idea.", mode: "Online" },
      { number: "2", title: "Presentation Round", about: "Present your marketing strategy to judges.", mode: "Offline" }
    ],
    contact: [
      { name: "Riya Sen", number: "9876501234", link: "mailto:riya@example.com" }
    ],
    faq: [
      { question: "Is prior marketing experience required?", answer: "No, creativity is more important than experience." }
    ],
    sponsors: ["MarketMinds", "BrandBoost"]
  },
  {
    eventSlug: "summit-cup",
    eventName: "Summit Cup",
    about: "E-Summit’s sports & gaming championship event.",
    description: "Compete in e-sports and physical sports competitions.",
    rounds: [
      { number: "1", title: "Qualifier", about: "Teams compete in preliminary rounds.", mode: "Offline" },
      { number: "2", title: "Finals", about: "Top teams compete for the championship.", mode: "Offline" }
    ],
    contact: [
      { name: "Samir Gupta", number: "9123456789", link: "mailto:samir@example.com" }
    ],
    faq: [
      { question: "Can I participate in multiple games?", answer: "Yes, participants can register for multiple events." }
    ],
    sponsors: ["GameZone", "SportsHub"]
  },
  {
    eventSlug: "corporate-clash",
    eventName: "Corporate Clash",
    about: "Case study and strategy event where teams battle with ideas.",
    description: "Teams analyze corporate cases and present strategies to solve real-world problems.",
    rounds: [
      { number: "1", title: "Case Round", about: "Analyze a given corporate problem.", mode: "Online" },
      { number: "2", title: "Presentation Round", about: "Present your solution to judges.", mode: "Offline" }
    ],
    contact: [
      { name: "Neha Roy", number: "9988112233", link: "mailto:neha@example.com" }
    ],
    faq: [
      { question: "Can participants be from different colleges?", answer: "Yes, cross-college teams are allowed." }
    ],
    sponsors: ["BizStrategy", "ConsultCorp"]
  }
];
