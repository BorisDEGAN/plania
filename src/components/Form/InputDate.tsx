"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/shared/utils"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormikErrors } from "formik"
import { DayPickerMultipleProps, DayPickerRangeProps, DayPickerSingleProps, SelectRangeEventHandler } from "react-day-picker"

interface InputProps {
    label?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    errors?: any;
    value?: any;
    onChange?: any;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>;
}

export function InputDate({
    name,
    label,
    placeholder,
    value,
    errors,
    required = false,
    className,
    mode = "single",
    setFieldValue,
    ...rest
}: InputProps & CalendarProps) {
    function handleSetDate(e) {
        if (setFieldValue)
            switch (mode) {
                case "range":
                    setFieldValue(name, e)
                    break
                default:
                    setFieldValue(name, e)
            }
    }

    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
                    <span>{label}</span>
                    {required && <span className="text-danger">{' '}*</span>}
                </label>
            )}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <div className="flex items-center space-x-3">
                            <CalendarIcon className="h-4 w-4" />
                            {
                                value
                                    ? <>
                                        {
                                            mode === "range"
                                                ? <span>{value.from && format(value.from, "dd/MM/yyyy")} - {value.to && format(value.to, "dd/MM/yyyy")}</span>
                                                : <span>{format(value, "dd/MM/yyyy")}</span>
                                        }
                                    </>
                                    : <span>{label || placeholder}</span>
                            }
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Calendar
                        lang="fr"
                        id={name}
                        mode={mode}
                        selected={value}
                        className={(errors && typeof errors === "string") ? "border-danger" : ""}
                        onSelect={handleSetDate}
                    />
                </PopoverContent>
            </Popover>
            {errors && typeof errors === "string" ? <p className="text-danger mt-1 text-sm">{errors}</p> : (errors && name) && <p className="text-danger mt-1 text-sm">{errors[name]}</p>}
        </div>
    )
}
