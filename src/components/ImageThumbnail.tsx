type ImageIconProps = {
    url: string;
};

const ImageThumbnail = ({ url }: ImageIconProps) => {
    return (
        <div className="w-[50px] h-[50px] flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
            <img src={url} alt="Product" className="object-cover" />
        </div>
    );
};

export default ImageThumbnail;
