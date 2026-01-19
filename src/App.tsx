// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Projects from "./Components/projects";
import About from "./Components/about";
import Home from "./Components/home";

function App() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <Routes>
          <Route path="/" element={<h1>Welcome to my Engineering Portfolio</h1>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;