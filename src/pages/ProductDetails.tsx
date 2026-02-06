import ProductDetails from '@/features/ProductDetails';
import { useProductById } from '@/hooks';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: product, isLoading } = useProductById(id!);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-center py-4 px-4 w-full">
            <div className="">
                <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-sky-500 cursor-pointer mb-4 px-2 py-1 shadow-sm  hover:shadow-md rounded focus:outline-none"
                    onClick={() => window.history.back()}
                >
                    &#60;&nbsp;Back
                </button>
            </div>
            {product ? <ProductDetails product={product} /> : <></>}
        </div>
    );
};

export default ProductDetailsPage;
