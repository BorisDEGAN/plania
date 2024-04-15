"use client";

import { LucideX } from "lucide-react";
import React, { ChangeEventHandler } from "react";
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

    return (
        <div>
            <InputText label={label} placeholder={placeholder} value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={(e) => (e.key === " " || e.key === ",") && addTag()} required={required} {...rest} />
            <ul className="flex flex-wrap gap-2 w-full py-2 transition-all duration-1000">
                {
                    tags && tags.length > 0 && tags.map((tag, index) => (
                        <li key={index} className="bg-slate-300 rounded-full py-1 px-2 w-fit max-w-full flex space-x-1 items-center">
                            <span>{tag}</span>
                            <LucideX
                                onClick={() => removeTag(index)}
                                size={12}
                                className="rounded-full text-slate-700 hover:bg-red-500 duration-300 hover:text-slate-900 hover:animate-spin cursor-pointer"
                            />
                        </li>
                    ))
                }
            </ul>
        </div >
    );
};

export default InputChips;
