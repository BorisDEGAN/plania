"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import { CarTaxiFront } from "lucide-react";

export default function Dashboard() {

  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Projets" total="122" rate="0.43%" levelUp>
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Projets terminés" total="12" rate="4.35%" levelUp>
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Projets annulés" total="7" rate="2.59%" levelUp>
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Projets en cours" total="2" rate="0.95%" levelDown>
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>
    </>
  );
}
