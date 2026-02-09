import PageLoader from '@/components/PageLoader';
import ProductsFilter from '@/features/ProductsFilter';
import { default as ProductListFeature } from '@/features/ProductsList';
import { Suspense } from 'react';

const ProductsList = () => {
    return (
        <div className="flex flex-col gap-4 h-full absolute top-0 left-0 right-0 pt-4 px-2">
            <ProductsFilter />
            <Suspense fallback={<PageLoader />}>
                <ProductListFeature />
            </Suspense>
        </div>
    );
};

export default ProductsList;
