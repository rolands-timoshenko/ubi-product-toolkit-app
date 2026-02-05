import type { UbiProductListItem } from '@/domain/types';
import ProductFilter from '@/features/ProductFilter';
import ProductListingListView from '@/features/ProductListingListView';
import ProductListingSetup from '@/features/ProductListingSetup';
import ProductSearch from '@/features/ProductSearch';
import ProductListingGridView from '@/features/ProductsListingGridView';
import { useInfiniteProducts } from '@/hooks';
import { useProductListingState } from '@/state';
import { Loader } from 'lucide-react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const ProductList = () => {
    const filter = useProductListingState((state) => state.filter);
    const listType = useProductListingState((state) => state.listType);
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteProducts(filter);

    const products: UbiProductListItem[] = data?.pages.flatMap((p) => p) ?? [];

    const [infiniteRef] = useInfiniteScroll({
        loading: isFetchingNextPage,
        hasNextPage: !!hasNextPage,
        onLoadMore: fetchNextPage,
        rootMargin: '100px 0px',
        disabled: isLoading || isError,
    });

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <ProductSearch />
                <div className="flex items-center justify-end gap-2">
                    <ProductListingSetup />
                    <ProductFilter />
                </div>
            </div>
            <div className="mt-6">
                {listType === 'grid' && <ProductListingGridView products={products || []} />}
                {listType === 'list' && <ProductListingListView products={products || []} />}
                {hasNextPage && (
                    <div ref={infiniteRef} className="flex justify-center">
                        <Loader />
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductList;
