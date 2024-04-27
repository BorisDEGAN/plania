import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: string;
    options: any[];
    optionLabel?: string;
    optionValue?: string;
}

function InputSelect({
    name,
    label,
    placeholder,
    value,
    errors,
    required = false,
    options,
    optionLabel = 'label',
    optionValue = 'value',
    ...rest
}: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span>{label}</span>
                    {required && <span className="text-danger">{' '}*</span>}
                </label>
            )}
            <Select
                name={name}
                value={value}
                >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={label || placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            options.map((option: any) => (
                                <SelectItem key={option[optionValue]} value={option[optionValue]}>
                                    {option[optionLabel]}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errors && typeof errors === "string" ? <p className="text-danger mt-1 text-sm">{errors}</p> : (errors && name) && <p className="text-danger mt-1 text-sm">{errors[name]}</p>}
        </div>
    );
};

export default InputSelect;
