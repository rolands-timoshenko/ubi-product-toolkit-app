import { ErrorBoundary } from '@/components/ErrorBoundary';
import PageError from '@/components/PageError';
import PageLoader from '@/components/PageLoader';
import { default as ProductDetailsFeature } from '@/features/ProductDetails';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams() as { productId: string };
    return (
        <div className="flex flex-col py-4 px-4 w-full min-h-[500px] relative">
            <div className="flex items-center justify-between mb-4">
                <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-sky-500 cursor-pointer mb-4 px-2 py-1 shadow-sm  hover:shadow-md rounded focus:outline-none"
                    onClick={() => window.history.back()}
                >
                    &#60;&nbsp;Back
                </button>
            </div>
            <ErrorBoundary fallback={<PageError />}>
                <Suspense fallback={<PageLoader />}>
                    <ProductDetailsFeature productId={productId} />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default ProductDetails;
