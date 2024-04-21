"use client";

import React from "react";
import {
    Text,
    View,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

export default function DocText({ text }: { text: string | number }) {
    return (
        <Text style={tw("text-sm text-justify mt-2")}>
            {text}
        </Text>
    )
}