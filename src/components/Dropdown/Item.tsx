type ItemProps = {
    onClick?: () => void;
    children?: React.ReactNode;
    isActive?: boolean;
};

const Item = ({ children, isActive = false, onClick }: ItemProps) => {
    return (
        <li className="p-0 m-0" data-dropdown-item>
            <button
                onClick={onClick}
                data-active={isActive}
                className="px-2 py-2 w-full border-1 border-transparent cursor-pointer text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:border-1 active:text-gray-900 active:bg-gray-100 focus:border-blue-500 focus:bg-white data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900"
            >
                {children}
            </button>
        </li>
    );
};

export default Item;
