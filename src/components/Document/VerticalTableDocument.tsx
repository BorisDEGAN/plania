import React from "react";
import { Page, Text, View, Document, } from "@react-pdf/renderer";

const VerticalTableDocument = () => {
    const createTableRow = (headerName: string, value: string, headerCellWidth: number, valueCellWidth: number) => {

        return (
            <View fixed>
                <View >
                    <Text >{headerName}</Text>
                </View>

                <View >
                    <Text >{value}</Text>
                </View>

            </View>
        );
    };

    return (
        <Document>
            <Page size="A4" orientation="portrait">
                <View >
                    {createTableRow("Height", "1,78m", 20, 20)}
                    {createTableRow("Shoulder", "21cm", 20, 20)}
                    {createTableRow("Arms", "36cm", 20, 20)}
                </View>
            </Page>
        </Document>
    );
};

export default VerticalTableDocument;