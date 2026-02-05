import { Search, X } from 'lucide-react';
import { useCallback } from 'react';

type SearchFieldProps = {
    placeholder?: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = ({ value, placeholder, onChange }: SearchFieldProps) => {

    const handleClearValue = useCallback(() => {
        onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }, [onChange]);

    return (
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors" />
          {value && <X className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"  onClick={handleClearValue} />}
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-grey-100 rounded text-gray-900 placeholder-gray-400 transition-all
                       hover:border-gray-300
                       focus:focus:bg-white focus:border-1 focus:border-blue-500"
          />
        </div>
    );
}

export default SearchField;