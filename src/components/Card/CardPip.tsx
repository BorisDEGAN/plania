import useText from "@/shared/helpers/useText";
import { IProject, IProjectPlan } from "@/shared/models";

export function CardPip({ project, className, menuOptions }: { project: IProject | IProjectPlan, className?: string, menuOptions?: JSX.Element }) {

    const { truncateText } = useText()

    return (
        <div className={`max-w-lg p-4 rounded shadow hover:shadow-meta-5 cursor-pointer duration-300 ${className}`}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <a rel="noopener noreferrer" href="#" className="block">
                        <h3 className="text-xl font-semibold">{truncateText(project.title, 50)}</h3>
                    </a>
                    <p className="leading-snug text-justify text-pretty">
                        {truncateText(project.overview, 200)}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <span>
                        {project.created_at}
                    </span>
                    {menuOptions}
                </div>
            </div>
        </div>
    )
}
