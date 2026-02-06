import ImageError from '@/components/ImageError';
import ImageLoading from '@/components/ImageLoading';
import { useState } from 'react';

const ProductImage = ({ url }: { url: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="w-[100%] sm:h-[292px] sm:w-[292px] p-2 flex items-center justify-center overflow-hidden bg-gray-100 rounded-md relative">
            {isLoading && !hasError && <ImageLoading />}
            {hasError && <ImageError />}
            {!hasError && (
                <img
                    src={hasError ? undefined : url}
                    alt="Product"
                    className="object-contain w-full h-full"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                />
            )}
        </div>
    );
};

export default ProductImage;
