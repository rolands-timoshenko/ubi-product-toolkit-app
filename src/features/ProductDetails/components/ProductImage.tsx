import Image from '@/components/Image';

type ProductImageProps = {
    src: string;
    alt?: string;
};

const ProductImage = ({ src, alt }: ProductImageProps) => {
    return (
        <div className="w-full max-w-full min-w-0 min-h-[200px] sm:h-[292px] sm:w-[292px] p-2 flex items-center justify-center overflow-hidden bg-gray-100 rounded-md relative">
            <Image src={src} alt={alt} />
        </div>
    );
};

export default ProductImage;
