"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/Card/CardDataStats";
import statApi from "@/services/stat.service";
import { CarTaxiFront } from "lucide-react";
import React from "react";

export default function Dashboard() {

  const [stats, setStats] = React.useState<{ total: number, finished: number, pending: number, canceled: number }>({ total: 0, finished: 0, pending: 0, canceled: 0 })
  const [loading, setLoading] = React.useState(false)

  function getStats() {
    setLoading(true)
    statApi().projectsStats().then((response) => {
      setStats(response.data)
    }).finally(() => setLoading(false))
  }

  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Projets" total={stats.total} loading={loading} >
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Projets terminés" total={stats.finished} loading={loading} >
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Projets annulés" total={stats.canceled} loading={loading} >
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Projets en cours" total={stats.pending} loading={loading} >
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>
    </>
  );
}
