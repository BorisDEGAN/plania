import React from "react";
import Image from "next/image";

function Loader({ width = 500, height = 500 }: { width?: number, height?: number }): JSX.Element {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Image
                src={"/logo.svg"}
                width={width}
                height={height}
                alt="Loader images"
                className="animate-pulse"
            />
        </div>
    );
}

export default Loader;
