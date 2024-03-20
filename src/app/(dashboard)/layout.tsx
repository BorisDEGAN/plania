"use client";

import React, { useState, Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Fallback from "@/components/suspense-fallback";
import isAuthenticated from "@/hoc/isAuthenticated";

function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

const Root = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<Fallback />}>
        <RootLayout>{children}</RootLayout>
    </Suspense>
);

export default isAuthenticated(Root)