export interface MerchOrder {
  orderId: string;
  name: string;
  email: string;
  phone: string | null;
  amount: number;
  status: string;
  size: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
}
export interface EventTeam {
  id: string;
  eventSlug: string;
  teamName: string;
  members: TeamMember[];
}

export interface UnstopData {
  "Team ID": string;
  "Team Name": string;
  "Candidate Role": string;
  "Candidate's Name": string;
  "Candidate's Email": string;
  "Candidate's Gender": string;
  "Candidate's Location": string;
  "Candidate's Mobile": string;
  "Candidate's Organisation": string;
  Course: string;
  "Course Duration": string;
  "Course Type": string;
  "Differently Abled": string;
  Domain: string;
  "Ref Code": string;
  "Reg. Status": string;
  "Registration Time": string;
  Resume: string;
  Specialization: string;
  "User type": string;
  "Work Experience": string;
  "Year of Graduation": string;
}
