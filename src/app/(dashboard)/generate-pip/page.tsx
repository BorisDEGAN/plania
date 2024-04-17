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
import { CardPip } from "@/components/Card/CardPip";
import CardLoad from "@/components/Card/CardLoad";
import Pagination from "@/components/pagination/Pagination";

export default function Project() {

    const router = useRouter()

    const { showModal } = useModalStore()

    const [projects, setProjects] = React.useState<IProject[]>([])

    const [loading, setLoading] = React.useState(false)

    const [searchOptions, setSearchOptions] = React.useState({
        title: "",
        per_page: 9,
        page: 1,
        total: 0,
        last_page: 0
    })

    function searchProjects(page?: number) {
        setLoading(true)
        setSearchOptions({ ...searchOptions, page: page ? page : 1 })
        searchOptions.page = page ? page : 1
        projectApi().searchProjects(searchOptions).then((response) => {
            setProjects(response.data)
            setSearchOptions({
                ...searchOptions,
                total: response.meta.total,
                last_page: response.meta.last_page
            })
        }).finally(() => setLoading(false))
    }

    return (
        <div>
            <Breadcrumb pageName="Projets" />

            <div className="flex justify-between">
                <InputText name="title" placeholder="Rechercher..."
                    value={searchOptions.title}
                    onChange={(e) => setSearchOptions({ ...searchOptions, title: e.target.value })}
                />
                <div className="flex gap-4">
                    <Button onClick={() => searchProjects()} color="ghost">
                        <Loader2 size={20} className={loading ? "animate-spin" : ""} />
                    </Button>
                    <Button to="/projects/create">
                        Ajouter un projet
                    </Button>
                </div>
            </div>

            <div>
                <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        loading
                            ? [1, 2, 3, 4, 5, 6].map((item) => <CardLoad key={item} />)
                            : projects.map((project) => <CardPip key={project.id} project={project} />)
                    }
                </div>
                <div className="flex justify-center">
                    <Pagination currentPage={searchOptions.page} total={searchOptions.total} lastPage={searchOptions.last_page} onPageChange={searchProjects} />
                </div>
            </div>
        </div>
    );
}
