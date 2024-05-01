"use client";

import React from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: string | number;
}

export default function InputPassword({
    name,
    label,
    placeholder,
    required = false,
    errors,
    value,
    className,
    onChange,
}: InputProps) {


    const [show, setShow] = React.useState(false);

    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
                    <span>{label}</span>
                    {required && <span className="text-danger">{' '}*</span>}
                </label>
            )}
            <div className="relative">
                <Input id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} type={show ? "text" : "password"} className={(errors && typeof errors === "string") ? "border-danger" : ""} />
                <span onClick={() => setShow(!show)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-medium text-slate-500 dark:text-gray-400 cursor-pointer">
                    {
                        show ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />

                    }
                </span>
            </div>
            {errors && typeof errors === "string" ? <p className="text-danger mt-1 text-sm">{errors}</p> : (errors && name) && <p className="text-danger mt-1 text-sm">{errors[name]}</p>}
        </div>
    )
}