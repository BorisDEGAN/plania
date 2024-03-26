"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateEditProject from "@/components/CreateEditForm/Project";
import projectApi from "@/services/project.service";
import { useParams } from "next/navigation";
import React from "react";

export default function Create({ params }: { params: { id: string } }) {

    return (
        <div>
            <Breadcrumb pageName="Modifier projet" />
            <CreateEditProject id={params.id} />
        </div>
    );
}
