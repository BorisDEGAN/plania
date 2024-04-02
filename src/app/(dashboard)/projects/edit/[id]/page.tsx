"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateEditProject from "@/components/CreateEditForm/Project";
import React from "react";

export default function Create({ params }: { params: { id: string } }) {

    return (
        <div>
            <Breadcrumb pageName="Modifier projet" />
            <CreateEditProject id={params.id} />
        </div>
    );
}
