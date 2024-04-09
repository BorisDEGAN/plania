/* "use client";

import React from "react";
import Html from "react-pdf-html";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Link,
    Font,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const MyDocument = ({ html }: { html: string }) => (
    <Document>
        <Page size="A4">
            <Html>{html}</Html>
        </Page>
    </Document>
);

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
);

export default PDFViewer */