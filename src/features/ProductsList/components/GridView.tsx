import ImageThumbnail from '@/components/ImageThumbnail';
import Loader from '@/components/Loader';
import type { UbiProductListItem } from '@/domain/types';
import { getProductKey } from '@/utils';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollPositonPreserve } from '../hooks';

type GridViewProps = {
    products: UbiProductListItem[];
    hasNextPage?: boolean;
    scrollKey?: string;
};

const GridView = forwardRef<HTMLDivElement, GridViewProps>(
    ({ products, hasNextPage, scrollKey }, ref) => {
        const { handleScroll, containerRef } = useScrollPositonPreserve(scrollKey);

        return (
            <div ref={containerRef} onScroll={handleScroll} className="overflow-y-auto relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <Link
                            key={getProductKey(product)}
                            to={`/${product.id}`}
                            className="relative flex flex-col border border-gray-100 bg-gray-50 rounded hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 h-[172px]"
                        >
                            <p className="absolute top-1 right-1 px-1 bg-white text-xs text-sky-500">
                                {product.line.trim()}
                            </p>
                            <div className="flex flex-1 items-center justify-center co py-2 h-[100px]">
                                <ImageThumbnail src={product.thumbnailUrl!} alt={product.name} />
                            </div>
                            <div className="flex flex-col gap-1 bg-white px-4 py-2">
                                <p
                                    className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                                    title={product.name}
                                >
                                    {product.name}
                                </p>
                                <p className="text-sm text-gray-500">{product.line}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                {hasNextPage && (
                    <div ref={ref} className="flex justify-center py-2">
                        <Loader />
                    </div>
                )}
            </div>
        );
    },
);

export default GridView;
