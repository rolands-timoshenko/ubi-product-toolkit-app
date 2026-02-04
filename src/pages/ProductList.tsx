import { useProducts } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const filter = {};

const ProductList = () => {
    const { data: products, isLoading } = useProducts(filter);
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Product List</h1>
            {products ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <img src={product.iconUrl} />
                            <a onClick={() => navigate(`/${product.id}`)}>{product.name}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductList;
