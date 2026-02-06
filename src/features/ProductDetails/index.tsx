import type { UbiProductDetails } from '@/domain/types';
import { useCallback, useState } from 'react';
import ProductImage from './components/ProductImage';
import ProductDetailsAsJsonDialog from './components/ProductDetailsAsJsonDialog';

type ProductDetailsProps = {
    product: UbiProductDetails;
    isLoading?: boolean;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [isJsonOpen, setJsonOpen] = useState(false);
    const handleDialogClose = useCallback(() => {
        setJsonOpen(false);
    }, []);
    return (
        <div className="flex flex-col gap-4 w-[800px] xs:w-full min-h-[300px] sm:flex-row sm:items-start sm:gap-10 mx-auto">
            <div className="shrink-0">
                <ProductImage src={product.image} alt={product.name} />
            </div>
            <div className="flex-1">
                <div className="pb-5">
                    <h2 className="font-bold text-lg">{product.name}</h2>
                    <p className="text-gray-400 text-sm">{product.line}</p>
                </div>
                <dl className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-4">
                    <dt className="text-sm text-gray-500">Name</dt>
                    <dd className="text-sm text-gray-400 text-right">{product.name}</dd>
                    <dt className="text-sm text-gray-500">Line</dt>
                    <dd className="text-sm text-gray-400 text-right">{product.line}</dd>
                    <dt className="text-sm text-gray-500">Short Name</dt>
                    <dd className="text-sm text-gray-400 text-right">{product.line}</dd>
                    <dt className="text-sm text-gray-500">Max. Power</dt>
                    <dd className="text-sm text-gray-400 text-right">{product.line}</dd>
                    <dt className="text-sm text-gray-500">Speed</dt>
                    <dd className="text-sm text-gray-400 text-right">{product.line}</dd>
                    <dt className="text-sm text-gray-500">Number or ports</dt>
                    <dd className="text-sm text-gray-400 text-right">{product.line}</dd>
                </dl>
                <div className="mt-6">
                    <button
                        type="button"
                        className="text-sm text-sky-500 hover:text-sky-600 cursor-pointer"
                        onClick={() => setJsonOpen(true)}
                    >
                        See all details as JSON
                    </button>
                </div>
            </div>
            <ProductDetailsAsJsonDialog
                isOpen={isJsonOpen}
                json={product.json}
                onClose={handleDialogClose}
            />
        </div>
    );
};

export default ProductDetails;
