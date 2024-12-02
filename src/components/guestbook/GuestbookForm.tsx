import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import usePostGuestbook from "@/hooks/usePostGuestbook";

interface GuestbookFormProps {
  onSuccess: () => void;
}

export const GuestbookForm: React.FC<GuestbookFormProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState("");
  const { postMessage, loading } = usePostGuestbook();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const result = await postMessage(message);
      if (result) {
        setMessage("");
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Share your thoughts..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={loading || !message.trim()}>
        {loading ? "Posting..." : "Post Message"}
      </Button>
    </form>
  );
};
