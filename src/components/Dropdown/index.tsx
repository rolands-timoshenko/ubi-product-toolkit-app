import Item from './Item';

type DropdownProps = {
    children?: React.ReactNode;
};

const Dropdown = ({ children }: DropdownProps) => {
    return (
        <div className="absolute w-full mt-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20 max-h-60 overflow-y-auto">
            <ul>{children}</ul>
        </div>
    );
};

Dropdown.Item = Item;
export default Dropdown;
