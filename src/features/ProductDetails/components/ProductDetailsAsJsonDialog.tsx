type ProductDetailsAsJsonDialogProps = {
    isOpen: boolean;
    json: string;
    onClose: () => void;
};

const ProductDetailsAsJsonDialog = ({ isOpen, json, onClose }: ProductDetailsAsJsonDialogProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
                aria-label="Close JSON dialog"
            />
            <div className="relative w-[90vw] max-w-[800px] rounded-lg bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-semibold text-gray-700">Product JSON</h3>
                    <button
                        type="button"
                        className="text-sm text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                <pre className="max-h-[60vh] overflow-auto rounded-md bg-gray-50 p-4 text-xs text-gray-500">
                    {json}
                </pre>
            </div>
        </div>
    );
};

export default ProductDetailsAsJsonDialog;
