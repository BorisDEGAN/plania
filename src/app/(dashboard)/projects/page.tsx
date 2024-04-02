"use client";

import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataTable } from "@/components/common/Datatable";
import { Paginate } from "@/components/common/Paginate";
import InputText from "@/components/Form/InputText";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import useModalStore from "@/stores/useModalStore";
import { ColumnDef } from "@tanstack/react-table"
import { Edit2, Ellipsis, EyeIcon, Loader2, Menu } from "lucide-react";
import useText from "@/shared/helpers/useText";
import { Badge } from "@/components/ui/badge";
import { PROJECT_STATE } from "@/shared/types";
import { string } from "yup";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

export default function Project() {

    const { truncateText } = useText()

    const router = useRouter()

    function resolveStatus(status: string) {
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

    const columns: ColumnDef<IProject>[] = [
        {
            accessorKey: "title",
            header: "Titre",
            enableGrouping: true,
            size: 60,
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => truncateText(row.original.description as string, 100),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="flex items-center text-nowrap gap-1">
                    <Badge variant={resolveStatus(row.original.status as string).variant}>{resolveStatus(row.original.status as string).text}</Badge>
                </div>
            ),
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="space-y-2">
                        <DropdownMenuItem onClick={() => { router.push(`/projects/${row.original.id}`) }} className="outline-0 w-full flex justify-start">
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <EyeIcon className="text-blue-500" size={18} />
                                <span>Afficher</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { router.push(`/projects/edit/${row.original.id}`) }} className="outline-0 w-full flex justify-start">
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <Edit2 className="text-yellow-500" size={18} />
                                <span>Modifier</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="outline-0 w-full flex justify-start">
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <EyeIcon className="text-red" size={18} />
                                <span>Supprimer</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            ),
        },
    ]

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
        searchProjects()
    }, [])

    return (
        <div>
            <Breadcrumb pageName="Projets" />

            <div className="flex justify-between">
                <InputText name="title" placeholder="Reachercher..."
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

            <div className="mt-4">
                <DataTable columns={columns} data={projects} />
                <div>
                    <Paginate total={searchOptions.total} page={searchOptions.page} per_page={searchOptions.per_page} />
                </div>
            </div>
        </div>
    );
}
