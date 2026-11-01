import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";

// Route-level code splitting keeps three.js and the lightbox out of the initial bundle
const Home = lazy(() => import("./components/home"));
const Projects = lazy(() => import("./components/projects"));
const About = lazy(() => import("./components/about"));
const Photography = lazy(() => import("./components/photography"));
const ProjectDetails = lazy(() => import("./components/ProjectDetails"));
const NotFound = lazy(() => import("./components/NotFound"));


function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Nav />
      <main className="flex-1 p-8">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
export default App;
