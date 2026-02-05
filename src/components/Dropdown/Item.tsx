type ItemProps = {
    onClick?: () => void;
    children?: React.ReactNode;
}

const Item = ({ children, onClick }: ItemProps) => {
    return (
        <li className="p-0 m-0">
            <button onClick={onClick} className="px-2 py-2 w-full border-1 border-transparent cursor-pointer text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:border-1 focus:border-blue-500">
                {children}
            </button>
        </li>
    );
}

export default Item;