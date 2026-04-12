import { useRecentDocuments } from "../../../../shared/services/documents/documents.queries";
import { useAuth } from "../../../../shared/hooks/useAuth";

export default function RecentFilesList() {
  const { user } = useAuth();
  const {
    data: files = [],
    isLoading,
    error,
  } = useRecentDocuments(user?.id || "", 5);

  if (isLoading) {
    return (
      <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 h-full flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Recent Files</h2>

        <div className="flex-1 relative overflow-hidden rounded-md bg-neutral-800">
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
      <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 h-full flex items-center justify-center">
        <p>Error loading files</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Recent Files</h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-75">
        {files.length === 0 && (
          <p className="text-sm text-neutral-400">No files uploaded yet</p>
        )}

        {files.map((file) => (
          <div
            key={file.id}
            className="flex justify-between items-center border-b border-neutral-800 pb-2"
          >
            <div className="truncate">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-xs text-neutral-400">
                {file.type} • {new Date(file.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
