
"use client"

import Loader from "./Loader"

export default function Fallback(){
    return (
        <div className="flex items-center h-[calc(100vh-10rem)] justify-center">
            <Loader width={150} height={150} />
        </div>
    )
}
    