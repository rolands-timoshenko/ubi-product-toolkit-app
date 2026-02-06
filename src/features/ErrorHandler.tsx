import { useAppState } from '@/state';
import { SquareX } from 'lucide-react';

const ErrorHandler = () => {
    const { error, setError } = useAppState();

    if (!error) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={() => setError(null)} />
            <div className="relative w-[90%] max-w-sm rounded-md bg-white p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-red-500">Error</h2>
                    <button
                        type="button"
                        className="text-sm text-gray-300 hover:text-gray-500 cursor-pointer"
                        onClick={() => setError(null)}
                    >
                        <SquareX />
                    </button>
                </div>
                <p className="text-gray-700">{error}</p>
            </div>
        </div>
    );
};

export default ErrorHandler;
