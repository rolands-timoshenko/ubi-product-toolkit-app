import { useProductById } from '@/hooks';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();

    const { data: product, isLoading } = useProductById(id!);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Product Details:
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} />
                    <p>{product.shortnames}</p>
                    <p>{product.title}</p>
                </div>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
};

export default ProductDetails;
