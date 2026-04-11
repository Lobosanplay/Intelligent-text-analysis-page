import { useUsageStats } from "../../../../shared/services/usage_stats/usage_stats.queries";
import { useAuth } from "../../../../shared/hooks/useAuth";

export default function StatsCards() {
  const { user } = useAuth();
  const { data, isLoading } = useUsageStats(user?.id || "");

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
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 relative overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-neutral-700/40 to-transparent" />

              <div className="space-y-2 relative">
                <div className="h-3 w-20 bg-neutral-700 rounded" />
                <div className="h-6 w-16 bg-neutral-600 rounded" />
              </div>
            </div>
          ))
        : stats.map((stat) => (
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
