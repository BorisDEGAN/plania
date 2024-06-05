import { FormikErrors } from "formik";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { v4 as uuidv4 } from "uuid";

interface InputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: string;
    options: any[];
    optionLabel?: string;
    optionValue?: string;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>;
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
    setFieldValue,
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
                defaultValue={value}
                onValueChange={(value: string) => setFieldValue && setFieldValue(name, value, true)}            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={label || placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            options.map((option: any) => (
                                <div key={uuidv4()} >
                                    <SelectItem value={option[optionValue]}>
                                        {option[optionLabel]}
                                    </SelectItem>
                                </div>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            {
                errors && typeof errors === "string" ?
                    <p className="text-danger mt-1 text-sm">{errors}</p> :
                    (errors && name) && <p className="text-danger mt-1 text-sm">{errors[name]}</p>
            }
        </div >
    );
};

export default InputSelect;
