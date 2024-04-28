"use client";;
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputText from "@/components/Form/InputText";
import { Button } from "@/components/ui/button";
import { IProject, IProjectPlan } from "@/shared/models";
import { Ellipsis, EyeIcon, Loader2 } from "lucide-react"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { CardPip } from "@/components/Card/CardPip";
import CardLoad from "@/components/Card/CardLoad";
import Pagination from "@/components/pagination/Pagination";
import Image from "next/image";
import { EmptyImage } from "@/assets";
import projectPlanApi from "@/services/project-plan.service";
import { useRouter } from "next/navigation";

export default function Project() {

    const router = useRouter()

    const [projectPlans, setProjectPlans] = React.useState<IProjectPlan[]>([])

    const [loading, setLoading] = React.useState(false)

    const [searchOptions, setSearchOptions] = React.useState({
        title: "",
        per_page: 9,
        page: 1,
        total: 0,
        last_page: 0
    })

    function searchProjectPlans(page?: number) {
        setLoading(true)
        searchOptions.page = page ? page : 1
        projectPlanApi().searchProjectPlans(searchOptions).then((response) => {
            setProjectPlans(response.data)
            setSearchOptions({
                ...searchOptions,
                total: response.meta.total,
                last_page: response.meta.last_page
            })
        }).finally(() => setLoading(false))
    }

    function MenuOption(project: IProject) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-2">
                    <DropdownMenuItem onClick={() => { router.push(`/generate-pip/${project.id}`) }} className="outline-0 w-full flex justify-start">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <EyeIcon className="text-blue-500" size={18} />
                            <span>Afficher</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    React.useEffect(() => {
        (() => {
            searchProjectPlans()
        })()
    }, [])

    return (
        <div>
            <Breadcrumb pageName="Projets" />

            <div className="flex justify-between">
                <InputText name="title" placeholder="Rechercher..."
                    value={searchOptions.title}
                    onChange={(e) => setSearchOptions({ ...searchOptions, title: e.target.value })}
                    onKeyDown={(e) => { if (e.key === "Enter") { searchProjectPlans() } }}
                />
                <div className="flex gap-4">
                    <Button onClick={() => searchProjectPlans()} color="ghost">
                        <Loader2 size={20} className={loading ? "animate-spin" : ""} />
                    </Button>
                </div>
            </div>

            <div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        loading
                            ? [1, 2, 3, 4, 5, 6].map((item) => <CardLoad key={item} />)
                            : projectPlans.map((project) => <CardPip key={project.id} project={project} menuOptions={MenuOption(project)} />)
                    }
                </div>
                {
                    projectPlans.length === 0 && !loading &&
                    <div className="flex justify-center">
                        <div>
                            <Image src={EmptyImage} alt="empty" width={500} height={500} />
                                <p className="text-center mt-4 font-semibold">Aucun PiP trouvé</p>
                        </div>
                    </div>
                }
                {
                    searchOptions.total > searchOptions.per_page &&
                    <div className="flex justify-center">
                            <Pagination currentPage={searchOptions.page} total={searchOptions.total} lastPage={searchOptions.last_page} onPageChange={searchProjectPlans} />
                    </div>
                }
            </div>
        </div>
    );
}
