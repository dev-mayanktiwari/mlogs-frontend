import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useGetComments from "@/hooks/useGetComments";
import usePostComment from "@/hooks/usePostComment";
import useUpdateComment from "@/hooks/useUpdateComment";
import useDeleteComment from "@/hooks/useDeleteComment";
import useUserStore from "@/store/userStore";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();

  const {
    comments: commentsData,
    isLoading: isLoadingComments,
    error: commentsError,
    mutate,
  } = useGetComments(postId);

  const { postComment, loading: isPostingComment } = usePostComment();
  const { updateComment, loading: isUpdatingComment } = useUpdateComment();
  const { deleteComment, loading: isDeletingComment } = useDeleteComment();

  const comments = useMemo(() => {
    if (!commentsData?.comments) return [];

    return [...commentsData.comments].sort((a, b) => {
      // Show user's comments first
      if (a.userId === user?.userId && b.userId !== user?.userId) return -1;
      if (b.userId === user?.userId && a.userId !== user?.userId) return 1;
      // Then sort by newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [commentsData, user]);

  const userHasCommented = useMemo(() => {
    return comments.some((comment) => comment.userId === user?.userId);
  }, [comments, user]);

  const handlePostComment = async (text: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to add comments.",
        variant: "destructive",
      });
      return;
    }

    if (userHasCommented) {
      toast({
        title: "Notice",
        description: "You have already commented on this post.",
        variant: "default",
      });
      return;
    }

    const postedComment = await postComment(postId, text);
    if (postedComment) {
      mutate();
    }
  };

  const handleEditComment = async (commentId: string, text: string) => {
    const updated = await updateComment(commentId, text);
    if (updated) {
      mutate();
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
    mutate();
  };

  if (isLoadingComments) {
    return (
      <Card className="mt-6">
        <CardContent className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (commentsError) {
    return (
      <Card className="mt-6">
        <CardContent className="py-8">
          <p className="text-center text-red-500">
            Failed to load comments. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && (
          <>
            {userHasCommented ? (
              <Alert className="flex items-center">
                <MessageCircle className="h-4 w-4" />
                <AlertDescription>
                  You have already commented on this post. You can edit or
                  delete your existing comment.
                </AlertDescription>
              </Alert>
            ) : (
              <CommentForm
                onSubmit={handlePostComment}
                isLoading={isPostingComment}
              />
            )}
          </>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              currentUserId={user?.userId}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              isEditing={isUpdatingComment}
              isDeleting={isDeletingComment}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
