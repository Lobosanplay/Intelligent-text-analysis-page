import { useRecentDocuments } from "../../../../shared/services/documents/documents.queries";
import { useAuth } from "../../../../shared/hooks/useAuth";

export default function RecentFilesList() {
  const { user } = useAuth();
  const {
    data: files = [],
    isLoading,
    error,
  } = useRecentDocuments(user?.id || "", 5);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading files</div>;

  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 h-full">
      <h2 className="text-lg font-semibold mb-4">Recent Files</h2>

      <div className="space-y-3">
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
