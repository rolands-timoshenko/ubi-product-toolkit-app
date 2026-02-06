import classNames from 'classnames';

type ImageLoadingProps = {
    className?: string;
};

const ImageLoading = ({ className }: ImageLoadingProps) => {
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
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path
                d="M12 7V12L15 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ImageLoading;
