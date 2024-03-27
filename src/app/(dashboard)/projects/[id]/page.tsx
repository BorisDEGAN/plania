"use client";

import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { useEffect, useState } from "react";

export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    const [project, setProject] = useState<IProject>({})

    const [loading, setLoading] = useState(false)

    function getProject() {
        setLoading(true)
        projectApi().getProject(id).then((response) => {
            setProject(response.data)
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        getProject()
    }, [])

    return (
        <div className="space-y-6 animate-pulse w-full">
            <div className="flex items-center justify-center h-56 max-w-sm bg-slate-300 rounded-lg animate-pulse">
                <svg className="w-10 h-10 text-slate-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 bg-slate-300 rounded-full w-32"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-24"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-80"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-32"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-24"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-80"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 bg-slate-300 rounded-full w-32"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-24"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-80"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-32"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-24"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-80"></div>
                <div className="h-2.5 ms-2 bg-slate-300 rounded-full w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
