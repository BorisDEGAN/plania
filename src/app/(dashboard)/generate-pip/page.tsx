"use client";;
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputText from "@/components/Form/InputText";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useModalStore from "@/stores/useModalStore";

export default function Project() {

    const router = useRouter()

    const { showModal } = useModalStore()

    const [projects, setProjects] = React.useState<IProject[]>([])

    const [loading, setLoading] = React.useState(false)

    const [searchOptions, setSearchOptions] = React.useState({
        title: "",
        description: "",
        per_page: 10,
        page: 1,
        total: 0
    })

    function searchProjects() {
        setLoading(true)
        projectApi().searchProjects(searchOptions).then((response) => {
            setProjects(response.data)
        }).finally(() => setLoading(false))
    }

    React.useEffect(() => {
        (() => {
            searchProjects()
        })
    })

    return (
        <div>
            <Breadcrumb pageName="Projets" />

            <div className="flex justify-between">
                <InputText name="title" placeholder="Reachercher..."
                    value={searchOptions.title}
                    onChange={(e) => setSearchOptions({ ...searchOptions, title: e.target.value })}
                />
                <div className="flex gap-4">
                    <Button onClick={searchProjects} color="ghost">
                        <Loader2 size={20} className={loading ? "animate-spin" : ""} />
                    </Button>
                    <Button to="/projects/create">
                        Ajouter un projet
                    </Button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    projects.map((project) => (
                        <div key={project.id} className="max-w-lg p-4 shadow-md">
                            <div className="flex justify-between pb-4 border-bottom">
                                <div className="flex items-center">
                                    <a rel="noopener noreferrer" href="#" className="mb-0 capitalize">Photography</a>
                                </div>
                                <a rel="noopener noreferrer" href="#">See All</a>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <a rel="noopener noreferrer" href="#" className="block">
                                        <h3 className="text-xl font-semibold">Facere ipsa nulla corrupti praesentium pariatur architecto</h3>
                                    </a>
                                    <p className="leading-snug">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, excepturi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, excepturi.</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
