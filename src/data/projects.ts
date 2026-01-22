export interface ProjectSection {
  type: "text" | "side-by-side" | "full-image";
  text?: string;
  imagePath?: string;
  reverse?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  sections: ProjectSection[];
  gallery?: string[];
}

export const projectsData: Project[] = [
  {
    id: "trd-1",
    title: "Thermocouple Reading Device (TRD-1)",
    description: "A PCB Designed to measure the internal temperature of a custom made carbonfiber oven.",
    tags: ["Altium", "PCB-Design", "Board-Assembly"],
    imageUrl: "/images/projects/trd-1.jpeg",
    sections: [
      {
        type: "text",
        text: "The TRD-1 was developed to monitor the internal temperatures for a custom built carbon fiber oven for the Mines Formula SAE team, ensuring precise thermal monitoring during the curing process to ensure optimal results for the car."
      },
      {
        type: "full-image",
        imagePath: "/images/projects/trd-1-pcb.png",
      },
      {
        type: "side-by-side",
        text: "Using Altium Designer, I developed the schematic and focused on using a high-accuracy thermocouple signal to handle the wide temperature ranges required by the oven. I created 4 different schematics: an STM32 schematic, a power handling schematic with an LDO and LED status indicator, a connections schematic handling the high-speed USB-C signal, and a thermocouple signal circuit schematic designed to detect a temperature difference and amplify the signal into a usable volate range.",
        imagePath: "/images/projects/trd-1-schematic.png",
        reverse: false
      },
      {
        type: "side-by-side",
        text: "The physical board assembly involved precision soldering and component placement to maintain signal integrity in a high-temperature environment. It involed soldering 0402 resistors and capacitors in very specific spots, a USB-C port, an STM32, and a wide variety of components such as a JTAG and tactile switches. It taught me how to effectively use a soldering iron, a heat gun, flux, a reflow oven, and how to trouble shoot certain issues such as bridged connections. Additionally, the USB-C port proved to be difficult to solder since it was the wrong configuration for this board and would not create a stable connection. Hence, the headers and JTAG connectors will be utilized for power and signal.",
        imagePath: "/images/projects/trd-1.jpeg",
        reverse: true
      }
    ],
    gallery: [
      "/images/projects/trd-1-pcb.png",
      "/images/projects/trd-1-schematic.png",
      "/images/projects/trd-1.jpeg",
      "/images/projects/trd-1-empty.jpeg",
    ]
  },
];