import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const photos = [
  {
    src: '/images/photography/orions-belt.webp',
    title: 'Orion\'s Belt',
    category: 'Astrophotography',
    details: 'ISO 4000 | f/3.5 | 20s'
  },
  {
    src: '/images/photography/starry-night.webp',
    title: 'Starry Night',
    category: 'Astrophotography',
    details: 'ISO 3200 | f/3.5 | 20s'
  },
  {
    src: '/images/photography/moon.webp',
    title: 'The Moon',
    category: 'Astrophotography',
    details: 'ISO 125 | f/11 | 1/200s'
  },
  {
    src: '/images/photography/snowy-path.webp',
    title: 'Snowy Path',
    category: 'Landscape',
    details: 'ISO 360 | f/6.3 | 1/500s'
  },
  {
    src: '/images/photography/mountain-valley.webp',
    title: 'Mountain Valley',
    category: 'Landscape',
    details: 'ISO 100 | f/8 | 1/400s'
  },
  {
    src: '/images/photography/sunny-mountain.webp',
    title: 'Mountain Side',
    category: 'Landscape',
    details: 'ISO 100 | f/6.3 | 1/320s'
  },
  {
    src: '/images/photography/squirrel-in-snow.webp',
    title: 'Snowy Squirrel',
    category: 'Landscape',
    details: 'ISO 200 | f/6.3 | 1/500s'
  },
  {
    src: '/images/photography/snowy-south-table.webp',
    title: 'Winter South Table',
    category: 'Landscape',
    details: 'ISO 280 | f/6.3 | 1/500s'
  },
  {
    src: '/images/photography/lake-waves.webp',
    title: 'Lake Ripples',
    category: 'Landscape',
    details: 'ISO 100 | f/7.1 | 1/400s'
  },
  {
    src: '/images/photography/snow-fall.webp',
    title: 'Snow Fall',
    category: 'Landscape',
    details: 'ISO 16000 | f/5.6 | 1/500s'
  },
];

// 800px previews live in photography/thumbs/ under the same file name
const thumbOf = (src: string) => src.replace("/photography/", "/photography/thumbs/");

const PhotographyGallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, i) => (
          <button
            type="button"
            key={i}
            className="group overflow-hidden rounded-lg border bg-card shadow-sm cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setIndex(i)}
            aria-label={`Open ${photo.title}`}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={thumbOf(photo.src)}
                alt={photo.title}
                loading="lazy"
                decoding="async"
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
          </button>
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