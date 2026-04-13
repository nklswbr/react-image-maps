import React, { useState, useEffect, useRef } from 'react';

export interface Area {
  shape?: 'rect' | 'circle' | 'poly';
  coords: number[];
  alt?: string;
  href?: string;
  onClick?: (area: Area) => void;
}

export interface ReactImageMapsProps {
  src: string;
  alt?: string;
  mapName: string;
  areas: Area[];
  originalWidth: number;
}

const ReactImageMaps: React.FC<ReactImageMapsProps> = ({ src, alt, mapName, areas, originalWidth }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (imgRef.current && originalWidth) {
        setScale(imgRef.current.offsetWidth / originalWidth);
      }
    };
    const observer = new ResizeObserver(handleResize);
    if (imgRef.current) observer.observe(imgRef.current);
    handleResize();
    return () => observer.disconnect();
  }, [originalWidth]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <img ref={imgRef} src={src} alt={alt} useMap={`#${mapName}`} style={{ display: 'block', width: '100%', height: 'auto' }} />
      <map name={mapName}>
        {areas.map((area, i) => (
          <area
            key={i}
            shape={area.shape || 'rect'}
            coords={area.coords.map(c => Math.round(c * scale)).join(',')}
            alt={area.alt}
            href={area.href || '#'}
            onClick={(e) => { if (area.onClick) { e.preventDefault(); area.onClick(area); } }}
          />
        ))}
      </map>
    </div>
  );
};

export default ReactImageMaps;
