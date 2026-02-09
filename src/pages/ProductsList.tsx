import type { UbiProductListItem } from '@/domain/types';
import ProductFilter from '@/features/ProductFilter';
import ProductListingSetup from '@/features/ProductListingSetup';
import ProductsListingTableView from '@/features/ProductsListingTableView';
import ProductSearch from '@/features/ProductSearch';
import { useInfiniteProducts } from '@/hooks';
import { useProductListingState } from '@/state';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import ProductsListingGridView from '@/features/ProductsListingGridView';

const ProductsList = () => {
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
        <div className="flex flex-col gap-4 h-full absolute top-0 left-0 right-0 pt-4 px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProductSearch />
                <div className="flex items-center justify-end gap-2">
                    <ProductListingSetup />
                    <ProductFilter />
                </div>
            </div>
            {listType === 'grid' && (
                <ProductsListingGridView
                    ref={infiniteRef}
                    products={products || []}
                    hasNextPage={hasNextPage}
                    scrollKey="product-list-grid"
                />
            )}
            {listType === 'list' && (
                <ProductsListingTableView
                    ref={infiniteRef}
                    products={products || []}
                    hasNextPage={hasNextPage}
                    scrollKey="product-list-table"
                />
            )}
        </div>
    );
};

export default ProductsList;
