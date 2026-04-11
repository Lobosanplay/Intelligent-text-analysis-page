import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUploadStats } from "../../../../shared/services/documents/documents.queries";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { Link } from "react-router-dom";

export default function UsageChart() {
  const { user } = useAuth();
  const { data = [], isLoading, error } = useUploadStats(user?.id || "", 7);

  if (isLoading) {
    return (
      <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 h-full flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Upload Activity</h2>

        <div className="mt-auto w-full h-75 relative overflow-hidden rounded-md bg-neutral-800">
          <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-neutral-700/40 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-neutral-500 border-t-white rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-auto w-full h-75 flex items-center justify-center">
        <div>Error loading chart</div>
      </div>
    );
  }

  if (!isLoading && !error && data.length === 0) {
    return (
      <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 h-full flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Upload Activity</h2>

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <p className="text-neutral-400 text-sm">
            You don’t have any uploaded files yet.
          </p>

          <Link
            to="/dashboard/chat/new"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition"
          >
            Upload your first file
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Upload Activity</h2>
      <div className="mt-auto w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart responsive data={data}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis allowDecimals={false} stroke="#888" />
            <Tooltip />
            <Bar
              type="monotone"
              dataKey="count"
              stroke="#4ade80"
              strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
