import Button from '@/components/Button';
import { useProductListingState } from '@/state';
import { List, Grid2x2 } from 'lucide-react';

const ProductListingSetup = () => {
    const { listType, setListType } = useProductListingState();
    return (
        <div className="flex gap-1">
            <Button isActive={listType === 'list'} onClick={() => setListType('list')}>
                <List />
            </Button>
            <Button isActive={listType === 'grid'} onClick={() => setListType('grid')}>
                <Grid2x2 />
            </Button>
        </div>
    );
};

export default ProductListingSetup;
