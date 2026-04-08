import { useUsageStats } from "../../../../shared/services/usage_stats/usage_stats.queries";
import { useAuth } from "../../../../shared/hooks/useAuth";

export default function StatsCards() {
  const { user } = useAuth();
  const { data, isLoading } = useUsageStats(user?.id || "");
  if (isLoading) return <div>Loading stats...</div>;

  const stats = [
    {
      label: "Documents",
      value: data?.documents_uploaded ?? 0,
    },
    {
      label: "Audio Minutes",
      value: data?.minutes_audio_processed ?? 0,
    },
    {
      label: "Storage Used (MB)",
      value: Number(data?.monthly_storage_used_mb ?? 0).toFixed(1),
    },
    {
      label: "Total Storage (MB)",
      value: Number(data?.total_storage_mb ?? 0).toFixed(1),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-4"
        >
          <p className="text-sm text-neutral-400">{stat.label}</p>
          <p className="text-2xl font-semibold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
