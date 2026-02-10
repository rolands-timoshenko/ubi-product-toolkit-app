import classNames from 'classnames';

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    isActive?: boolean;
    disabled?: boolean;
    hasShadow?: boolean;
};

const Button = ({
    children,
    onClick,
    isActive = false,
    disabled = false,
    hasShadow = false,
}: ButtonProps) => {
    return (
        <button
            className={classNames(
                'bg-white px-2 border border-transparent py-1 rounded cursor-pointer \
            hover:bg-gray-100 \
            focus:border-sky-500 focus:bg-white \
            data-[active=true]:text-sky-500 data-[active=true]:border-transparent data-[active=true]:bg-gray-100',
                {
                    'shadow-sm hover:shadow-md': hasShadow,
                    'cursor-not-allowed opacity-50': disabled,
                },
            )}
            data-active={isActive}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
