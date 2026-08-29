export interface ProjectSection {
  type: "text" | "side-by-side" | "full-image" | "equation";
  text?: string;
  imagePath?: string;
  reverse?: boolean;
  math?: string;       
  caption?: string;
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
    id: "ADC Analog Board",
    title: "ADC Analog Board",
    description: "A PCB designed to filter and clean the analog sensor data from 12 linear potentiometer inputs using a 16-bit ADC.",
    tags: ["Mixed-signal design", "Altium Designer", "PCB-Design", "Board-Assembly", "DAQ", "Ethernet (RMII)", "Formula SAE", "16-bit ADC", "Analog", "CAN", "STM32", "Layer Stack-up"],
    imageUrl: "/images/projects/ADC_Analog/ADC_3D.png",
    sections: [
      {
      type: "text",
      text: "ADC analog board write up coming soon! In the meantime, feel free to look at the project gallery :)"
      },
    ],
    gallery: [
      "/images/projects/ADC_Analog/ADC_Layout.png",
      "/images/projects/ADC_Analog/ADC_3D.png",
      "/images/projects/ADC_Analog/ADC_STM.png",
      "/images/projects/ADC_Analog/ADC_Top.png",
      "/images/projects/ADC_Analog/ADC_Connectors.png",
      "/images/projects/ADC_Analog/ADC_Ethernet.png",
      "/images/projects/ADC_Analog/ADC_LowPass.png",
      "/images/projects/ADC_Analog/ADC_PGA.png",
      "/images/projects/ADC_Analog/ADC_Power.png"
    ]
  },
  {
    id: "HFSS Simulation",
    title: "HFSS Simulation Study",
    description: "A simulation designed to evaluate impedance matching and high-frequency signal integrity across a transmission line and connector interface.",
    tags: ["Ansys HFSS"],
    imageUrl: "/images/projects/HFSS_Simulation/HFSS_Sub.png",
    sections: [
      {
      type: "text",
      text: "HFSS Simulation write up coming soon! In the meantime, feel free to look at the project gallery :)"
      },
    ],
    gallery: [
      "/images/projects/HFSS_Simulation/HFSS_Animation.png",
    ]
  },
  {
    id: "stm-devboard",
    title: "Advanced STM32 Development Board",
    description: "A development PCB designed to help troubleshoot an FSAE car using an Arduino.",
    tags: ["STM32", "Buck-Converter", "Altium", "PCB-Design", "Board-Assembly"],
    imageUrl: "/images/projects/Dev_Board/devboard-full.jpg",
    sections: [
      {
        type: "text",
        text: "The Advanced STM32 Development board was designed to allow the software team to run more elaborate tests on the Mines FSAE car and be able to identify points of improvement."
      },
      {
        type: "full-image",
        imagePath: "/images/projects/Dev_Board/devboard-pcb.png",
      },
      {
        type: "side-by-side",
        text: "Using Altium Designer, me and a teammate developed the schematic and focused on including a range of useful features for the software team. For instance, an SD-Card reader, CAN transceivers, SPI pins, I2C, JTAG for power redundancy, USB-C for power and data transfer, a tactile reset switch, a boot dip switch, and most importantly, arduino pins. The arduino pins are the most crucial part of the development board because it allows the utilization of an arduino uno for further testing purposes. The female header pins (J5, J6, J7, J8) are precisely measured to match the dimensions of an arduino uno. The board can handle up to 12V thanks to the buck-converter stepping down the voltage to 5V which the LDO can now step down even further to 3.3V which then goes into the rest of the components. Additionally, there is reverse polarity protection on the board as well as electrostatic shock protection.",
        imagePath: "/images/projects/Dev_Board/devboard-schematic.png",
        reverse: false
      },
      {
        type: "side-by-side",
        text: "The physical board assembly involved soldering all of the conectivity componnents (USB-C, CAN transceivers, JTAG, SPI, boot dip switch, etc). Due to an error in component ordering, the manufacturer did not have the necessary capacitors for the LDO which resulted in having to think of a more creative solution. In this case, we opted with using two 4.7 μF electrolytic capacitors in their place instead. Additionally, the manufacterer sent the wrong pins for SPI which resulted in us having to bend the bottom pins in order to make them fit on to the board. Nonetheless, board assembly was very successful with minimal to no damage on this development board. Finally, after placing the board in an ultrasonic cleaner to ensure that there are no bridged connections with any remaining loose solder, I plugged the board into a laptop using USB-C and the power LED lit up with no issues. The only remaining steps at this time is to hand the board over to the software team and allow them to do the necessary programmig using CubeIDE.",
        imagePath: "/images/projects/Dev_Board/devboard-full.jpg",
        reverse: true
      }
    ],
    gallery: [
      "/images/projects/Dev_Board/devboard-pcb.png",
      "/images/projects/Dev_Board/devboard-schematic.png",
      "/images/projects/Dev_Board/devboard-full.jpg",
      "/images/projects/Dev_Board/devboard-empty.jpg",
    ]
  },
  {
    id: "oscilloscope-summer",
    title: "Mini-Oscilloscope",
    description: "A 4-Layer PCB designed to measure voltage signals between -10 and +10 Volts.",
    tags: ["Altium", "PCB-Design", "Board-Assembly", "Analog", "STM32", "ADC", "USB", "I2C", "Embedded systems", "Mixed-signal design", "LTSpice"],
    imageUrl: "/images/projects/Oscilloscope/Oscilloscope-routing-3D.png",
    sections: [
      {
        type: "text",
        text: "This Mini-Oscilloscope is a 4-layer PCB project designed to aid me in learning as much as possible about analog and digital PCB design. It was initially designed to measure signals between -10 and +10 volts. It includes a BNC connector and a mechanical encoder for adjusting the scale and navigate through the 0.96 Inch I2C OLED screen. As a little fun touch to this board, I added the main character of my favorite game 'Hollow Knight' as a silkscreen to the back of the board."
      },
      {
        type: "full-image",
        imagePath: "/images/projects/Oscilloscope/Oscilloscope-routing-2D.png",
      },
      {
        type: "text",
        text: "Originally, I sized R7/R8/R10 for a ±10V input range, but I miscalculated the divider math. As built, R7 (1MΩ) and R8(100kΩ) actually gave a much wider input range, which was about -16.5V to +19.8V, which ends up using less than 3.3V (55% of the ADC's actual voltage swing for a ±10V range). In order to get a ±10V range using the full ADC resolution, I will need R8 = 200kΩ and R10 = 15kΩ instead. Since I want to fully utilize the ADC resolution, I decided that I will fix the PCB manually. This is not a very hard fix since it will simply include me hand soldering two 0402 sized resistors. Next time, in order to avoid a small blunder like this, I will use SPICE in order to simulate the divider before finalizing any values. Please refer to the following equations to understand where I made the mistake with the voltage divider. Note: The following equations were derived from Ohm's law and Kirchhoff's current law and these are the resulting equations."
      },
      {
        type: "equation",
        math: "k = \\frac{100k}{1M + 100k} = 0.0909"
      },
      {
        type: "equation",
        math: "V_{bias} = 3.3V \\times \\frac{10k}{20k} = 1.65V",
        caption: "This is the bug where it was assumed there was no interaction with R7/R8 at all"
      },
      {
        type: "equation",
        math: "V_{in,min} = \\frac{0 - (0.909)(1.65)}{0.0909} = -16.5V"
      },
      {
        type: "equation",
        math: "V_{in,max} = \\frac{3.3 - (0.909)(1.65)}{0.0909} = +19.8V"
      },
      {
        type: "full-image",
        imagePath: "/images/projects/Oscilloscope/Oscilloscope-Analog-schematic.png",
      },
      {
        type: "text",
        text: "These values are the wrong values since I was aiming for ±10V but ended up with -16.5 and +19.8 Volts. Specifically, the k value and V_Bias were not consistent with each other and resulted in the incorrect voltage range even though at a first glance the k and V_Bias seemed fine in isolation. My mistake came when I did not account for R8's dual role in setting the scaling factor k, as well as V_Bias at the same time. In short, I solved for k on its own without checking what the same resistor value did to the V_Bias. The corrected values were R8=200kΩ and R10=15kΩ."
      },
      {
        type: "equation",
        math: "k = \\frac{200k}{1M + 200k} = 0.1667"
      },
      {
        type: "equation",
        math: "V_{bias} = 3.3V \\times \\frac{15k}{25k} = 1.98V",
        caption: "Now R7/R8 were compensated for and taken into account"
      },
      {
        type: "equation",
        math: "V_{in,min} = \\frac{0 - (0.833)(1.98)}{0.1667} = -9.9V \\approx -10V"
      },
      {
        type: "equation",
        math: "V_{in,max} = \\frac{1.65V}{k} = \\frac{1.65}{0.1667} = 9.9V \\approx 10V"
      },
      {
        type: "text",
        text: "With R8 and R10 solved as a coupled system rather than independently, the full ADC range now maps onto the ±10V signal I originally intended to measure.",
      },
      {
        type: "full-image",
        imagePath: "/images/projects/Oscilloscope/Oscilloscope-LTSpice.png"
      },
      {
        type: "text",
        text: "For a future re-design of this board, I simulated a simpler Op-Amp circuit in LTSpice that will perfectly fall within the ADC's range of 0V to 3.3V and therefore utilizing its full resolution. My original board used a two-resistor divider plus a separate op-amp stage just to generate the DC bias reference. This new design completely eliminates that extra stage entirely. A third resistor (R2) pulls the bias directly off the 3.3V rail into the same summing node as the input signal, so essentially one op-amp will do the trick.",
      },
      {
        type: "text",
        text: "With R1 = 1MΩ, R2 = 330kΩ, and R3 = 499kΩ, a ±10V input signal maps almost exactly onto the ADC's 0-3.3V range, which was verified by the simulation as it bottoms out at 0V and tops out at 3.3V, using the full ADC resolution rather than the previous 55% utilization my original design achieved.",
      },
      {
        type: "side-by-side",
        imagePath: "/images/projects/Oscilloscope/Oscilloscope-STM-schematic.png",
        text: "Here I decided to go with an STM32F0 series (STM32F070CBT6) due to it having USB Full-Speed peripheral, I2C, and ample GPIO pins for other components such as the ADC and LEDs. It also includes SPI and USART but I did not need these two protocols for this specific project. Additionally, I used STM32CubeMX to verify the pin layout when schematic capturing the project. I also chose this MCU because I liked its form factor and because it was cheap and did the job. I also decided to add an external oscillator to ensure accurate USB timing as well as for the ADC sampling. Initially, I was going to go with an RP2040 as the MCU for this project, but then I decided against it since I would need to include external flash memory for it as well."
      },
      {
        type: "full-image",
        imagePath: "/images/projects/Oscilloscope/Oscilloscope-MX.png",
      },
      {
        type: "side-by-side",
        reverse: true,
        imagePath: "/images/projects/Oscilloscope/Oscilloscope-Connectors-schematic.png",
        text: "For the connectivity of this board, I decided to keep it simple. I included a USB-C for both powering the board and also programming it in C++ using STM32CubeIDE. D3 is an ESD protection diode as an additional safety barrier against static. Furthermore, I decided to use a 4 pin female header to connect an external 0.96 inch OLED I2C screen to the board and use it as the oscilloscope's display. Additionally, I added a 1kHz test pin so that I can confirm the functionality of the baord and ensure no glaring issues with the ADC or the board. The encoder here is to navigate through the screen and also adjust any necessary values once the board is programmed.",
      },
      {
        type: "side-by-side",
        reverse: true,
        imagePath: "/images/projects/Oscilloscope/Oscilloscope-LDO-schematic.png",
        text: "For this board's power management I decided to go with a very simple LDO setup where it takes in 5V from the USB and output 3.3V to use throughout the entire board. The layer stackup of this board was very simple: Layer 1 - Signal, Layer 2 - 3.3V Power, Layer 3 - GND, Layer 4 - Signal. Having dedicated Power and GND layers made routing much easier and much more effecient since I could simply via into the desired plane whenever I need either power or GND.",
      },
      {
        type: "text",
        text: "I have recently started getting more interested in mixed-signal PCB design, especially with the analog side, and this project was a great opportunity to dive deeper. Specifically, I learned that you should try to keep the analog side of the board (OP-amps and ADC) as far away as possible from the digital side in order to reduce the chances of crosstalk and interference. So, I had to keep that in mind when designing and routing the physical PCB. Additionally, I learned how to properly calculate resistor values for an ADC system to ensure that I get a specific voltage range. The experience I gained from this project will help with designing a current board for Mines FSAE (ATD-5 ADC Board), which is an analog board responsible for gathering all the information from 12 linear potentiometer inputs on the car. The knoweldge I gained from this project will also help with designing any future mixed-signal boards for the FSAE team.",
      },
    ],
    gallery: [
      "/images/projects/Oscilloscope/Oscilloscope-STM-schematic.png",
      "/images/projects/Oscilloscope/Oscilloscope-Connectors-schematic.png",
      "/images/projects/Oscilloscope/Oscilloscope-Analog-schematic.png",
      "/images/projects/Oscilloscope/Oscilloscope-LDO-schematic.png",
      "/images/projects/Oscilloscope/Oscilloscope-LTSpice.png",
      "/images/projects/Oscilloscope/Oscilloscope-routing-3D.png",
      "/images/projects/Oscilloscope/Oscilloscope-routing-2D.png",
      "/images/projects/Oscilloscope/Oscilloscope-MX.png",
      "/images/projects/Oscilloscope/Oscilloscope-Hollow-Knight.png",
    ]
  },
  {
    id: "trd-1",
    title: "Thermocouple Reading Device (TRD-1)",
    description: "A PCB designed to measure the internal temperature of a custom made carbonfiber oven.",
    tags: ["Altium", "PCB-Design", "Board-Assembly"],
    imageUrl: "/images/projects/TRD/trd-1.jpeg",
    sections: [
      {
        type: "text",
        text: "The TRD-1 was developed to monitor the internal temperatures for a custom built carbon fiber oven for the Mines Formula SAE team, ensuring precise thermal monitoring during the curing process to ensure optimal results for the car."
      },
      {
        type: "full-image",
        imagePath: "/images/projects/TRD/trd-1-pcb.png",
      },
      {
        type: "side-by-side",
        text: "Using Altium Designer, I developed the schematic and focused on using a high-accuracy thermocouple signal to handle the wide temperature ranges required by the oven. I created 4 different schematics: an STM32 schematic, a power handling schematic with an LDO and LED status indicator, a connections schematic handling the high-speed USB-C signal, and a thermocouple signal circuit schematic designed to detect a temperature difference and amplify the signal into a usable volate range.",
        imagePath: "/images/projects/TRD/trd-1-schematic.png",
        reverse: false
      },
      {
        type: "side-by-side",
        text: "The physical board assembly involved precision soldering and component placement to maintain signal integrity in a high-temperature environment. It involed soldering 0402 resistors and capacitors in very specific spots, a USB-C port, an STM32, and a wide variety of components such as a JTAG and tactile switches. It taught me how to effectively use a soldering iron, a heat gun, flux, a reflow oven, and how to trouble shoot certain issues such as bridged connections. Additionally, the USB-C port proved to be difficult to solder since it was the wrong configuration for this board and would not create a stable connection. Hence, the headers and JTAG connectors will be utilized for power and signal.",
        imagePath: "/images/projects/TRD/trd-1.jpeg",
        reverse: true
      }
    ],
    gallery: [
      "/images/projects/TRD/trd-1-pcb.png",
      "/images/projects/TRD/trd-1-schematic.png",
      "/images/projects/TRD/trd-1.jpeg",
      "/images/projects/TRD/trd-1-empty.jpeg",
    ]
  },
];