import Image from './Image';

type ImageIconProps = {
    src: string;
    alt?: string;
};

const ImageIcon = ({ src, alt }: ImageIconProps) => {
    return (
        <div className="w-[25px] h-[25px] flex items-center justify-center overflow-hidden relative">
            <Image src={src} alt={alt} />
        </div>
    );
};

export default ImageIcon;
