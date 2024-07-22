"use client";

import { LucidePlus, LucideX, Trash2 } from "lucide-react";
import React from "react";
import { FormikErrors } from "formik";
import { Button } from "../ui/button";
import InputText from "./InputText";
import InputTextArea from "./InputTextArea";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    type?: "string" | "text";
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: any;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>;
}

function InputChips({
    name,
    label,
    placeholder,
    value,
    errors,
    type = "text",
    required = false,
    setFieldValue,
    ...rest
}: InputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {

    const [tag, setTag] = React.useState<string>("");

    const [tags, setTags] = React.useState<string[]>([]);

    function cleanTag() {
        setTag("");
    }

    function addTag() {
        if (tag) {
            setTags([...tags, tag]);
            setFieldValue && setFieldValue(name, tags, true);
            setTimeout(() => {
                setTag("");
            })
        }
    };

    function removeTag(index: number) {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        setFieldValue && setFieldValue(name, tags, true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTag(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            addTag();
        }
    };

    React.useEffect(() => {
        if (value) {
            setTags(value);
        }
    }, [value])

    return (
        <div className="w-full">
            <div className="flex w-full items-end space-x-2">
                {
                    type === "string"
                        ? <InputText className="w-full" label={label} placeholder={placeholder} value={tag} onChange={handleInputChange} onKeyDown={handleKeyDown} required={required} {...rest} />
                        : <InputTextArea className="w-full" label={label} placeholder={placeholder} value={tag} onChange={handleInputChange} onKeyDown={handleKeyDown} required={required} {...rest} />
                }
                <div className={`${type === "string" ? "flex flex-row-reverse space-x-1" : "space-y-1"}`}>
                    <Button variant="secondary" onClick={cleanTag}>
                        <LucideX size={14} />
                    </Button>
                    <Button onClick={addTag}>
                        <LucidePlus size={14} />
                    </Button>
                </div>
            </div>
            {errors && typeof errors === "string" ? <p className="text-danger mt-1 text-sm">{errors}</p> : errors && <p className="text-danger mt-1 text-sm">{errors[name]}</p>}
            <ul className="flex flex-wrap gap-2 w-full py-2 transition-all duration-1000">
                {
                    tags && tags.length > 0 && tags.map((tag, index) => (
                        <li key={index} className="bg-slate-300 rounded py-1 px-2 w-fit max-w-full flex relative">
                            <span className="text-justify">{tag}</span>
                            <button onClick={() => removeTag(index)} className="absolute cursor-pointer rounded-full bg-red p-2 hover:bg-red/80 duration-300 -top-3 -end-3 scale-50 hover:scale-100">
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
