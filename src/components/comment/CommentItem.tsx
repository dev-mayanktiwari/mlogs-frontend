import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { CommentForm } from "./CommentForm";
import type { Comment } from "@/lib/types";

interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onEdit: (commentId: string, text: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  isEditing: boolean;
  isDeleting: boolean;
}

export function CommentItem({
  comment,
  currentUserId,
  onEdit,
  onDelete,
  isEditing,
  isDeleting,
}: CommentItemProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const isOwner = currentUserId === comment.userId;

  const handleEdit = async (text: string) => {
    await onEdit(comment.commentId, text);
    setIsEditMode(false);
  };

  return (
    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
      <Avatar className="w-10 h-10 shrink-0">
        <AvatarImage src={comment.user?.name[0] || "A"} />
        <AvatarFallback>{comment.user?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium">
            {comment.user?.name || "Anonymous"}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        {isEditMode ? (
          <CommentForm
            onSubmit={handleEdit}
            initialValue={comment.text}
            isLoading={isEditing}
            buttonText="Save Changes"
            onCancel={() => setIsEditMode(false)}
          />
        ) : (
          <p className="text-sm break-words">{comment.text}</p>
        )}

        {isOwner && !isEditMode && (
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditMode(true)}
              disabled={isDeleting}
            >
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(comment.commentId)}
              disabled={isDeleting || isEditing}
            >
              <Trash className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
