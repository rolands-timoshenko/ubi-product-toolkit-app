import type { UbiProductDetails } from '@/domain/types';

type ProductDetailsTableProps = {
    product: UbiProductDetails;
};

const ProductDetailsTable = ({ product }: ProductDetailsTableProps) => {
    return (
        <dl className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-4">
            <dt className="text-sm text-gray-500">Name</dt>
            <dd className="text-sm text-gray-400 text-right">{product.name}</dd>
            <dt className="text-sm text-gray-500">Line</dt>
            <dd className="text-sm text-gray-400 text-right">{product.line}</dd>
            <dt className="text-sm text-gray-500">Short Names</dt>
            <dd className="text-sm text-gray-400 text-right">{product.shortnames.join(', ')}</dd>
            <dt className="text-sm text-gray-500">Max. Power</dt>
            <dd className="text-sm text-gray-400 text-right">-</dd>
            <dt className="text-sm text-gray-500">Speed</dt>
            <dd className="text-sm text-gray-400 text-right">-</dd>
            <dt className="text-sm text-gray-500">Number or ports</dt>
            <dd className="text-sm text-gray-400 text-right">-</dd>
        </dl>
    );
};

export default ProductDetailsTable;
