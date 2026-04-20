import {
  useRecentDocuments,
  useDeleteFile,
} from "../../../../shared/services/documents/documents.queries";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { Trash2, SquareArrowOutUpRight, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type {
  DocumentModalModel,
  RecentDocument,
} from "../../../../shared/models/documents/documents.model";
import { documentsService } from "../../../../shared/services/documents/documents.service";

export default function RecentFilesList() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<DocumentModalModel>();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: deleteFile, isPending } = useDeleteFile();

  const { user } = useAuth();
  const {
    data: files = [],
    isLoading,
    error,
  } = useRecentDocuments(user?.id || "", 5);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  const handleOpen = async (file: RecentDocument) => {
    const data = await documentsService.getDocumentFullData(file.id);
    if (data.conversation_id) {
      navigate(`/dashboard/chat/${data.conversation_id}`);
    } else {
      setModalData(data);
      setOpenModal(true);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteFile(id);
  };

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
            className="group flex justify-between items-center border-b border-neutral-800 pb-2"
          >
            <div className="truncate">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-xs text-neutral-400">
                {file.type} • {new Date(file.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleOpen(file)}
                className="p-1 hover:bg-neutral-800 rounded"
              >
                <SquareArrowOutUpRight />
              </button>
              <button
                onClick={() => handleDelete(file.id)}
                disabled={isPending}
                className="p-1 hover:bg-neutral-800 rounded text-red-400"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}

        {openModal && (
          <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
            <div
              ref={modalRef}
              className="relative bg-neutral-900 rounded-xl w-[95vw] sm:w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 mx-3"
            >
              <h2 className="text-lg font-semibold mb-4">
                {modalData?.document.original_filename}
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3 text-neutral-400 hover:text-white transition"
              >
                <XIcon />
              </button>

              {modalData?.analysis?.summary && (
                <>
                  <span className="font-semibold text-neutral-400">
                    Summary:
                  </span>
                  <p className="text-sm text-neutral-300 mb-4">
                    {modalData.analysis.summary}
                  </p>
                </>
              )}

              {modalData?.analysis?.sentiment && (
                <div className="text-xs text-neutral-400 mb-4">
                  <p>Sentiment: {modalData.analysis.sentiment.overall}</p>
                  <p>
                    Positive: {modalData.analysis.sentiment.positive_chunks} /{" "}
                    Negative: {modalData.analysis.sentiment.total_chunks}
                  </p>
                </div>
              )}

              {modalData?.analysis?.topics && (
                <div className="text-xs text-neutral-400 mb-4">
                  <p className="mb-1">Topics:</p>
                  <ul className="flex flex-wrap gap-x-2 gap-y-2 ">
                    {modalData.analysis.topics.flat().map((t, i) => (
                      <li
                        key={i}
                        className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded-md text-xs"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalData?.transcription?.transcript && (
                <pre className="text-xs text-neutral-400 max-h-60 overflow-auto">
                  {modalData.transcription.transcript}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
