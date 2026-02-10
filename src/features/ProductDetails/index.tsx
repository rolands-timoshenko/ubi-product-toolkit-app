import type { UbiProductDetails } from '@/domain/types';
import { useProductById } from './hooks';
import { useCallback, useState } from 'react';
import ProductDetailsAsJsonDialog from './components/ProductDetailsAsJsonDialog';
import ProductDetailsTable from './components/ProductDetailsTable';
import ProductImage from './components/ProductImage';
import Button from '@/components/Button';

type ProductDetailsProps = {
    productId: string;
    onSelectProduct?: (nextProductId: string) => void;
};

const ProductDetails = ({ productId, onSelectProduct }: ProductDetailsProps) => {
    const { data: product } = useProductById(productId) as { data: UbiProductDetails };
    const [isJsonOpen, setJsonOpen] = useState(false);

    const handleDialogClose = useCallback(() => {
        setJsonOpen(false);
    }, []);

    const handleNextProduct = () => {
        if (product?.nextProductId) {
            onSelectProduct?.(product.nextProductId);
        }
    }

    const handlePreviousProduct = () => {
        if (product?.previousProductId) {
            onSelectProduct?.(product.previousProductId);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-end gap-4 mb-4">
                <Button hasShadow onClick={handlePreviousProduct}>
                    Previous
                </Button>
                <Button hasShadow onClick={handleNextProduct}>
                    Next
                </Button>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-[800px] min-h-[300px] sm:flex-row sm:items-start sm:gap-10 mx-auto relative">
                <div className="shrink-0 min-w-0">
                    <ProductImage src={product.image} alt={product.name} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="pb-5">
                        <h2 className="font-bold text-lg">{product.name}</h2>
                        <p className="text-gray-400 text-sm">{product.line}</p>
                    </div>
                    <ProductDetailsTable product={product} />
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
