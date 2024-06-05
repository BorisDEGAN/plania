"use client";

import React from "react";
import {
    Text,
    View,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

export default function DocText({ text, style }: { text?: string | number, style?: string }) {
    return (
        <Text style={tw(`text-sm text-justify my-2 ${style}`)}>
            {text}
        </Text>
    )
}