export default function CardLoad() {
    return (
        <div className="max-w-lg p-4 shadow-md animate-pulse">
            <div className="flex justify-between pb-4 border-bottom space-x-2">
                <span className="flex items-center bg-slate-300 rounded w-full h-4" />
                <span className="w-full h-4 bg-slate-300 rounded" />
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="block space-y-1">
                        <div className="text-xl font-semibold w-full h-4 bg-slate-300 rounded" />
                        <div className="text-xl font-semibold w-full h-4 bg-slate-300 rounded" />
                        <div className="text-xl font-semibold w-full h-4 bg-slate-300 rounded" />
                    </div>
                    <div className="w-full h-3 bg-slate-300 rounded" />
                </div>
            </div>
        </div>
    )
}