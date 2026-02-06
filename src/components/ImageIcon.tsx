type ImageIconProps = {
    url: string;
};

const ImageIcon = ({ url }: ImageIconProps) => {
    return (
        <div className="w-[25px] h-[25px] flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
            <img src={url} alt="Product" className="w-25 object-cover" />
        </div>
    );
};

export default ImageIcon;
