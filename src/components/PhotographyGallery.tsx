import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const photos = [
  {
    src: '/images/photography/moon.jpg',
    title: 'The Moon',
    category: 'Astrophotography',
    details: 'ISO 125 | f/11 | 1/200s'
  },
  {
    src: '/images/photography/snowy-path.JPG',
    title: 'Snowy Path',
    category: 'Landscape',
    details: 'ISO 360 | f/6.3| 1/500s'
  },
  {
    src: '/images/photography/mountain-valley.JPG',
    title: 'Mountain Valley',
    category: 'Landscape',
    details: 'ISO 100 | f/8| 1/400s'
  },
  {
    src: '/images/photography/sunny-mountain.JPG',
    title: 'Mountain Side',
    category: 'Landscape',
    details: 'ISO 100 | f/6.3| 1/320s'
  }
];

const PhotographyGallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, i) => (
          <div 
            key={i} 
            className="group overflow-hidden rounded-lg border bg-card shadow-sm cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <div className="aspect-square overflow-hidden">
              <img 
                src={photo.src} 
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-lg">{photo.title}</h3>
                <span className="text-xs font-medium px-2 py-1 bg-secondary rounded">{photo.category}</span>
              </div>
              <p className="text-sm text-muted-foreground font-mono">{photo.details}</p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Captions]}
        slides={photos.map((p) => ({
          src: p.src,
          title: p.title,
          description: p.details,
        }))}
      />
    </div>
  );
};

export default PhotographyGallery;