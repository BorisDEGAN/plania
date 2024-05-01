import { Input } from "../ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: string | number;
}

function InputText({
    name,
    label,
    placeholder,
    value,
    errors,
    required = false,
    className,
    ...rest
}: InputProps) {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
                    <span>{label}</span>
                    {required && <span className="text-danger">{' '}*</span>}
                </label>
            )}
            <Input
                id={name}
                name={name}
                placeholder={label || placeholder}
                value={value}
                className={(errors && typeof errors === "string") ? "border-danger" : ""}
                {...rest}
            />
            {errors && typeof errors === "string" ? <p className="text-danger mt-1 text-sm">{errors}</p> : (errors && name) && <p className="text-danger mt-1 text-sm">{errors[name]}</p>}
        </div>
    );
};

export default InputText;
