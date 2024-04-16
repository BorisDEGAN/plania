"use client";

import React from "react";
import {
    Text,
    View,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

export default function DocText({ text }: { text: string }) {
    return (
        <View style={tw("w-full h-full")}>
            <Text style={tw("text-sm text-justify")}>
                {text}
            </Text>
        </View>
    )
}