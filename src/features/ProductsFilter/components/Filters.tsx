import Button from '@/components/Button';
import CheckboxField from '@/components/CheckboxField';
import Loader from '@/components/Loader';
import Popup from '@/components/Popup';
import { useProductLines } from '../hooks';
import { useProductListingState } from '@/state';
import { useCallback, useMemo, useState } from 'react';

const Filters = () => {
    const [isFiltersVisible, setFiltersVisible] = useState(false);
    const { filter, setFilters } = useProductListingState();
    const { data: lines, isLoading } = useProductLines();

    const handleFieldChange = useCallback(
        (line: string) => () => {
            const lines: string[] = filter?.lines ?? [];
            setFilters({
                ...filter,
                lines: lines.includes(line) ? lines.filter((l) => l !== line) : [...lines, line],
            });
        },
        [filter, setFilters],
    );

    const handleShowFilters = useCallback(() => {
        setFiltersVisible(true);
    }, []);

    const handleResetFilters = useCallback(() => {
        setFilters({ ...filter, lines: [] });
    }, [filter, setFilters]);

    const fields = useMemo(() => {
        if (!lines) {
            return [];
        }
        return lines
            .map((line) => ({
                label: line,
                value: line,
                checked: filter?.lines?.includes(line) ?? false,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
            .sort((a, b) => Number(b.checked) - Number(a.checked));
    }, [lines, filter?.lines]);

    const isButtonActive = useMemo(() => {
        return isFiltersVisible || fields.some((f) => f.checked);
    }, [fields, isFiltersVisible]);

    return (
        <div>
            <Button onClick={handleShowFilters} isActive={isButtonActive}>
                Filter
            </Button>
            <div className="relative">
                <Popup isOpen={isFiltersVisible} onClickOutside={() => setFiltersVisible(false)}>
                    <div className="p-4">
                        <p className="font-bold text-left mb-2">Product line</p>
                        {isLoading && <Loader />}
                        {fields.map((field) => (
                            <CheckboxField
                                key={field.value}
                                label={field.label}
                                checked={field.checked}
                                onChange={handleFieldChange(field.value)}
                            />
                        ))}
                        <div className="text-left mt-2">
                            <a className="text-red-500 cursor-pointer" onClick={handleResetFilters}>
                                Reset
                            </a>
                        </div>
                    </div>
                </Popup>
            </div>
        </div>
    );
};

export default Filters;
