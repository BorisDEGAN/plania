"use client";

import React from "react";
import {
    Text,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

export default function DocHeader({ text }: { text: string }) {
    return (
        <Text style={tw("pb-2 mb-4 border-b border-zinc-300")}>{text}</Text>
    )
}