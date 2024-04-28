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


/* "use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateEditProject from "@/components/CreateEditForm/Project";
import { EmptyProjectData } from "@/components/CreateEditForm/Project/data";
import projectApi from "@/services/project.service";
import { useRouter } from "next/navigation";
import React from "react";

export default function Create() {

    const router = useRouter();

    (() => {
        projectApi().createProject(EmptyProjectData).then((response) => {
            router.replace(`/projects/edit/${response.data.id}`)
        })
    })()

    return (
        <div>
            <Breadcrumb pageName="Créer projet" />
            <CreateEditProject />
        </div>
    );
} */
