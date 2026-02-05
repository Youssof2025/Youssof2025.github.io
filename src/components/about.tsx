const About = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="aspect-square rounded-2xl overflow-hidden border-4 border-muted shadow-xl">
            <img 
              src="/images/profile.jpg" 
              alt="Professional portrait" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
          
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am an Electrical Engineering student at the 
              <span className="text-foreground font-medium"> Colorado School of Mines</span>. I currently am in my freshman year, but I qualify as a junior by credits. My academic journey is centered around building a solid foundation in STEM, complemented by an interest in PCB-Design, board-assembly, hardware-design, and embedded systems.
            </p>
            
            <p>
              Beyond the classroom, I enjoy physical activity such as bouldering, hiking, and lifting. Additionally, I enjoy nature and landscape photography in my freetime since it allows me to express my creativity.
            </p>

            <p>
              I am currently searching for an electrical engineering internships in the Dallas area for the summer of 2026. Feel free to contact me at: youssof@youssoftech.dev
            </p>
          </div>

          <div className="pt-4 flex gap-4">
            <div className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">
              🎓 EE Student @ Mines
            </div>
          </div>
        </div>
      </div>
    
      <div className="space-y-8">
        <h2 className="text-3xl font-bold border-b pb-4">Technical Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Engineering Skills */}
          <div className="p-6 rounded-xl border bg-card space-y-4">
            <h3 className="text-xl font-semibold text-primary">Electrical Engineering</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Altium Designer</li>
              <li>Board Assembly & Soldering</li>
              <li>Circuit Design</li>
              <li>Circuit Analysis & Troubleshooting</li>
            </ul>
          </div>

          {/* Software Skills */}
          <div className="p-6 rounded-xl border bg-card space-y-4">
            <h3 className="text-xl font-semibold text-primary">Software</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Python, C++, C, C#</li>
              <li>Arduino</li>
              <li>React / Next.js</li>
              <li>Tailwind CSS</li>
              <li>Git / GitHub</li>
            </ul>
          </div>

          {/* Other */}
          <div className="p-6 rounded-xl border bg-card space-y-4">
            <h3 className="text-xl font-semibold text-primary">Other</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Nikon Z50II Operation</li>
              <li>Nature Photography</li>
              <li>Technical Writing</li>
              <li>Post-Processing (Lightroom)</li>
              <li>Microsoft Office Products</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;