export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  subRole?: string;
  description: string;
  imageUrl: string;

  // Each member has a fixed color and specialties
  colorHex: string;
  specialties: string[];

  projects: Project[];
}
