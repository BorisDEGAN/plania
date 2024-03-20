"use client";

import React from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function InputPassword({
    name,
    label,
    placeholder,
    required = false,
    errors,
    value,
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


    const [show, setShow] = React.useState(false);

    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <span>{label}</span>
                {required && <span className="text-danger">*</span>}
            </label>
            <div className="relative">
                <Input id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} type={show ? "text" : "password"} className={errors ? "border-danger" : ""} />
                <span onClick={() => setShow(!show)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-medium text-primary dark:text-gray-400 cursor-pointer">
                    {
                        show ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />

                    }
                </span>
            </div>
            {errors && <p className="text-danger mt-1 text-sm">{errors}</p>}
        </div>
    )
}