import { useState } from 'react';
import ImageLoading from './ImageLoading';
import ImageError from './ImageError';

type ImageProps = {
    src: string;
    alt?: string;
};

const Image = ({ src, alt = '' }: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    return (
        <>
            {isLoading && !hasError && <ImageLoading className="object-contain w-full h-full" />}
            {hasError && <ImageError className="object-contain w-full h-full" />}
            {!hasError && (
                <img
                    src={src}
                    alt={alt}
                    className="object-contain w-full h-full"
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
