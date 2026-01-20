import PhotographyGallery from "./PhotographyGallery"

const Photography = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Photography</h1>
      <p className="text-muted-foreground mb-8">Capturing the world and its beauty through the lens of a Nikon Z50II.</p>
      <PhotographyGallery />
    </div>
  );
};

export default Photography;