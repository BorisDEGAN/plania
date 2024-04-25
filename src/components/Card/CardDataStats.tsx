import { Loader } from "lucide-react";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string | number;
  total: string | number;
  loading?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
  loading
}) => {
  return (
    <div className="rounded border border-stroke bg-white px-7.5 py-6 shadow-default flex justify-between">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
        {children}
      </div>
      {
        loading
          ? <Loader className="animate-spin text-primary" />
          : <div className="mt-4 flex items-end justify-between">
            <div className="flex items-baseline space-x-2">
              <h4 className="text-title-md font-bold text-black">
                {total}
              </h4>
              <span className="text-sm text-nowrap font-medium">{title}</span>
            </div>
          </div>
      }

    </div>
  );
};

export default CardDataStats;
