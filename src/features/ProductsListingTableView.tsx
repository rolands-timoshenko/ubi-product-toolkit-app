import ImageIcon from '@/components/ImageIcon';
import Loader from '@/components/Loader';
import type { UbiProductListItem } from '@/domain/types';
import { useScrollPositonPreserve } from '@/hooks';
import { getProductKey } from '@/utils';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

type ProductsListingTableViewProps = {
    products: UbiProductListItem[];
    hasNextPage?: boolean;
    scrollKey?: string;
};

const ProductsListingTableView = forwardRef<HTMLDivElement, ProductsListingTableViewProps>(
    ({ products, hasNextPage, scrollKey }, ref) => {
        const navigate = useNavigate();
        const { handleScroll, containerRef } = useScrollPositonPreserve(scrollKey);

        return (
            <div ref={containerRef} onScroll={handleScroll} className="overflow-y-auto relative">
                <div className="grid grid-cols-[40px_1fr_1fr] border-b border-gray-200 text-sm font-semibold text-slate-600 sticky top-0 bg-white z-10">
                    <div className="px-4 py-3"></div>
                    <div className="px-4 py-3">
                        <strong>Product Line</strong>
                    </div>
                    <div className="px-4 py-3 text-left">
                        <strong>Name</strong>
                    </div>
                </div>
                {products.map((product) => (
                    <div
                        className="divide-y divide-slate-200 border-b border-gray-200"
                        key={getProductKey(product)}
                    >
                        <button
                            className="grid w-full grid-cols-[40px_1fr_1fr] text-left hover:bg-slate-50 focus:bg-white cursor-pointer"
                            onClick={() => navigate(`/${product.id}`)}
                        >
                            <div className="px-4 py-2 font-medium text-slate-900">
                                <ImageIcon src={product.iconUrl!} alt={product.name} />
                            </div>
                            <div className="px-4 py-2 text-slate-500">{product.line}</div>
                            <div className="px-4 py-2 text-left text-gray-400">{product.name}</div>
                        </button>
                    </div>
                ))}
                {hasNextPage && (
                    <div ref={ref} className="flex justify-center py-2">
                        <Loader />
                    </div>
                )}
            </div>
        );
    },
);

export default ProductsListingTableView;
