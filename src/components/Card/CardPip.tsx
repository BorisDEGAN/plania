import { IProject } from "@/shared/models";

export function CardPip({ project, className }: { project: IProject, className?: string }) {
    return (
        <div className="max-w-lg p-4 shadow-md">
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
    )
}
