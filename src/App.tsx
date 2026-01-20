import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Projects from "./Components/projects";
import About from "./Components/about";
import Home from "./Components/home";
import Photography from "./Components/photography";
import ProjectDetails from "./Components/ProjectDetails";


function App() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;