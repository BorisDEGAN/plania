import { Input } from "../ui/input";

export default function InputText({
    name,
    label,
    placeholder,
    value,
    errors,
    required = false,
    onChange,
}: {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    errors?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {

    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <span>{label}</span>
                {required && <span className="text-danger">{" "}*</span>}
            </label>
            <Input id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} className={errors ? "border-danger" : ""} />
            {errors && <p className="text-danger mt-1 text-sm">{errors}</p>}
        </div>
    )
}