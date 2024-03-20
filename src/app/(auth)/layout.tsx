"use client";

import { SigninImage, SignupImage } from "@/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname = usePathname()

    function AuthImage() {
        switch (pathname) {
            case '/signup':
                return SignupImage
            case '/signin':
                return SigninImage
        }
    }

    return (
        <div className="size-full min-h-screen flex">
            <div className="hidden md:w-1/2 md:flex justify-center items-center bg-slate-100">
                <Image src={AuthImage()} alt="Logo" width={300} height={900} />
            </div>
            <div className="w-full p-4 md:w-1/2 flex justify-center items-center">
                <div className="space-y-3 w-full max-w-lg">
                    <div className="w-full flex justify-center">
                        <Image src="/logo.svg" alt="Logo" width={42} height={42} />
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
