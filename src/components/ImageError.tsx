import classNames from 'classnames';

type ImageErrorProps = {
    className?: string;
};

const ImageError = ({ className }: ImageErrorProps) => {
    return (
        <svg
            className={classNames(
                'w-12 h-12 text-gray-300 animate-pulse absolute inset-0 m-auto',
                className,
            )}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
            <path
                d="M7 15L10 12L13 15L17 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 9H7.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M4 6L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

export default ImageError;
