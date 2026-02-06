import Image from './Image';

type ImageIconProps = {
    src: string;
    alt?: string;
};

const ImageThumbnail = ({ src, alt }: ImageIconProps) => {
    return (
        <div className="w-[100px] h-[100px] p-2 flex items-center justify-center overflow-hidden rounded-md relative">
            <Image src={src} alt={alt} />
        </div>
    );
};

export default ImageThumbnail;
