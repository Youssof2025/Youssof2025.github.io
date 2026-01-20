
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
  }
];

const PhotographyGallery = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {photos.map((photo, index) => (
        <div key={index} className="group overflow-hidden rounded-lg border bg-card shadow-sm">
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
  );
};

export default PhotographyGallery;