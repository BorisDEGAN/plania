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
import PageLoad from "../Loader/PageLoad";

const tw = createTw({});

export const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <PageLoad />,
    }
);

export const DocumentPrinter = ({ project }: { project: IProject }) => (
    <PDFViewer style={tw("w-full h-[100vh]")} >
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
                    <DocHeader text="1. Bref aperçu du projet" heading="h4" />
                    <DocHeader text="2. Contexte et Justification" heading="h4" />
                    <DocHeader text="3. Description du projet : Objectifs et portée" heading="h4" />
                </View>

                <DocHeader text="II. RÉSULTATS ATTENDUS" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="1. Cadre Logique" heading="h4" />
                    <DocHeader text="2. Structure de découpage du projet (WBS)" heading="h4" />
                    <DocHeader text="3. Axes stratégiques du projet" heading="h4" />
                </View>

                <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="1. Description des partenaires et de leur rôle" heading="h4" />
                    <DocHeader text="2. Plan de communication avec les partenaires" heading="h4" />
                </View>

                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES " heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="1. Plan de gestion des acquisitions" heading="h4" />
                    <DocHeader text="2. Plan de gestion des travaux de construction" heading="h4" />
                </View>

                <DocHeader text="V. CADRE DE MESURE DES PERFORMANCES " heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="1. Mécanismes de contrôle qualité" heading="h4" />
                    <DocHeader text="2. Matrice de performance du projet" heading="h4" />
                </View>

                <DocHeader text="VI. PLAN DE TRAVAIL ANNUEL" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="1. Calendrier pluriannuel d’exécution/ Diagramme de GANTT" heading="h4" />
                </View>

                <DocHeader text="VII. CHEMIN CRITIQUE" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="1. Matrice de gestion des risques" heading="h4" />
                </View>

                <DocHeader text="VIII. Estimation des coûts" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="1. Budget du projet" heading="h4" />
                </View>


                <Text break />
                <DocHeader text="I. INTRODUCTION" subline />

                <DocHeader text="1. Bref aperçu du projet" heading="h4" />
                <DocText text={project.overview} />

                <DocHeader text="2. Contexte et Justification" heading="h4" />
                <DocText text={project.context} />
                <DocText text={project.justification} />

                <DocHeader text="3. Description du projet : Objectifs et portée" heading="h4" />
                <DocText text={project.description} />
                {
                    project.objectives.map((objectif, index) => (
                        <View key={index}>
                            <DocText key={index} text={'- ' + objectif} />
                        </View>
                    ))
                }

                <Text break />
                <DocHeader text="II. RÉSULTATS ATTENDUS" subline />

                <DocHeader text="1. Cadre Logique" heading="h4" />
                <DocHeader text="2. Structure de découpage du projet (WBS)" heading="h4" />
                <DocHeader text="3. Axes stratégiques du projet" heading="h4" />
                {
                    project.outcomes.map((outcome, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${outcome.title}`} heading="h4" />
                            {
                                outcome.activities.map((activity, index) => (
                                    <DocText key={index} text={activity} />
                                ))
                            }
                        </View>
                    ))
                }

                <Text break />
                <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" subline />

                <DocHeader text="1. Description des partenaires et de leur rôle" heading="h4" />
                {
                    project.partners.map((partner, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${partner.name}`} heading="h4" />
                            {
                                partner.abilities.map((ability, index) => (
                                    <DocText key={index} text={ability} />
                                ))
                            }
                        </View>
                    ))
                }
                <DocHeader text="2. Plan de communication avec les partenaires" heading="h4" />

                <Text break />
                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES " subline />
                {
                    project.objectives.map((activity, index) => (
                        <View key={index}>
                            <DocText key={index} text={activity} />
                        </View>
                    ))
                }

                <Text break />
                <DocHeader text="V. CADRE DE MESURE DES PERFORMANCES " subline />
                {
                    project.performance_matrix.map((matrix, index) => (
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
                {
                    project.budget_plan.map((plan, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${plan.section}`} heading="h4" />
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
                    project.intervention_strategies.map((strategy, index) => (
                        <DocText key={index} text={strategy} />
                    ))
                }


            </Page>
        </Document>
    </PDFViewer >
);
