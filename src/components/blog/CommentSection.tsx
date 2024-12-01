import { useState, useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Send, User, Trash, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useGetComments from "@/hooks/useGetComments";
import usePostComment from "@/hooks/usePostComment";
import useUserStore from "@/store/userStore";
import { Comment } from "@/lib/types";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const user = useUserStore((state) => state.user);
  const {
    comments: commentsData,
    isLoading: isLoadingComments,
    error: commentsError,
    mutate,
  } = useGetComments(postId);
  const { postComment, loading: isPostingComment } = usePostComment();
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const { toast } = useToast();

  const comments = useMemo(() => {
    if (!commentsData || !Array.isArray(commentsData.comments)) return [];
    return commentsData.comments.sort((a, b) => {
      if (a.userId === user?.userId) return -1;
      if (b.userId === user?.userId) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [commentsData, user]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) {
        toast({
          title: "Error",
          description: "Please login to add comments.",
          variant: "destructive",
        });
        return;
      }
      if (!newComment.trim()) return;

      const postedComment = await postComment(postId, newComment);
      if (postedComment) {
        setNewComment("");
        mutate();
      }
    },
    [user, newComment, postId, postComment, toast, mutate]
  );

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.commentId);
    setEditedCommentText(comment.text);
  };

  const handleSaveEdit = async (commentId: string) => {
    // Implement the edit functionality here
    // For now, we'll just update the comment locally
    const updatedComments = comments.map((c) =>
      c.commentId === commentId ? { ...c, text: editedCommentText } : c
    );
    mutate({ ...commentsData, comments: updatedComments }, false);
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  const handleDelete = async (commentId: string) => {
    // Implement the delete functionality here
    // For now, we'll just remove the comment locally
    const updatedComments = comments.filter((c) => c.commentId !== commentId);
    mutate({ ...commentsData, comments: updatedComments }, false);
  };

  return (
    <Card id="comments" className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPostingComment || !newComment.trim()}
              >
                {isPostingComment ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {isLoadingComments ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : commentsError ? (
          <p className="text-center text-red-500">
            Failed to load comments. Please try again.
          </p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.commentId} className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.user.name[0]} />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {comment.user.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  {editingCommentId === comment.commentId ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        className="min-h-[60px] resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingCommentId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(comment.commentId)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm break-words">{comment.text}</p>
                  )}
                  {user &&
                    user.userId === comment.userId &&
                    editingCommentId !== comment.commentId && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(comment)}
                        >
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(comment.commentId)}
                        >
                          <Trash className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
