"use client";

import React from "react";
import {
    Text,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

export default function DocHeader({ text, heading = "h2", subline }: { text: string, subline?: boolean, heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) {

    const size = React.useMemo(() => {
        switch (heading) {
            case "h1":
                return "text-3xl"
            case "h2":
                return "text-2xl"
            case "h3":
                return "text-xl"
            case "h4":
                return "text-lg"
            case "h5":
                return "text-base"
            case "h6":
                return "text-sm"
            default:
                return ""
        }
    }, [heading])

    const bborder = React.useMemo(() => {
        return subline ? 'border-b' : 'border-0'
    }, [subline])

    return (
        <Text style={tw(`pb-1 my-1 border-zinc-300 font-medium ${size} ${bborder}`)}>{text}</Text>
    )
}