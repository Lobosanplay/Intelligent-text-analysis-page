import { Send, File } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../shared/hooks/useAuth";
import type { CreateMessage } from "../../../shared/services/chat/chatService";
import { chatInputSchema, type chatInputType } from "../schemas/chatSchema";
import { useState } from "react";

type Props = {
  onSend: (date: CreateMessage) => void;
};

export default function ChatInput({ onSend }: Props) {
  const { user } = useAuth();

  const [filePreview, setFilePreview] = useState<File | null>(null);

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<chatInputType>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFilePreview(selected);

    setValue("file", selected, { shouldValidate: true });
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    reset();
  };

  const onSubmit: SubmitHandler<chatInputType> = async (data) => {
    if (!data) return;

    onSend({ ...data, user_id: user?.id || "" });
    setFilePreview(null);
    reset();
  };

  return (
    <div className="flex flex-col backdrop-blur-md">
      <div className="fixed w-full max-w-3xl left-1/2 -translate-1/2 bottom-0 px-4 lg:px-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full bg-neutral-900 border border-neutral-700 rounded-2xl p-2 shadow-lg">
            {filePreview && (
              <div className="flex items-center justify-between px-3 py-2 mb-2 bg-neutral-800/50 rounded-xl">
                <div className="flex items-center gap-2 overflow-hidden">
                  <File size={16} className="text-neutral-400" />
                  <span className="text-sm truncate">{filePreview.name}</span>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-400 text-sm"
                >
                  ✕
                </button>
              </div>
            )}

            {!filePreview ? (
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full bg-transparent text-sm px-4 py-2"
              />
            ) : (
              <div className="relative">
                <input
                  type="text"
                  {...register("content")}
                  placeholder="Escribe algo..."
                  className="w-full bg-transparent outline-none px-4 pr-12 py-2 text-sm"
                />

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
