"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateEditProject from "@/components/CreateEditForm/Project";
import React from "react";

export default function Create() {

    return (
        <div>
            <Breadcrumb pageName="Créer projet" />
            <CreateEditProject />
        </div>
    );
}
