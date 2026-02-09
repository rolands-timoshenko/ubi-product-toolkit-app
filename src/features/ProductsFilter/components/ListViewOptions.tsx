import Button from '@/components/Button';
import { useProductListingState } from '@/state';
import { ProductListingType } from '@/types';
import { List, Grid2x2 } from 'lucide-react';
import { useCallback } from 'react';

const ListViewOptions = () => {
    const { listType, setListType } = useProductListingState();

    const handleListTypeChange = useCallback(
        (type: ProductListingType) => () => {
            setListType(type);
        },
        [setListType],
    );

    return (
        <div className="flex gap-1">
            <Button
                isActive={listType === ProductListingType.LIST}
                onClick={handleListTypeChange(ProductListingType.LIST)}
            >
                <List />
            </Button>
            <Button
                isActive={listType === ProductListingType.GRID}
                onClick={handleListTypeChange(ProductListingType.GRID)}
            >
                <Grid2x2 />
            </Button>
        </div>
    );
};

export default ListViewOptions;
