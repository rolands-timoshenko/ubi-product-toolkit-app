import { ErrorBoundary } from '@/components/ErrorBoundary';
import PageError from '@/components/PageError';
import PageLoader from '@/components/PageLoader';
import ProductsFilter from '@/features/ProductsFilter';
import { default as ProductListFeature } from '@/features/ProductsList';
import { Suspense } from 'react';

const ProductsList = () => {
    return (
        <div className="flex flex-col gap-4 h-full absolute top-0 left-0 right-0 pt-4 px-2">
            <ProductsFilter />
            <ErrorBoundary fallback={<PageError />}>
                <Suspense fallback={<PageLoader />}>
                    <ProductListFeature />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default ProductsList;
