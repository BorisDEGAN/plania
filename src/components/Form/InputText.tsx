import { Input } from "../ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: string;
}

const InputText: React.FC<InputProps> = ({
    name,
    label,
    placeholder,
    value,
    errors,
    required = false,
    ...rest
}) => {
    return (
        <div>
            {label && (
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span>{label}</span>
                    {required && <span className="text-danger">*</span>}
                </label>
            )}
            <Input
                id={name}
                name={name}
                placeholder={label || placeholder}
                value={value}
                className={errors ? "border-danger" : ""}
                {...rest}
            />
            {errors && <p className="text-danger mt-1 text-sm">{errors}</p>}
        </div>
    );
};

export default InputText;
