/* eslint-disable react/display-name */

import React, { forwardRef } from "react";
import { Textarea } from "../ui/textarea";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: string;
}

const InputTextArea = forwardRef<HTMLTextAreaElement, InputProps>(
    ({ name, label, placeholder, value, errors, required = false, className, ...props }, ref) => {
        return (
            <div className={className}>
                {label && (
                    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
                        <span>{label}</span>
                        {required && <span className="text-danger">{' '}*</span>}
                    </label>
                )}
                <Textarea
                    ref={ref}
                    id={name}
                    name={name}
                    placeholder={placeholder || label}
                    value={value}
                    className={(errors && typeof errors === "string") ? "border-danger" : ""}
                    {...props}
                />
                {errors && typeof errors === "string" ? (
                    <p className="text-danger mt-1 text-sm">{errors}</p>
                ) : (
                    errors && name && <p className="text-danger mt-1 text-sm">{errors[name]}</p>
                )}
            </div>
        );
    }
);

export default InputTextArea;
