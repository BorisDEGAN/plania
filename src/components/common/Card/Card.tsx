export function Card({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4 p-2 border border-slate-300 rounded">
            <div className="flex items-center justify-between border-b border-slate-300">
                <h4 className="font-semibold my-2">{title}</h4>
            </div>
            {children}
        </div>
    );
}