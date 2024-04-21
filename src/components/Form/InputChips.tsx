"use client";

import { Trash2 } from "lucide-react";
import React from "react";
import InputText from "./InputText";
import { FormikErrors } from "formik";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: any[];
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>;
}

function InputChips({
    name,
    label,
    placeholder,
    value,
    errors,
    required = false,
    setFieldValue,
    ...rest
}: InputProps) {

    const [tag, setTag] = React.useState<string>("");

    const [tags, setTags] = React.useState<string[]>([]);

    function addTag() {
        if (tag && !tags.includes(tag) && tag !== "" && tag !== " " && tag !== ",") {
            setTags([...tags, tag]);
            setFieldValue && setFieldValue(name, tags, true);
            setTag("");
        }
    };

    function removeTag(index: number) {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        setFieldValue && setFieldValue(name, tags, true);
    };

    React.useEffect(() => {
        if (value) {
            setTags(value);
        }
    }, [value])

    return (
        <div>
            <InputText label={label} placeholder={placeholder} value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={(e) => (e.key === " " || e.key === ",") && addTag()} required={required} {...rest} />
            {errors && <p className="text-danger mt-1 text-sm">{errors}</p>}
            <ul className="flex flex-wrap gap-2 w-full py-2 transition-all duration-1000">
                {
                    tags && tags.length > 0 && tags.map((tag, index) => (
                        <li key={index} className="bg-slate-300 rounded py-1 px-2 w-fit max-w-full flex relative">
                            <span className="text-justify">{tag}</span>
                            <button onClick={() => removeTag(index)} className="absolute -top-3 -right-1 cursor-pointer rounded-full bg-red p-2 hover:bg-red/80 duration-300">
                                <Trash2 size={16} className="text-white" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div >
    );
};

export default InputChips;
