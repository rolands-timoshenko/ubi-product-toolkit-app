import Dropdown from "@/components/Dropdown";
import SearchField from "@/components/SearchField";
import { useProductsBySearchTerm } from "@/hooks";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import classnames from "classnames";
import type { UbiProductSearchItem } from "@/domain/types";

type ProductSearchProps = {
    className?: string;
}

const getItemKey = (product: UbiProductSearchItem) => {
    return `${product.id}-${product.name}-${product.line}`;
}

const ProductSearch = ({ className }: ProductSearchProps) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const navigate = useNavigate();

    const { data, isLoading, isError } = useProductsBySearchTerm(debouncedSearchTerm, 3);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleProductClick = useCallback((id: string) => () => {
        navigate(`/${id}`);
    }, [navigate]);

    const hasSearchResults = data && data.length > 0;

    return (
        <div className={classnames("relative w-auto", className)}>
            <SearchField placeholder="Search..." onChange={handleInputChange} value={searchTerm} />
            {hasSearchResults && <Dropdown>
                {data.map((product) => <Dropdown.Item key={getItemKey(product)} onClick={handleProductClick(product.id)}>{product.name}</Dropdown.Item>)}
            </Dropdown>}
        </div>
    );
}

export default ProductSearch;