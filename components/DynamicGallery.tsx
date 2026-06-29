'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { GALLERY_DATA } from '@/lib/gallery';

interface GalleryEvent {
  id: string;
  name: string;
  url: string;
}

interface GalleryYearData {
  year: number;
  events: {
    [key: string]: GalleryEvent[];
  };
}

export function DynamicGallery() {
  const [gallery, setGallery] = useState<GalleryYearData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Load gallery data from static data (for static export)
    setGallery(GALLERY_DATA as GalleryYearData[]);
    setSelectedYear(GALLERY_DATA[0]?.year || null);
    setLoading(false);
  }, []);

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block animate-spin">
          <div className="h-12 w-12 border-4 border-sky-200 border-t-sky-600 rounded-full"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading gallery...</p>
      </div>
    );
  }

  const selectedData = gallery.find((g) => g.year === selectedYear);

  return (
    <div>
      {/* Year Selection */}
      {gallery.length > 0 && (
        <div className="mb-12 flex flex-wrap gap-4 justify-center">
          <div className="flex flex-wrap gap-3 justify-center">
            {gallery.map((g) => (
              <button
                key={g.year}
                onClick={() => setSelectedYear(g.year)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedYear === g.year
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {g.year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Events by Year */}
      {selectedData && Object.keys(selectedData.events).length > 0 ? (
        <div className="space-y-12">
          {Object.entries(selectedData.events).map(([eventName, images]) => (
            <div key={eventName} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-sky-600">
                {eventName}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="group cursor-pointer">
                    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                      {!imageErrors[image.id] ? (
                        <img
                          src={image.url}
                          alt={eventName}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          loading="lazy"
                          onError={() => handleImageError(image.id)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400">Image not found</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No images available for {selectedYear}</p>
        </div>
      )}
    </div>
  );
}
