import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
  initialValue?: string;
  isLoading?: boolean;
  buttonText?: string;
  onCancel?: () => void;
}

export function CommentForm({
  onSubmit,
  initialValue = "",
  isLoading = false,
  buttonText = "Post Comment",
  onCancel,
}: CommentFormProps) {
  const [text, setText] = useState(initialValue);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text);
    if (!onCancel) setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[100px] resize-none"
        disabled={isLoading}
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading || !text.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {buttonText}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
