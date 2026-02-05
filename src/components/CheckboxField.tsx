type CheckboxFieldProps = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

const CheckboxField = ({ label, checked, onChange }: CheckboxFieldProps) => {

    const handleFieldChange = () => {
        onChange(!checked);
    };

    return (
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleFieldChange}>
            <input
                type="checkbox"
                checked={checked}
                className="w-4 h-4"
            />
            <label className="select-none whitespace-nowrap">{label}</label>
        </div>
    )
};

export default CheckboxField;