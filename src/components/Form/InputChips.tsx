"use client";

import { LucideX } from "lucide-react";
import React from "react";
import InputText from "./InputText";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: any[];
}

function InputChips({
    name,
    label,
    placeholder,
    value,
    errors,
    required = false,
    ...rest
}: InputProps) {

    const [tag, setTag] = React.useState<string>("");

    const [tags, setTags] = React.useState<string[]>(value ? value : []);

    function addTag() {
        if (tag) {
            setTags([...tags, tag]);
            setTag("");
        }
    };

    function removeTag(index: number) {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    return (
        <div>
            <InputText label={label} placeholder={placeholder} value={tag} onChange={(e) => console.log(e)} onKeyDown={(e) => (e.key === "Enter" || e.key === "," || e.key === " ") && addTag()} required={required} {...rest} />
            <ul className="flex flex-wrap gap-2 w-full py-2 transition-all duration-1000">
                {
                    tags && tags.length > 0 && tags.map((tag, index) => (
                        <li key={index} className="bg-slate-300 rounded-full py-1 px-2 max-w-fit flex space-x-1 items-center">
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
