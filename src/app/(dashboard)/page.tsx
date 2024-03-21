"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import { CarTaxiFront } from "lucide-react";

export default function Dashboard() {

  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
          <CarTaxiFront className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>
    </>
  );
}
