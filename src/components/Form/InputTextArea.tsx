import { Textarea } from "../ui/textarea";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    placeholder?: string;
    required?: boolean;
    errors?: string;
    value?: string;
}

const InputTextArea: React.FC<InputProps> = ({
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
            <Textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                className={errors ? "border-danger" : ""}
                {...rest}
            />
            {errors && <p className="text-danger mt-1 text-sm">{errors}</p>}
        </div>
    );
};

export default InputTextArea;
