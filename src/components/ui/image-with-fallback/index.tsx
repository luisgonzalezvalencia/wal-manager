import React, { useState } from 'react';

interface Props extends React.ComponentPropsWithRef<'img'> {
  fallbackSrc: string;
}

const ImageWithFallback: React.FC<Props> = ({ src: externalSrc, fallbackSrc, ...props }) => {
  const [src, setSrc] = useState(externalSrc);

  const onError = () => {
    setSrc(fallbackSrc);
  };

  return <img onError={onError} src={src} {...props} />;
};

export default ImageWithFallback;
