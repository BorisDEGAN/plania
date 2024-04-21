"use client";

import React from "react";
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
import { IProject } from "@/shared/models";
import { createTw } from "react-pdf-tailwind";
import DocText from "./DocText";
import DocHeader from "./DocHeader";
import DocPage from "./DocPage";
import TableDocument from "./TableDocument";

const tw = createTw({});

export const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Chargement...</p>,
    }
);

export const DocumentPrinter = ({ project }: { project: IProject }) => (
    <PDFViewer style={tw("w-full h-[100vh]")} >
        <Document title={project.title} subject={project.title} creator="Made with Plania" author="Plania" producer="Plania">
            <Page size="A4" style={tw("w-full h-full p-20")}>
                <DocPage>
                    <Text style={tw("mb-4 text-center text-3xl")}>Sommaire</Text>
                    <DocHeader text="I. INTRODUCTION" heading="h3" />
                    <DocHeader text="II. RÉSULTATS ATTENDUS" heading="h3" />
                    <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" heading="h3" />
                    <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES " heading="h3" />
                    <DocHeader text="V. CADRE DE MESURE DES PERFORMANCES " heading="h3" />
                    <DocHeader text="VI. PLAN DE TRAVAIL ANNUEL" heading="h3" />
                    <DocHeader text="VII. CHEMIN CRITIQUE" heading="h3" />
                </DocPage>

                <DocHeader text="I. INTRODUCTION" subline />
                <DocText text={project.description} />
                <DocText text={project.justification} />
                <DocText text={project.context} />

                <DocHeader text="II. RÉSULTATS ATTENDUS" subline />
                {
                    project.outcomes.map((outcome, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${outcome.title}`} heading="h3" />
                            {
                                outcome.activities.map((activity, index) => (
                                    <DocText key={index} text={activity} />
                                ))
                            }
                        </View>
                    ))
                }

                <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" subline />
                {
                    project.partners.map((partner, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${partner.name}`} heading="h3" />
                            {
                                partner.abilities.map((ability, index) => (
                                    <DocText key={index} text={ability} />
                                ))
                            }
                        </View>
                    ))
                }

                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES " subline />
                {
                    project.activities.map((activity, index) => (
                        <View key={index}>
                            <DocText key={index} text={activity} />
                        </View>
                    ))
                }

                <DocHeader text="V. CADRE DE MESURE DES PERFORMANCES " subline />
                {
                    project.performance_matrix.map((matrix, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}.1. Analyse`} heading="h3" />
                            <DocText key={index} text={matrix.analyse} />

                            <DocHeader text={`${index + 1}.2. Extrant`} heading="h3" />
                            <DocText key={index} text={matrix.effect} />

                            <DocHeader text={`${index + 1}.3. Frequence`} heading="h3" />
                            <DocText key={index} text={matrix.frequency} />

                            <DocHeader text={`${index + 1}.4. Source`} heading="h3" />
                            {
                                matrix.verification_sources.map((source, index) => (
                                    <DocText key={index} text={source} />
                                ))
                            }

                            <DocHeader text={`${index + 1}.5. Outils`} heading="h3" />
                            {
                                matrix.collect_tools.map((tools, index) => (
                                    <DocText key={index} text={tools} />
                                ))
                            }


                        </View>
                    ))
                }

                <DocHeader text="VI. PLAN DE TRAVAIL ANNUEL" subline />
                {
                    project.budget_plan.map((plan, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${plan.section}`} heading="h3" />
                            {
                                plan.activities.map((activity, index) => (
                                    <View key={index}>
                                        <DocHeader text={`${index + 1}. ${activity.title}`} heading="h4" />
                                        <DocText text={activity.budget} />
                                    </View>
                                ))
                            }
                        </View>
                    ))
                }

                <DocHeader text="VII. CHEMIN CRITIQUE" />
                {
                    project.intervention_strategy.map((strategy, index) => (
                        <DocText key={index} text={strategy} />
                    ))
                }
            </Page>
        </Document>
    </PDFViewer >
);
