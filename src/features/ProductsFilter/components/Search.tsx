import Dropdown from '@/components/Dropdown';
import SearchField from '@/components/SearchField';
import { useProductsBySearchTerm } from '../hooks';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import classnames from 'classnames';
import { getProductKey } from '@/utils';

type ProductSearchProps = {
    className?: string;
};

const Search = ({ className }: ProductSearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const [activeIndex, setActiveIndex] = useState(-1);
    const navigate = useNavigate();

    const { data } = useProductsBySearchTerm(debouncedSearchTerm, 3, 20);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleProductClick = useCallback(
        (id: string) => () => {
            navigate(`/${id}`);
        },
        [navigate],
    );

    const hasSearchResults = data && data.length > 0;

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            const hasSearchResults = data && data.length > 0;

            if (!hasSearchResults) {
                return;
            }

            if (event.key === 'Enter' && !!data[activeIndex]) {
                navigate(`/${data[activeIndex].id}`);
            }

            if (event.key === 'Escape') {
                setSearchTerm('');
            }

            if (event.key === 'ArrowDown') {
                setActiveIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    if (data[nextIndex]) {
                        return nextIndex;
                    }
                    return 0;
                });
            }
            if (event.key === 'ArrowUp' && data && data.length > 0) {
                setActiveIndex((prevIndex) => {
                    const nextIndex = prevIndex - 1;
                    if (data[nextIndex]) {
                        return nextIndex;
                    }
                    return 0;
                });
            }
        },
        [data, navigate, activeIndex],
    );

    return (
        <div className={classnames('relative w-auto', className)}>
            <SearchField
                placeholder="Search..."
                onChange={handleInputChange}
                value={searchTerm}
                onKeyDown={handleKeyDown}
            />
            {hasSearchResults && (
                <Dropdown activeIndex={activeIndex}>
                    {data.map((product, index) => (
                        <Dropdown.Item
                            isActive={activeIndex !== -1 && index === activeIndex}
                            key={getProductKey(product)}
                            onClick={handleProductClick(product.id)}
                        >
                            {product.name} -{' '}
                            <span className="text-xs text-gray-400">{product.line}</span>
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            )}
        </div>
    );
};

export default Search;
