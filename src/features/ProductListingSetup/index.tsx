import { useProductListingState } from "@/state";

const ProductListingSetup = () => {
    const { listType, setListType} = useProductListingState();
    return (
        <div className="flex gap-2">
            <button
                className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={listType === 'list'}
                onClick={() => setListType("list")}
            >
                List
            </button>
            <button
                className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={listType === 'grid'}
                onClick={() => setListType("grid")}
            >
                Grid
            </button>
        </div>
    );
}

export default ProductListingSetup;