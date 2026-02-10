import Item from './Item';
import { useEffect, useRef } from 'react';

type DropdownProps = {
    children?: React.ReactNode;
    activeIndex?: number | null;
};

const Dropdown = ({ children, activeIndex }: DropdownProps) => {
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (activeIndex === null || activeIndex === undefined) {
            return;
        }

        const items = listRef.current?.querySelectorAll<HTMLElement>('[data-dropdown-item]');
        const activeItem = items?.[activeIndex];
        if (!activeItem) {
            return;
        }

        activeItem.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    return (
        <div className="absolute w-full mt-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20 max-h-60 overflow-y-auto">
            <ul ref={listRef}>{children}</ul>
        </div>
    );
};

Dropdown.Item = Item;
export default Dropdown;
