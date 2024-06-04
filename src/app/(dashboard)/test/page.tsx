"use client";

import useTestApi from "@/services/test.service";
import React from "react";

export default function Test() {
    const { data: projectsStats, isLoading,  } = useTestApi().getProjects()

    return (
        <div>
            {
                isLoading ?
                    <p>Loading...</p> :
                    <p>{JSON.stringify(projectsStats)}</p>
            }
        </div>
    );
}
