import classNames from 'classnames';

type ImageErrorProps = {
    className?: string;
};

const ImageError = ({ className }: ImageErrorProps) => {
    return (
        <svg
            className={classNames('w-12 h-12 text-gray-300 absolute inset-0 m-auto', className)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
            <path
                d="M5.5 16L9.5 12L12.5 15L16.5 11L19 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="8.5" cy="9" r="1.5" fill="currentColor" />
        </svg>
    );
};

export default ImageError;
