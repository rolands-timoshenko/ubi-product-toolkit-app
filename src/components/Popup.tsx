import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type PopupProps = {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
    onClickOutside?: () => void;
};

const Popup = ({ isOpen, children, className, onClickOutside }: PopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen || !onClickOutside) {
            return;
        }

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            if (!popupRef.current) {
                return;
            }
            if (popupRef.current.contains(event.target as Node)) {
                return;
            }
            onClickOutside();
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
        };
    }, [isOpen, onClickOutside]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={popupRef}
            className={classNames(
                'absolute inline-block w-fit mt-0 bg-white rounded-lg shadow-md overflow-hidden z-20 max-h-60 overflow-y-auto right-0 shadow-xl/30',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Popup;
