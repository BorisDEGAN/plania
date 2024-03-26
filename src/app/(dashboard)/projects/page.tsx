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
import { Edit2, EyeIcon, Loader2 } from "lucide-react";

export default function Project() {

    const columns: ColumnDef<IProject>[] = [
        {
            accessorKey: "title",
            header: "Titre",
            enableGrouping: true,
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="capitalize text-nowrap rounded-full py-1 px-2 bg-yellow-500 text-white">En cours</div>
            ),
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button to={`/projects/${row.original.id}`} >
                        <EyeIcon size={15} />
                    </Button>
                    <Button to={`/projects/edit/${row.original.id}`}>
                        <Edit2 size={15} />
                    </Button>
                </div>
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
