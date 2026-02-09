import type { UbiProductListItem } from '@/domain/types';
import { useProductListingState } from '@/state';
import { useMemo } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useInfiniteProducts } from './hooks';
import { ProductListingType } from '@/types';
import GridView from './components/GridView';
import TableView from './components/TableView';
import { scrollPositionKeys } from './config';

const ProductsList = () => {
    const filter = useProductListingState((state) => state.filter);
    const listType = useProductListingState((state) => state.listType);
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteProducts(filter);

    const products: UbiProductListItem[] = useMemo(
        () => data?.pages.flatMap((p) => p) ?? [],
        [data],
    );

    const [infiniteRef] = useInfiniteScroll({
        loading: isFetchingNextPage,
        hasNextPage: !!hasNextPage,
        onLoadMore: fetchNextPage,
        rootMargin: '100px 0px',
        disabled: isLoading || isError,
    });

    return (
        <>
            {listType === ProductListingType.GRID && (
                <GridView
                    ref={infiniteRef}
                    products={products || []}
                    hasNextPage={hasNextPage}
                    scrollKey={scrollPositionKeys.grid}
                />
            )}
            {listType === ProductListingType.LIST && (
                <TableView
                    ref={infiniteRef}
                    products={products || []}
                    hasNextPage={hasNextPage}
                    scrollKey={scrollPositionKeys.table}
                />
            )}
        </>
    );
};

export default ProductsList;
