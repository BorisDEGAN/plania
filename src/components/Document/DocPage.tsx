"use client";

import React from "react";
import {
    Page,
    Text,
    View,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

export default function DocPage({ children }: { children: React.ReactNode }) {
    return (
        <View style={tw("w-full h-full justify-between bg-white text-black")}>
            <View style={tw("w-full flex flex-row justify-between text-sm")}>
                <Text style={tw("")}>Plania</Text>
                <Text style={tw("")}>I</Text>
            </View>

            <View style={tw("w-full h-full py-4")}>
                {children}
            </View>

            <View style={tw("w-full flex flex-row justify-between text-sm")}>
                <Text style={tw("")}>Plania</Text>
                <Text style={tw("")}>I</Text>
            </View>
        </View>
    )
}