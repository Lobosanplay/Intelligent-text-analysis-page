import { Send } from "lucide-react";
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
  };

  return (
    <div className="p-4 border-t border-neutral-800">
      <div className="relative flex items-center">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {filePreview && (
            <div className="flex w-40 h-40 items-center justify-between bg-neutral-800 mb-4 p-2 rounded-xl">
              <span className="text-sm">{filePreview.name}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-400"
              >
                X
              </button>
            </div>
          )}
          {!filePreview ? (
            <>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full bg-neutral-900 border border-neutral-700 rounded px-4 py-2"
              />

              {errors.file && (
                <span className="text-red-500 text-sm">
                  {errors.file.message}
                </span>
              )}
            </>
          ) : (
            <div className="relative">
              <input
                type="text"
                {...register("content")}
                placeholder="Escribe algo sobre el archivo..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-full px-4 pr-12 py-2"
              />

              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Send size={16} />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
