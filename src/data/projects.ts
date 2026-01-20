export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
  imageUrl: string;
}

export const projectsData: Project[] = [
  {
    id: "trd-1",
    title: "Thermocouple Reading Device (TRD-1)",
    description: "A PCB Designed to measure the internal temperature of a custom made carbonfiber oven.",
    tags: ["Altium", "PCB-Design", "Board-Assembly"],
    content: "Lorem ipsum",
    imageUrl: "/images/projects/trd-1.jpeg"
  },
];