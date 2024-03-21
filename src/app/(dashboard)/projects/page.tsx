"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import useModalStore from "@/stores/useModalStore";

import { ColumnDef } from "@tanstack/react-table"
export default function Project() {
    const { showModal } = useModalStore();

    type Payment = {
        id: string
        amount: number
        status: "pending" | "processing" | "success" | "failed"
        email: string
    }

    const payments: Payment[] = [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
    ]

    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "status",
            header: "Status",
            enableColumnFilter: true,
            enableMultiSort: true,
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "amount",
            header: "Amount",
        },
    ]

    return (
        <div>
            <Breadcrumb pageName="Projets" />
            <div>
                <Button variant="outline" onClick={() => showModal(
                    {
                        title: 'Lorem ipsum dolor sit amet',
                        description: 'Lorem ipsum dolor sit amet',
                        acceptText: 'Accepter',
                        cancelText: 'Annuler',
                    }
                )}>Open Modal</Button>
            </div>
            <div className="mt-4">
                <DataTable columns={columns} data={payments} />
            </div>
        </div>
    );
}
