"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/Card/CardDataStats";
import statApi from "@/services/stat.service";
import { IStats } from "@/shared/models";
import { CarTaxiFront, LucideFile, LucideFileArchive } from "lucide-react";
import React from "react";

export default function Dashboard() {

  const [projectStats, setProjectStats] = React.useState<IStats>({ accepted: 0, canceled: 0, finished: 0, pending: 0 })

  const [projectPlanStats, setProjectPlanStats] = React.useState<IStats>({ accepted: 0, canceled: 0, finished: 0, pending: 0 })

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    statApi().projectsStats().then((response) => {
      setProjectStats(response.data)
    }).finally(() => setLoading(false))

    statApi().projectPlansStats().then((response) => {
      setProjectPlanStats(response.data)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Projets acceptés" total={projectStats.accepted} loading={loading} >
            <LucideFile className="fill-primary" />
          </CardDataStats>
          <CardDataStats title="Projets terminés" total={projectStats.finished} loading={loading} >
            <LucideFile className="fill-primary" />
          </CardDataStats>
          <CardDataStats title="Projets annulés" total={projectStats.canceled} loading={loading} >
            <LucideFile className="fill-primary" />
          </CardDataStats>
          <CardDataStats title="Projets en cours" total={projectStats.pending} loading={loading} >
            <LucideFile className="fill-primary" />
          </CardDataStats>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="PiPs acceptés" total={projectPlanStats.accepted} loading={loading} >
            <LucideFileArchive className="fill-primary" />
          </CardDataStats>
          <CardDataStats title="PiPs terminés" total={projectPlanStats.finished} loading={loading} >
            <LucideFileArchive className="fill-primary" />
          </CardDataStats>
          <CardDataStats title="PiPs annulés" total={projectPlanStats.canceled} loading={loading} >
            <LucideFileArchive className="fill-primary" />
          </CardDataStats>
          <CardDataStats title="PiPs en cours" total={projectPlanStats.pending} loading={loading} >
            <LucideFileArchive className="fill-primary" />
          </CardDataStats>
        </div>


      </div>
    </>
  );
}
