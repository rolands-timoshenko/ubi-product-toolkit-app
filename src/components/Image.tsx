import { useEffect, useRef, useState } from 'react';
import ImageLoading from './ImageLoading';
import ImageError from './ImageError';

type ImageProps = {
    src: string;
    alt?: string;
};

const Image = ({ src, alt = '' }: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
    }, [src]);

    useEffect(() => {
        const img = imgRef.current;
        if (img && img.complete) {
            setIsLoading(false);
        }
    }, [src]);

    console.info('Rendering Image component with src:', src);

    return (
        <>
            {isLoading && !hasError && <ImageLoading className="object-contain w-full h-full" />}
            {hasError && <ImageError className="object-contain w-full h-full" />}
            {!hasError && (
                <img
                    ref={imgRef}
                    key={src}
                    src={src}
                    alt={alt}
                    className="object-contain w-full h-full"
                    style={{ visibility: isLoading ? 'hidden' : 'visible' }}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                />
            )}
        </>
    );
};

export default Image;
