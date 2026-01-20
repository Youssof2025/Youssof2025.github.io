import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Projects from "./components/projects";
import About from "./components/about";
import Home from "./components/home";
import Photography from "./components/photography";
import ProjectDetails from "./components/ProjectDetails";


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