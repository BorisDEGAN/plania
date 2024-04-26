"use client";

import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputText from "@/components/Form/InputText";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { Ellipsis, EyeIcon, Loader2, LucideArrowUpCircle } from "lucide-react";
import { PROJECT_STATE } from "@/shared/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import CardLoad from "@/components/Card/CardLoad";
import { CardPip } from "@/components/Card/CardPip";
import { EmptyImage } from "@/assets";
import Image from "next/image";
import Pagination from "@/components/pagination/Pagination";

export default function Project() {

    const router = useRouter()

    const [projects, setProjects] = React.useState<IProject[]>([])

    const [loading, setLoading] = React.useState(false)

    const [searchOptions, setSearchOptions] = React.useState({
        title: "",
        per_page: 9,
        page: 1,
        total: 0,
        last_page: 0
    })

    function resolveStatus(status: string): { variant: "default" | "destructive" | "outline" | "secondary" | "warning" | "success" | "danger" | null | undefined, text: string } {
        switch (status) {
            case PROJECT_STATE.PENDING_STATE:
                return { variant: 'warning', text: 'En attente' }
            case PROJECT_STATE.STARTED_STATE:
                return { variant: 'success', text: 'Accepté' }
            case PROJECT_STATE.CANCELED_STATE:
                return { variant: 'danger', text: 'Annulé' }
            case PROJECT_STATE.FINISHED_STATE:
                return { variant: 'secondary', text: 'Terminé' }
            default:
                return { variant: 'outline', text: 'En attente' }
        }
    }

    function MenuOption(project: IProject) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-2">
                    <DropdownMenuItem onClick={() => { router.push(`/projects/${project.id}`) }} className="outline-0 w-full flex justify-start">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <EyeIcon className="text-blue-500" size={18} />
                            <span>Afficher</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { router.push(`/projects/update/${project.id}`) }} className="outline-0 w-full flex justify-start">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <LucideArrowUpCircle className="text-yellow-500" size={18} />
                            <span>Actualiser</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    function searchProjects(page?: number) {
        setLoading(true)
        setSearchOptions({ ...searchOptions, page: page ? page : 1 })
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
                    onKeyDown={(e) => { if (e.key === "Enter") { searchProjects() } }}
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
                            : projects.map((project) => <CardPip key={project.id} project={project} menuOptions={MenuOption(project)} />)
                    }
                </div>
                {
                    projects.length === 0 && !loading &&
                    <div className="flex justify-center">
                        <div>
                            <Image src={EmptyImage} alt="empty" width={500} height={500} />
                            <p className="text-center mt-4 font-semibold">Aucun PiP généré</p>
                        </div>
                    </div>
                }
                {
                    projects.length > 9 &&
                    <div className="flex justify-center">
                        <Pagination currentPage={searchOptions.page} total={searchOptions.total} lastPage={searchOptions.last_page} onPageChange={searchProjects} />
                    </div>
                }
            </div>
        </div>
    );
}
