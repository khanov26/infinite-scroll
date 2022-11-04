import React, { FC, useEffect, useState } from 'react';

interface Props {
  images: string[];
}

const ProductGallery: FC<Props> = ({ images }) => {
  const [active, setActive] = useState(0);

  const activeImage = images[active];

  useEffect(() => {
    images.forEach(image => {
      new Image().src = image;
    });
  }, [images]);

  return (
    <div
      className="d-flex justify-content-center align-items-center pb-1"
      style={{ position: 'relative', height: '200px' }}
    >
      <img
        className="mw-100 mh-100"
        style={{
          objectFit: 'contain',
          objectPosition: 'center',
        }}
        src={activeImage}
        alt=""
      />

      {images.length > 1 && (
        <>
          <div
            className="row"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            {images.map((_, index) => (
              <div
                key={index}
                className="col"
                onMouseEnter={() => setActive(index)}
              />
            ))}
          </div>

          <div
            className="row g-1 mt-1"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            {images.map((_, index) => (
              <div className="col">
                <div
                  key={index}
                  className="bg-secondary rounded-pill"
                  style={{
                    height: '1px',
                    transformOrigin: 'bottom',
                    transform: `scaleY(${index === active ? 2 : 1})`,
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGallery;
