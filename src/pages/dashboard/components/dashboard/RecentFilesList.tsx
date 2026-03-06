// temporally dashboard RecentFilesList (unused)
import { useEffect, useState } from "react";
import { getRecentFiles } from "../../../../shared/services/dashboard/dashboardService";

interface FileItem {
  id: string;
  name: string;
  created_at: string;
  type: string;
}

export default function RecentFilesList() {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getRecentFiles();
      setFiles(data);
    }
    load();
  }, []);

  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
      <h2 className="text-xl font-semibold mb-6">Recent Files</h2>

      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex justify-between items-center border-b border-neutral-800 pb-3"
          >
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-neutral-400">
                {file.type} • {new Date(file.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
