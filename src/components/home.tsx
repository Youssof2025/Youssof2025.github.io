import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl mb-6">
        Hi, I'm Youssof
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground mb-8">
        Freshman at Colorado School of Mines specializing in PCB-Design, circuit design, and with a hobby in photography.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/projects">View Projects</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/photography">See Photography</Link>
        </Button>
      
        <Button variant="outline" asChild>
          <a 
            href="/Youssof-Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Home;