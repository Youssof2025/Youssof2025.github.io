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
    description: "A PCB designed to measure the internal temperature of a custom made carbonfiber oven.",
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
  {
    id: "stm-devboard",
    title: "Advanced STM32 Development Board",
    description: "A development PCB designed to measure the internal temperature of a custom made carbonfiber oven.",
    tags: ["STM32", "Buck-Converter", "Altium", "PCB-Design", "Board-Assembly"],
    imageUrl: "/images/projects/devboard-full.jpg",
    sections: [
      {
        type: "text",
        text: "The Advanced STM32 Development board was designed to allow the software team to run more elaborate tests on the Mines FSAE car and be able to identify points of improvement."
      },
      {
        type: "full-image",
        imagePath: "/images/projects/devboard-pcb.png",
      },
      {
        type: "side-by-side",
        text: "Using Altium Designer, me and a teammate developed the schematic and focused on including a range of useful features for the software team. For instance, an SD-Card reader, CAN transceivers, SPI pins, I2C, JTAG for power redundancy, USB-C for power and data transfer, a tactile reset switch, a boot dip switch, and most importantly, arduino pins. The arduino pins are the most crucial part of the development board because it allows the utilization of an arduino uno for further testing purposes. The female header pins (J5, J6, J7, J8) are precisely measured to match the dimensions of an arduino uno. The board can handle up to 12V thanks to the buck-converter stepping down the voltage to 5V which the LDO can now step down even further to 3.3V which then goes into the rest of the components.",
        imagePath: "/images/projects/devboard-schematic.png",
        reverse: false
      },
      {
        type: "side-by-side",
        text: "The physical board assembly involved soldering all of the conectivity componnents (USB-C, CAN transceivers, JTAG, SPI, boot dip switch, etc). Due to an error in component ordering, the manufacturer did not have the necessary capacitors for the LDO which resulted in having to think of a more creative solution. In this case, we opted with using two 4.7 μF electrolytic capacitors in their place instead. Additionally, the manufacterer sent the wrong pins for SPI which resulted in us having to bend the bottom pins in order to make them fit on to the board. Nonetheless, board assembly was very successful with minimal to no damage on this development board. Finally, after placing the board in an ultrasonic cleaner to ensure that there are no bridged connections with any remaining loose solder, I plugged the board into a laptop using USB-C and the power LED lit up with no issues. The only remaining steps at this time is to hand the board over to the software team and allow them to do the necessary programmig using CubeIDE.",
        imagePath: "/images/projects/devboard-full.jpg",
        reverse: true
      }
    ],
    gallery: [
      "/images/projects/devboard-pcb.png",
      "/images/projects/devboard-schematic.png",
      "/images/projects/devboard-full.jpg",
      "/images/projects/devboard-empty.jpg",
    ]
  },
];