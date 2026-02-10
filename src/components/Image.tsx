import { useRef, useState } from 'react';
import ImageLoading from './ImageLoading';
import ImageError from './ImageError';

type ImageProps = {
    src: string;
    alt?: string;
};

const Image = ({ src, alt = '' }: ImageProps) => {
    const [status, setStatus] = useState({ src, isLoading: true, hasError: false });
    const imgRef = useRef<HTMLImageElement | null>(null);

    const isStale = status.src !== src;
    const isLoading = isStale ? true : status.isLoading;
    const hasError = isStale ? false : status.hasError;

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
                    onLoad={() => {
                        if (imgRef.current?.complete) {
                            setStatus({ src, isLoading: false, hasError: false });
                        }
                    }}
                    onError={() => {
                        setStatus({ src, isLoading: false, hasError: true });
                    }}
                />
            )}
        </>
    );
};

export default Image;
