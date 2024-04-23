import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

interface Column<T> {
    [key: string]: any;
    name: string;
    // key: keyof T;
    cellClassName?: string;
    cellHeaderClassName?: string;
    template?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
    values?: T[];
    columns: Column<T>[];
    contentClassName?: string;
    headerClassName?: string;
    [key: string]: any
}

const DocTable = {

    Table<T>({
        values = [],
        columns,
        contentClassName,
        headerClassName,
    }: TableProps<T>) {

        return (

            <View style={tw(`w-full h-full text-sm ${columns.length > 4 && 'block min-w-[600px]'}`)}>

                {values.length > 0 &&
                    <View
                        style={tw(`uppercase font-semibold flex ${headerClassName}`)}
                    >
                        {
                            columns.map((column, indexColumn) =>
                                <View key={indexColumn} style={tw(`${column.cellHeaderClassName}`)}                            >
                                    <Text style={tw("text-justify text-pretty")}>{column.name}</Text>
                                </View>
                            )
                        }
                    </View>
                }
                {
                    values.length > 0 && (
                        values.map((item, indexValues) => (
                            <View
                                key={indexValues}
                                style={tw(`${contentClassName}`)}
                            >
                                {
                                    columns.map((column, indexColumn) => (
                                        <View
                                            key={indexColumn}
                                            style={tw(`${column.cellClassName}`)}
                                        >
                                            {
                                                column.template
                                                    ? column.template(item)
                                                    : (<Text style={tw("text-justify text-pretty")}>{item[column.key]}</Text>)
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                        )))
                }

            </View>
        );

    }
};

export default DocTable;