import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

interface DocPageProps {
    orientation?: "portrait" | "landscape"
    children?: React.ReactNode
}

const DocPage: React.FC<DocPageProps> = ({ orientation = "portrait", children }) => {


    return (
        <Page orientation={orientation} size="A4" style={tw("w-full h-full px-16 py-20")}>

            <View style={tw("w-full flex flex-row justify-between text-sm absolute top-12 right-16")} fixed>
                <Text>Plania</Text>
                <Text></Text>
            </View>

            {children}

            <View style={tw("w-full flex flex-row justify-between text-sm absolute bottom-12 right-16")} fixed>
                <Text>Plania</Text>
                <Text render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} />
            </View>
        </Page>
    );

}

export default DocPage;