"use client";

import DashboardCount from "@/components/dashboard/count";
import DashboardTopKeywords from "@/components/dashboard/topKeyword";
import DashboardCommonKeywords from "@/components/dashboard/commonKeywords";
import DashboardFacultyCrud from "@/components/dashboard/facultyCrud";
import DashboardUniversityCrud from "@/components/dashboard/universityCrud";

export default function Home() {
  return (
    <main>
      <div className="container mt-4 mb-5">
        <h1 className="text-center">
          Mustafa Sadiq CS411 - Exploring academic world
        </h1>

        <div className="row row-cols-1 row-cols-md-2 mt-4 g-4">
          <DashboardCount />
          <DashboardTopKeywords />
          <DashboardCommonKeywords />
          <DashboardFacultyCrud />
          <DashboardUniversityCrud />
        </div>
      </div>
    </main>
  );
}
