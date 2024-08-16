"use client";

import CardLoad from "@/components/Card/CardLoad";
import { CardPip } from "@/components/Card/CardPip";
import PageLoad from "@/components/Loader/PageLoad";
import { Button } from "@/components/ui/button";
import projectPlanApi from "@/services/project-plan.service";
import projectApi from "@/services/project.service";
import useToast from "@/shared/helpers/useToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { IProject, IProjectPlan } from "@/shared/models";
import React, { useState } from "react";
import { Ellipsis, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import InputText from "@/components/Form/InputText";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { title } from "process";
import { v4 } from "uuid";

export default function Project({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { toastSuccess } = useToast();
  const [projectPlans, setProjectPlans] = useState<IProjectPlan[]>([]);
  const [project, setProject] = useState<IProject | null>(null);
  const [updateProject] = React.useState<{
    project_id: string | number;
    new_duration: number | string;
    new_budget: number | string;
  }>({
    project_id: id,
    new_budget: "",
    new_duration: "",
  });

  const [loading, setLoading] = useState({
    project: false,
    project_plan: false,
    update_project: false,
  });

  function getProjectPlans() {
    setLoading({
      ...loading,
      project_plan: true,
    });
    projectPlanApi()
      .searchProjectPlans({ project_id: id })
      .then((response) => {
        setProjectPlans(response.data);
      })
      .finally(() =>
        setLoading({
          ...loading,
          project_plan: false,
        })
      );
  }

  async function generateProjectPlan() {
    setLoading({
      ...loading,
      project_plan: true,
    });
    await projectPlanApi()
      .createProjectPlan({ project_id: id })
      .then((response) => {
        toastSuccess(response.message);
        getProjectPlans();
      })
      .finally(() =>
        setLoading({
          ...loading,
          project_plan: false,
        })
      );
  }

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: updateProject,
    validationSchema: yup.object().shape({
      project_id: yup.number().required(),
      new_budget: yup.string().required(),
      new_duration: yup.number().required(),
    }),
    onSubmit: (values) => {
      setLoading({ ...loading, update_project: true });
      projectPlanApi()
        .createProjectPlan(values)
        .then((response) => {
          toastSuccess(response.message);
          getProjectPlans();
        })
        .finally(() => setLoading({ ...loading, update_project: true }));
    },
  });

  function MenuOption(project: IProject) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/generate-pip/${project.id}`);
            }}
            className="outline-0 w-full flex justify-start"
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <EyeIcon className="text-blue-500" size={18} />
              <span>Afficher</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  React.useEffect(() => {
    (() => {
      setLoading({
        ...loading,
        project: true,
      });
      projectApi()
        .getProject(id)
        .then((response) => {
          setProject(response.data);
        })
        .finally(() => {
          getProjectPlans();
          setLoading({
            ...loading,
            project: false,
          });
        });
    })();
  }, [id]);

  return loading.project ? (
    <PageLoad />
  ) : (
    <>
      {project && (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-justify mb-4">{project.overview}</p>

          {/* <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Résumé exécutif</h2>
            <p className="text-justify">{project.executive_resume}</p>
          </div> */}

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Contexte</h2>
            <p className="text-justify">{project.context}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Justification</h2>
            <p className="text-justify">{project.justification}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-justify">{project.description}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Objectif global</h2>
            <p className="text-justify">{project.global_objective}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Objectifs spécifiques
            </h2>
            <ul>
              {project.objectives.map((objective, index) => (
                <li key={v4()}>{objective}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Portée</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    Zone d&apos;intervention
                  </TableHead>
                  <TableHead>Béneficiaire homme</TableHead>
                  <TableHead>Béneficiaire femme</TableHead>
                  <TableHead className="text-right">
                    Béneficiaire total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.scopes.map((scope, index) => (
                  <TableRow key={v4()}>
                    <TableCell className="font-medium text-center">
                      {scope.intervention_zone}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {scope.male_beneficiary}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {scope.female_beneficiary}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {scope.total_beneficiary}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Durée</h2>
            <p className="text-justify">{project.duration} jours</p>
          </div>

          {/* <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Budget</h2>
                            <p className="text-justify">{project.budget} {project.budget_currency}</p>
                        </div> */}

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Contexte logique</h2>
            <p className="text-justify">
              Impact: {project.logical_context.impact}
            </p>
            {project.logical_context.intermediate_outcomes.map(
              (outcome, index) => (
                <div key={v4()}>
                  <h3 className="text-lg font-semibold mt-4 mb-2">
                    {outcome.title}
                  </h3>
                  {outcome.immediate_outcomes.map((immediateOutcome, i) => (
                    <div key={v4()}>
                      <h4 className="text-md font-semibold mt-2 mb-1">
                        {immediateOutcome.title}
                      </h4>
                      <ul>
                        {immediateOutcome.activities &&
                          immediateOutcome.activities.map((activity, j) => (
                            <li key={v4()}>
                              {activity.title}: {activity.effect}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Stratégie d&apos;intervention
            </h2>
            <ul>
              {project.intervention_strategies.map((strategy, index) => (
                <li key={v4()}>{strategy}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Plan des acquisitions
            </h2>
            <h4 className="text-justify">Acquisition</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Type</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Prix unitaire</TableHead>
                  <TableHead className="">Prix total</TableHead>
                  <TableHead className="">Période</TableHead>
                </TableRow>
              </TableHeader>
              {project.acquisition_plan.map((acquisition_plan, index) => (
                <TableBody key={v4()}>
                  {acquisition_plan.acquisitions.map((acquisition, index) => (
                    <TableRow key={v4()}>
                      <TableCell className="font-medium">
                        {acquisition.type}
                      </TableCell>
                      <TableCell className="font-medium">
                        {acquisition.quantity}
                      </TableCell>
                      <TableCell className="font-medium">
                        {acquisition.unit_price}
                      </TableCell>
                      <TableCell className="font-medium">
                        {acquisition.total_price}
                      </TableCell>
                      <TableCell className="font-medium">
                        {acquisition_plan.period.from.split("T")[0]} -{" "}
                        {acquisition_plan.period.to.split("T")[0]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ))}
            </Table>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Plan des infrastructures
            </h2>
            <h4 className="text-justify">Acquisition</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Localité</TableHead>
                  <TableHead>Type d&apos;infrastructure</TableHead>
                  <TableHead>Coût / Montant</TableHead>
                  <TableHead className="">Période</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.infrastructures_plan.map(
                  (infrastructures_plan, index) => (
                    <TableRow key={v4()}>
                      <TableCell className="font-medium">
                        {infrastructures_plan.locality}
                      </TableCell>
                      <TableCell className="font-medium">
                        {infrastructures_plan.type}
                      </TableCell>
                      <TableCell className="font-medium">
                        {infrastructures_plan.cost}
                      </TableCell>
                      <TableCell className="font-medium">
                        {infrastructures_plan.period.from.split("T")[0]} -{" "}
                        {infrastructures_plan.period.to.split("T")[0]}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
            <h4 className="text-justify">Période</h4>
          </div>

          {/* <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Mécanisme de suivi de la qualité</h2>
            {project.quality_monitoring.map((quality_monitoring, index) => (
              <>
              </>
            ))}
          </div> */}

          {/* <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Matrice de performance
            </h2>
            {project.performance_matrix.map((performance_matrix) => (
              <div key={v4()}>
                <p className="font-bold my-3">{performance_matrix.outcome}</p>
                {performance_matrix.indicateur.map((indicateur, index) => (
                  <div key={v4()}>
                    <h4 className="font-bold my-3">{indicateur.title}</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Base de référence</TableHead>
                          <TableHead>Outils de collecte</TableHead>
                          <TableHead>Sources de données</TableHead>
                          <TableHead className="">Fréquence</TableHead>
                          <TableHead className="">Gestionnaires </TableHead>
                          <TableHead className="">Cible</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            {indicateur.props.baseline}
                          </TableCell>
                          <TableCell className="font-medium">
                            {indicateur.props.collect_tools}
                          </TableCell>
                          <TableCell className="font-medium">
                            {indicateur.props.data_souces}
                          </TableCell>
                          <TableCell className="font-medium">
                            {indicateur.props.frequency}
                          </TableCell>
                          <TableCell className="font-medium">
                            {indicateur.props.managers}
                          </TableCell>
                          <TableCell className="font-medium">
                            {indicateur.props.target}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            ))}
          </div> */}

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Plan budgétaire</h2>
            {/* <h4>
              {project.budget_plan.map((budget_plan) => budget_plan.section)}
            </h4> */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Titre</TableHead>
                  <TableHead>Unité</TableHead>
                  <TableHead>Fréquence</TableHead>
                  <TableHead className="">Quantité</TableHead>
                  <TableHead className="">Prix unitaire </TableHead>
                  <TableHead className="">Montant</TableHead>
                </TableRow>
              </TableHeader>
              {project.budget_plan.map((budget_plan, index) => (
                <TableBody key={v4()}>
                  {budget_plan.activities.map((budget_plan, index) => (
                    <TableRow key={v4()}>
                      <TableCell className="font-medium">
                        {budget_plan.title}
                      </TableCell>
                      <TableCell className="font-medium">
                        {budget_plan.unit}
                      </TableCell>
                      <TableCell className="font-medium">
                        {budget_plan.frequency}
                      </TableCell>
                      <TableCell className="font-medium">
                        {budget_plan.quantity}
                      </TableCell>
                      <TableCell className="font-medium">
                        {budget_plan.unit_price}
                      </TableCell>
                      <TableCell className="font-medium">
                        {budget_plan.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ))}
            </Table>
          </div>

          {/* <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Calendrier</h2>
            {project.calendar.map((calendar, index) => (
              <div key={v4()}>
                <p className="font-bold my-3">{calendar.outcome}</p>
                {calendar.activities.map((activity, index) => (
                  <ul key={v4()}>
                    {activity.period.map((period, index) => (
                      <div>
                        <p key={v4()}>
                          {period.from.split("T")[0]} -{" "}
                          {period.to.split("T")[0]}
                        </p>
                        <li key={v4()}>{activity.title}</li>
                      </div>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </div> */}
         {/*  <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Partenaires</h2>
            {project.partners && project.partners.map((partner) => (
              <div key={v4()}>
                {partner.managment_levels && partner.managment_levels.map((managment_levels) => (
                  <div key={v4()}>
                    <h3 className="text-lg font-semibold mt-4 mb-2">{managment_levels.level}</h3>
                    <h3 className="text-lg font-semibold mt-4 mb-2">{managment_levels.title}</h3>
                    {managment_levels.stakeholders.map((stakeholder) => (
                      <div key={v4()}>
                        <h4 className="text-md font-semibold mt-2 mb-1">Stakeholder: {stakeholder.name.join(", ")}</h4>
                        <p className="text-justify">Abilities: {stakeholder.abilities.join(", ")}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div> */}

          <div className="flex justify-end items-baseline space-x-4 w-full">
            <div className="grid grid-cols-2 gap-4 w-full">
              <InputText
                name="new_budget"
                placeholder="Budget"
                value={values.new_budget}
                onChange={handleChange}
                errors={errors.new_budget}
              />
              <InputText
                name="new_duration"
                placeholder="Durée (Jours)"
                type="number"
                value={values.new_duration}
                onChange={handleChange}
                errors={errors.new_duration}
              />
            </div>
            <Button
              onClick={generateProjectPlan}
              loading={loading.project_plan}
            >
              Actualiser
            </Button>
            {/* <Button onClick={generateProjectPlan} loading={loading.project_plan}>Générer le PiP</Button> */}
          </div>
        </div>
      )}

      {projectPlans.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-4">
            Historique des PiPs générés
          </h3>
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4 border rounded p-2 border-slate-300">
            {loading.project_plan
              ? [1, 2, 3, 4, 5, 6].map((item) => <CardLoad key={item} />)
              : projectPlans.map((project) => (
                <CardPip
                  key={project.id}
                  project={project}
                  menuOptions={MenuOption(project)}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
}
