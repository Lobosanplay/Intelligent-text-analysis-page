import UsageChart from "./components/dashboard/UsageChart";
import RecentFilesList from "./components/dashboard/RecentFilesList";
import StatsCards from "./components/dashboard/StatsCard";

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-neutral-400 mt-1">
          Summary of your uploaded files and activity.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UsageChart />
        </div>

        <div className="lg:col-span-1">
          <RecentFilesList />
        </div>
      </div>
    </div>
  );
}
