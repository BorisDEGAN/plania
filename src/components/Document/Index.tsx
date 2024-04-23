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
import PageLoad from "../Loader/PageLoad";

import { DataTableCell, Table, TableBody, TableCell, TableHeader } from "./src";

const tw = createTw({});

export const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <PageLoad />,
    }
);

export const DocumentPrinter = ({ project }: { project: IProject }) => (
    <PDFViewer style={tw("w-full h-[80vh]")} >
        <Document title={project.title} subject={project.title} creator="Made with Plania" author="Plania" producer="Plania">

            <Page size="A4" style={tw("w-full h-full px-16 py-20")}>

               

                <View style={tw("w-full flex flex-row justify-between text-sm absolute top-12 right-16")} fixed>
                    <Text>Plania</Text>
                    <Text></Text>
                </View>

                <View style={tw("w-full flex flex-row justify-between text-sm absolute bottom-12 right-16")} fixed>
                    <Text>Plania</Text>
                    <Text render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} />
                </View>

                <Text style={tw("mb-4 text-center text-2xl")}>Sommaire</Text>

                <DocHeader text="I. INTRODUCTION" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Bref aperçu du projet" heading="h4" />
                    <DocHeader text="B. Contexte et Justification" heading="h4" />
                    <DocHeader text="C. Description du projet : Objectifs et portée" heading="h4" />
                </View>

                <DocHeader text="II. RÉSULTATS ATTENDUS" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Cadre Logique" heading="h4" />
                    <DocHeader text="B. Structure de découpage du projet (WBS)" heading="h4" />
                    <DocHeader text="C. Axes stratégiques du projet" heading="h4" />
                </View>

                <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Description des partenaires et de leur rôle" heading="h4" />
                    <DocHeader text="B. Plan de communication avec les partenaires" heading="h4" />
                </View>

                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES " heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Plan de gestion des acquisitions" heading="h4" />
                    <DocHeader text="B. Plan de gestion des travaux de construction" heading="h4" />
                </View>

                <DocHeader text="V. CADRE DE MESURE DES PERFORMANCES " heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Mécanismes de contrôle qualité" heading="h4" />
                    <DocHeader text="B. Matrice de performance du projet" heading="h4" />
                </View>

                <DocHeader text="VI. PLAN DE TRAVAIL ANNUEL" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Calendrier pluriannuel d’exécution/ Diagramme de GANTT" heading="h4" />
                </View>

                <DocHeader text="VII. PLAN DE GESTION DES RISQUES" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Matrice de gestion des risques" heading="h4" />
                </View>

                <DocHeader text="VIII. Estimation des coûts" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Budget du projet" heading="h4" />
                </View>


                <Text break />
                <DocHeader text="I. INTRODUCTION" subline />

                <DocHeader text="A. Bref aperçu du projet" heading="h4" />
                <DocText text={project.overview} />

                <DocHeader text="B. Contexte et Justification" heading="h4" />
                <DocText text={project.context} />
                <DocText text={project.justification} />

                <DocHeader text="C. Description du projet : Objectifs et portée" heading="h4" />
                <DocText text={project.description} />
                {
                    project.objectives && project.objectives.map((objectif, index) => (
                        <View key={index}>
                            <DocText key={index} text={'- ' + objectif} />
                        </View>
                    ))
                }


                <Text break />
                <DocHeader text="II. RÉSULTATS ATTENDUS" subline />

                <DocHeader text="A. Cadre Logique" heading="h4" />
                {
                    /* tableau */
                    project.logical_context && project.logical_context.budget
                }

                <DocHeader text="B. Structure de découpage du projet (WBS)" heading="h4" />
                {
                    project.outcomes && project.outcomes.map((outcome, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${outcome.title}`} heading="h4" />
                            {
                                outcome.activities.map((activity, index) => (
                                    <DocText key={index} text={'- ' + activity} />
                                ))
                            }
                        </View>
                    ))
                }

                <DocHeader text="C. Axes stratégiques du projet" heading="h4" />


                <Text break />
                <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" subline />

                <DocHeader text="A. Description des partenaires et de leur rôle" heading="h4" />
                {
                    project.partners && project.partners.map((partner, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${partner.name}`} heading="h4" />
                            {
                                partner.abilities.map((ability, index) => (
                                    <DocText key={index} text={'- ' + ability} />
                                ))
                            }
                        </View>
                    ))
                }
                <DocHeader text="B. Plan de communication avec les partenaires" heading="h4" />

                <Text break />
                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES" subline />

                <DocHeader text="A. Plan de gestion des acquisitions" heading="h4" />
                {
                    /* tableau */
                    project.budget_plan && project.budget_plan.map((section, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${section.section}`} heading="h4" />
                            {
                                section.activities.map((activity, index) => (
                                    <DocText key={index} text={activity.title} />
                                ))
                            }
                        </View>
                    ))
                }

                <DocHeader text="2. Plan de gestion des travaux de construction" heading="h4" />
                {/* facultatif */}

                <Text break />
                <DocHeader text="V. CADRE DE MESURE DES PERFORMANCES" subline />

                <DocHeader text="A. Mécanismes de contrôle qualité" heading="h4" />
                {
                    /* tableau */
                    project.quality_monitoring && project.quality_monitoring.map((monitoring, index) => (
                        <DocText key={index} text={monitoring} />
                    ))
                }

                <DocHeader text="B. Matrice de performance du projet" heading="h4" />
                {
                    /* tableau */
                    project.performance_matrix && project.performance_matrix.map((matrix, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}.1. Analyse`} heading="h4" />
                            <DocText key={index} text={matrix.analyse} />

                            <DocHeader text={`${index + 1}.2. Extrant`} heading="h4" />
                            <DocText key={index} text={matrix.effect} />

                            <DocHeader text={`${index + 1}.3. Frequence`} heading="h4" />
                            <DocText key={index} text={matrix.frequency} />

                            <DocHeader text={`${index + 1}.4. Source`} heading="h4" />
                            {
                                matrix.verification_sources.map((source, index) => (
                                    <DocText key={index} text={source} />
                                ))
                            }

                            <DocHeader text={`${index + 1}.5. Outils`} heading="h4" />
                            {
                                matrix.collect_tools.map((tools, index) => (
                                    <DocText key={index} text={tools} />
                                ))
                            }
                        </View>
                    ))
                }

                <Text break />
                <DocHeader text="VI. PLAN DE TRAVAIL ANNUEL" subline />

                <DocHeader text="A. Calendrier pluriannuel d’exécution/ Diagramme de GANTT" heading="h4" />
                {
                    /* tableau */
                    project.calendar && project.calendar.map((calendar, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${calendar.outcome}`} heading="h4" />
                            {
                                calendar.activities.map((activity, index) => (
                                    <DocText key={index} text={activity.title} />
                                ))
                            }
                        </View>
                    ))
                }

                <Text break />
                <DocHeader text="VII. PLAN DE GESTION DES RISQUES" />

                <DocHeader text="A. Matrice de gestion des risques" heading="h4" />
                {
                    project.intervention_strategies && project.intervention_strategies.map((strategy, index) => (
                        <DocText key={index} text={strategy} />
                    ))
                }

                <Text break />
                <DocHeader text="VIII. Estimation des coûts" heading="h4" />

                <DocHeader text="A. Budget du projet" heading="h4" />
                {
                    project.budget_plan && project.budget_plan.map((section, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${section.section}`} heading="h4" />
                            {
                                section.activities.map((activity, index) => (
                                    <DocText key={index} text={activity.title} />
                                ))
                            }
                        </View>
                    ))
                }

            </Page>
        </Document>
    </PDFViewer >
);
