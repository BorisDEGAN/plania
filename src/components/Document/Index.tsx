"use client";

import React from "react";
import {
    Text,
    View,
    Document,
    Image as ImagePDF,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { BudgetPlanActivity, BudgetPlanItem, CalendarActivity, CalendarItem, IProject, IProjectPlan, LogicalContextImmediateOutcome, LogicalContextIntermediateOutcome, PerformanceMatrixItem } from "@/shared/models";
import { createTw } from "react-pdf-tailwind";
import DocText from "./DocText";
import DocHeader from "./DocHeader";
import PageLoad from "../Loader/PageLoad";
import { DataTableCell, Table, TableBody, TableCell, TableHeader } from "./src";
import DocPage from "./DocPage";

const tw = createTw({});

export const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <PageLoad />,
    }
);

export const DocumentPrinter = ({ project }: { project: IProjectPlan }) => (
    <PDFViewer style={tw("w-full h-[85vh] rounded")} >
        <Document title={project.title} subject={project.title} creator="Made with Plan'IA" author="Plan'IA" producer="Plan'IA">

            <DocPage>
                <View style={tw("m-auto")}>
                    <DocText text={project.title} style="text-2xl uppercase text-center" />
                    <DocText text="PLAN DE MISE EN OEUVRE" style="text-xl uppercase text-center" />
                </View>
            </DocPage>

            <DocPage>
                <Text style={tw("mb-4 text-center text-2xl")}>Sommaire</Text>

                <DocHeader text="I. INTRODUCTION" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Bref aperçu" heading="h4" />
                    <DocHeader text="B. Contexte et Justification" heading="h4" />
                    <DocHeader text="C. Description : Objectifs et portée" heading="h4" />
                    <View style={tw("ml-4")}>
                        <DocHeader text="1. Objectif global" heading="h5" />
                        <DocHeader text="2. Objectifs spécifiques" heading="h5" />
                        <DocHeader text="3. Portée" heading="h5" />
                    </View>
                </View>

                <DocHeader text="II. RÉSULTATS ATTENDUS" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Cadre Logique" heading="h4" />
                    <DocHeader text="B. Structure de découpage" heading="h4" />
                    <DocHeader text="C. Axes stratégiques" heading="h4" />
                </View>

                <DocHeader text="III. STRATÉGIE DE COORDINATION DES PARTENAIRES" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Description des partenaires et de leur rôle" heading="h4" />
                    <DocHeader text="B. Plan de communication avec les partenaires" heading="h4" />
                </View>

                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Plan de gestion des acquisitions" heading="h4" />
                    <DocHeader text="B. Plan de gestion des travaux de construction" heading="h4" />
                </View>

                <DocHeader text="V. NORMES DE QUALITÉ ET DE PERFORMANCE" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Plan de suivi de la qualité" heading="h4" />
                    <DocHeader text="B. Matrice de performance" heading="h4" />
                </View>

                <DocHeader text="VI. STRATÉGIE DE GESTION" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Stratégie de gestion globale" heading="h4" />
                    <DocHeader text="B. Description des comités de gestion" heading="h4" />
                </View>

                <DocHeader text="VII. STRATÉGIE DE RENFORCEMENTS DES CAPACITÉS DES ACTEURS" heading="h4" />

                <DocHeader text="VIII. THÈMES TRANSVERSAUX" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Stratégie d&apos;égalité genre" heading="h4" />
                    <DocHeader text="B. Stratégie de gestion de l&apos;environnement" heading="h4" />
                </View>

                <DocHeader text="IX. STRATÉGIE DE PÉRENNISATION" heading="h4" />

                <DocHeader text="X. PLAN DE GESTION DES RISQUES" heading="h4" />

                <DocHeader text="XI. BUDGET" heading="h4" />

                <DocHeader text="XII. PLAN DE TRAVAIL ANNUEL" heading="h4" />
            </DocPage>

            <DocPage>
                <DocHeader text="I. INTRODUCTION" subline />

                <DocHeader text="A. Bref aperçu" heading="h4" />
                <DocText text={project.overview} />

                <DocHeader text="B. Contexte et Justification" heading="h4" />
                <DocText text={project.context} />
                <DocText text={project.justification} />

                <DocHeader text="C. Description" heading="h4" />
                <DocText text={project.description} />

                <DocHeader text="1. Objectif global" heading="h4" />
                <DocText text={project.global_objective} />

                <DocHeader text="2. Objectifs spécifiques" heading="h4" />
                {
                    project.objectives && project.objectives.map((objectif, index) => (
                        <View key={index}>
                            <DocText key={index} text={'- ' + objectif} />
                        </View>
                    ))
                }
            </DocPage>

            <DocPage>
                <DocHeader text="3. Portée" heading="h4" />
                <Table
                    data={project.scopes || []}
                >
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            ZONE D&apos;INTERVENTION
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            BÉNÉFICIAIRE HOMME
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            BÉNÉFICIAIRE FEMME
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            TOTAL BÉNÉFICIAIRE
                        </TableCell>
                    </TableHeader>
                    <TableBody textAlign="center">
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(scope) => scope.intervention_zone}> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(scope) => scope.male_beneficiary}> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(scope) => scope.female_beneficiary}> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(scope) => scope.total_beneficiary}> </DataTableCell>
                    </TableBody>
                </Table>
            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="II. RÉSULTATS ATTENDUS" subline />

                <DocHeader text="A. Cadre Logique" heading="h4" />
                <Table
                    data={project.logical_context.intermediate_outcomes}
                >
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            ACTIVITES
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            EXTRANTS
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            RESULTATS IMMEDIATS
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            RESULTATS INTERMEDIAIRES
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            IMPACT
                        </TableCell>
                    </TableHeader>
                    <TableBody textAlign="center">
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(outcome: LogicalContextIntermediateOutcome) => (
                            outcome.immediate_outcomes.map((imOutcome, indexOutcome) => (
                                imOutcome.activities && imOutcome.activities.map((activity, indexActivity) => (
                                    <DocText key={indexActivity} text={`${indexOutcome + 1}.${indexActivity + 1} ${activity.title}`} />
                                ))
                            ))
                        )}> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(outcome: LogicalContextIntermediateOutcome) => (
                            outcome.immediate_outcomes.map((imOutcome, indexOutcome) => (
                                imOutcome.activities && imOutcome.activities.map((activity, indexActivity) => (
                                    <DocText key={indexActivity} text={`${indexOutcome + 1}.${indexActivity + 1} ${activity.effect}`} />
                                ))
                            ))
                        )}> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(outcome: LogicalContextIntermediateOutcome) => (
                            outcome.immediate_outcomes.map((imOutcome, indexOutcome) => (
                                <DocText key={indexOutcome} text={`${imOutcome.title}`} />
                            ))
                        )}> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(outcome: LogicalContextIntermediateOutcome) => (
                            <DocText text={`${outcome.title}`} />
                        )}> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={() => (
                            <DocText text={project.logical_context.impact} />
                        )}> </DataTableCell>
                    </TableBody>
                </Table>
            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="B. Structure de découpage" heading="h4" />
                <Table
                    data={[{}]}
                >
                    <TableHeader textAlign="center">
                        {
                            project.logical_context.intermediate_outcomes.map((intermediate_outcome, index) => (
                                <TableCell style={tw("font-semibold bg-gray-100 p-2")} key={`intermediate_outcome_${index}`}>{intermediate_outcome.title}</TableCell>
                            ))
                        }
                    </TableHeader>
                    <TableBody textAlign="center">
                        {
                            project.logical_context.intermediate_outcomes.map((it_outcome, itIndex) => (
                                <DataTableCell style={tw("bg-gray-50 p-1")} key={`it_outcome_${itIndex}`} getContent={(() => (
                                    it_outcome.immediate_outcomes.map((imOutcome, imIndex) => (
                                        imOutcome.activities.map((activity, acIndex) => (
                                            <DocText key={`activity_${acIndex}`} text={`${imIndex + 1}.${acIndex + 1} ${activity.effect}`} />
                                        ))
                                    ))
                                ))}> </DataTableCell>
                            ))
                        }
                    </TableBody>
                </Table>

                <DocHeader text="C. Axes stratégiques" heading="h4" />
                {
                    project.intervention_strategies.map((strategie, index) => (
                        <DocText key={`intervention_strategies${index}`} text={`${index + 1}. ${strategie}`} />
                    ))
                }

                <Text break />
                <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" subline />

                <DocHeader text="A. Description des partenaires et de leur rôle" heading="h4" />
                <Table
                    data={project.partners || []}
                >
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            PARTENAIRES
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            ROLES ET RESPONSABILITES
                        </TableCell>
                    </TableHeader>
                    <TableBody textAlign="center">
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(partner) => (
                            <>
                                <DocText text={partner.title} />
                                <Table
                                    data={partner.managment_levels || []}
                                >
                                    <TableHeader textAlign="center">
                                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                                            PARTENAIRES
                                        </TableCell>
                                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                                            ROLES ET RESPONSABILITES
                                        </TableCell>
                                    </TableHeader>
                                    <TableBody textAlign="center">
                                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(managment) => (
                                            <DocText text={managment.title} />
                                        )}> </DataTableCell>
                                    </TableBody>
                                </Table>
                            </>
                        )}> </DataTableCell>
                    </TableBody>
                </Table>

                <DocHeader text="B. Plan de communication avec les partenaires" heading="h4" />
                {/* A REFAIRE */}
                {/* {
                    project.partners_reinforcement?.strategies?.map((strategie, index) => (
                        <DocText key={`partners_reinforcement.strategies${index}`} text={`${index + 1}. ${strategie}`} />
                    ))
                } */}

                <Text break />
                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES" subline />

                <DocHeader text="A. Plan de gestion des acquisitions" heading="h4" />
                <Table data={project.acquisition_plan || []}>
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            TYPE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            QUANTITÉ
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            PRIX UNITAIRE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            TOTAL
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            PÉRIODE
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(acquisition) => acquisition?.type}><div /> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(plan) => (
                            <>
                                <DocText text={`Du ${plan?.period?.from} au ${plan?.period?.to}`} />
                                <Table data={plan?.acquisitions || []}>
                                    <TableBody textAlign="center">
                                        <DataTableCell getContent={(acquisition) => acquisition?.type}><div /> </DataTableCell>
                                        <DataTableCell getContent={(acquisition) => acquisition?.quantity}><div /> </DataTableCell>
                                        <DataTableCell getContent={(acquisition) => acquisition?.unit_price}><div /> </DataTableCell>
                                        <DataTableCell getContent={(acquisition) => acquisition?.total_price}><div /> </DataTableCell>
                                    </TableBody>
                                </Table>
                            </>
                        )}><div /></DataTableCell>
                    </TableBody>
                </Table>

                <DocHeader text="B. Plan de gestion des travaux de construction" heading="h4" />
                <Table data={project.infrastructures_plan || []}>
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            LOCALITÉ
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            TYPE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            DESCRIPTION
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            COUT
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            PÉRIODE
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(plan) => plan?.locality}><div /> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(plan) => plan?.type}><div /> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(plan) => plan?.description}><div /> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(plan) => plan?.cost}><div /> </DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(plan) => (`Du ${plan?.period?.from} au ${plan?.period?.to}`)}><div /></DataTableCell>
                    </TableBody>
                </Table>

                <Text break />
                <DocHeader text="V. NORMES DE QUALITÉ ET DE PERFORMANCE" subline />

                <DocHeader text="A. Plan de suivi de la qualité" heading="h4" />
                {
                    project.quality_monitoring && project.quality_monitoring.map((monitoring, index) => (
                        <DocText key={index} text={`${index + 1}. ${monitoring}`} />
                    ))
                }

            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="B. Matrice de performance" heading="h4" />
                <Table
                    data={project.performance_matrix || []}
                >
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            INDICATEURS
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            DONNE DE BASE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            CIBLE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            SOURCE DE DONNES
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            METHODE DE COLLECTE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            FREQUENCE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            RESPONSABLE
                        </TableCell>
                    </TableHeader>
                    <TableBody textAlign="center">
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(matrix: PerformanceMatrixItem) => (
                            <>
                                <DocText text={matrix.outcome} />
                                <Table data={matrix.indicateur}>
                                    <TableBody>
                                        <DataTableCell getContent={(indicateur) => indicateur.title}><div /> </DataTableCell>
                                        <DataTableCell getContent={(indicateur) => (
                                            indicateur?.props?.baseline?.map((baseline, index) => (
                                                <DocText key={index} text={baseline} />
                                            ))
                                        )}><div /> </DataTableCell>
                                        <DataTableCell getContent={(indicateur) => indicateur.props.target}><div /> </DataTableCell>
                                        <DataTableCell getContent={(indicateur) => (
                                            indicateur?.props?.data_souces?.map((source, index) => (
                                                <DocText key={index} text={source} />
                                            ))
                                        )}><div /> </DataTableCell>
                                        <DataTableCell getContent={(indicateur) => (
                                            indicateur?.props?.collect_tools?.map((collect_tool, index) => (
                                                <DocText key={index} text={collect_tool} />
                                            ))
                                        )}><div /> </DataTableCell>
                                        <DataTableCell getContent={(indicateur) => (
                                            indicateur?.props?.frequency?.map((frequency, index) => (
                                                <DocText key={index} text={frequency} />
                                            ))
                                        )}><div /> </DataTableCell>
                                        <DataTableCell getContent={(indicateur) => (
                                            indicateur?.props?.managers?.map((manager, index) => (
                                                <DocText key={index} text={manager} />
                                            ))
                                        )}><div /> </DataTableCell>
                                    </TableBody>
                                </Table>
                            </>
                        )}> </DataTableCell>

                    </TableBody>
                </Table>
            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="VI. STRATÉGIE DE GESTION" subline />
                <DocHeader text="A. Stratégie de gestion globale" heading="h4" />
                {
                    project.partners && project.partners.map((partner, index) => (
                        partner.managment_levels && <DocText key={index} text={`${index + 1}. ${partner.managment_levels[0].title}`} />
                    ))
                }

                <DocHeader text="B. Description des comités de gestion" heading="h4" />
                {
                    project.partners && project.partners.map((partner, index) => (
                        partner.managment_levels && <DocText key={index} text={`${index + 1}. ${partner.managment_levels[0].level}`} />
                    ))
                }

                <DocHeader text="VII. STRATÉGIE DE RENFORCEMENTS DES CAPACITÉS DES ACTEURS" subline />
                {
                    project.partners_reinforcement.strategies && project.partners_reinforcement.strategies.map((strategy, index) => (
                        <DocText key={index} text={`${index + 1}. ${strategy}`} />
                    ))
                }
            </DocPage>

            <DocPage orientation="portrait">
                <DocHeader text="VIII. THÈMES TRANSVERSAUX" subline />
                <DocHeader text="A. Stratégie d'égalité genre" heading="h4" />
                {
                    project.genre_equality?.strategies?.map((strategie, index) => (
                        <DocText key={`genre_equality${index}`} text={`${index + 1}. ${strategie}`} />
                    ))
                }

                <DocHeader text="B. Stratégie de gestion de l'environnement" heading="h4" />
                {
                    project.environment?.strategies?.map((strategie, index) => (
                        <DocText key={`environment${index}`} text={`${index + 1}. ${strategie}`} />
                    ))
                }

                <DocHeader text="IX.  STRATÉGIE DE PÉRENNISATION" subline />
                {
                    project.outter_strategies?.strategies?.map((strategie, index) => (
                        <DocText key={`outt.outter_strategies${index}`} text={`${index + 1}. ${strategie}`} />
                    ))
                }

            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="X. PLAN DE GESTION DES RISQUES" subline />
                <Table data={project.risks.risk_handles || []}>
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            RISQUES
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            NIVEAU DE RISQUE
                            (Faible-Moyen-Élevé)
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            MESURES DE MITIGATION
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(risk) => risk?.risk}><div /></DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(risk) => risk?.level}><div /></DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(risk) => risk?.strategy}><div /></DataTableCell>
                    </TableBody>
                </Table>
            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="XI. BUDGET" heading="h4" />
                <Table
                    data={project.budget_plan || []}
                >
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            RUBRIQUES
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            UNITE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            QUANTITE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            FREQUENCE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            PRIX UNITAIRE
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            MONTANT
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(budget: BudgetPlanItem) => (
                            <>
                                <DocText text={budget.section} style="font-semibold text-blue-500" />
                                <Table data={budget.activities} zebra>
                                    <TableBody zebra>
                                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(activity: BudgetPlanActivity) => activity.title} ><div /></DataTableCell>
                                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(activity: BudgetPlanActivity) => activity.unit} ><div /></DataTableCell>
                                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(activity: BudgetPlanActivity) => activity.quantity} ><div /></DataTableCell>
                                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(activity: BudgetPlanActivity) => activity.frequency} ><div /></DataTableCell>
                                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(activity: BudgetPlanActivity) => activity.unit_price} ><div /></DataTableCell>
                                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(activity: BudgetPlanActivity) => activity.amount} ><div /></DataTableCell>
                                    </TableBody>
                                </Table>
                            </>
                        )} ><div /></DataTableCell>
                    </TableBody>
                </Table>
            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="XII. PLAN DE TRAVAIL ANNUEL" heading="h4" />
                <Table data={project.risks.risk_handles || []}>
                    <TableHeader textAlign="center">
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            RISQUES
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            NIVEAU DE RISQUE
                            (Faible-Moyen-Élevé)
                        </TableCell>
                        <TableCell style={tw("font-semibold bg-gray-100 p-2")}>
                            MESURES DE MITIGATION
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(risk) => risk?.risk}><div /></DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(risk) => risk?.level}><div /></DataTableCell>
                        <DataTableCell style={tw("bg-gray-50 p-1")} getContent={(risk) => risk?.strategy}><div /></DataTableCell>
                    </TableBody>
                </Table>

            </DocPage>
        </Document>
    </PDFViewer >
);
