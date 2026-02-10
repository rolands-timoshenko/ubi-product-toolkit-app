import Button from '@/components/Button';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import PageError from '@/components/PageError';
import PageLoader from '@/components/PageLoader';
import { default as ProductDetailsFeature } from '@/features/ProductDetails';
import { Suspense, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams() as { productId: string };
    const navigate = useNavigate();

    const handleNavigateToProduct = useCallback(
        (productId: string) => {
            navigate(`/${productId}`);
        },
        [navigate],
    );

    return (
        <div className="flex flex-col py-4 px-4 w-full min-h-[500px] relative">
            <div className="flex items-center justify-between mb-0">
                <Button onClick={() => navigate('/')} hasShadow>
                    &#60;&nbsp;Back
                </Button>
            </div>
            <ErrorBoundary fallback={<PageError />}>
                <Suspense fallback={<PageLoader />}>
                    <ProductDetailsFeature
                        productId={productId}
                        onSelectProduct={handleNavigateToProduct}
                    />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default ProductDetails;
