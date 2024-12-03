import { useState, useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share2, User } from "lucide-react";
import useUserStore from "@/store/userStore";
import { Like, PostType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import useLikeBlog from "@/hooks/useLikeBlog";
import useUnlikeBlog from "@/hooks/useUnlikeBlog";

type PostContentProps = {
  post: PostType;
};

export default function PostContent({ post }: PostContentProps) {
  const user = useUserStore((state) => state.user);
  const [likes, setLikes] = useState<Like[]>(post.likes);
  const { toast } = useToast();
  const { likeBlog, loading: isLiking } = useLikeBlog();
  const { unlikeBlog, loading: isUnliking } = useUnlikeBlog();

  const isLiked = useMemo(() => {
    return likes.some(
      (like) => like.userId === user?.userId && like.postId === post.postId
    );
  }, [likes, user, post.postId]);

  const handleLikeToggle = useCallback(async () => {
    if (!user) {
      toast({
        title: "Error",
        duration: 5000,
        description: "Please login to like posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isLiked) {
        await unlikeBlog(post.postId);
        setLikes((prev) => prev.filter((like) => like.userId !== user.userId));
      } else {
        await likeBlog(post.postId);
        setLikes((prev) => [
          ...prev,
          {
            userId: user.userId,
            postId: post.postId,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      toast({
        title: "Error",
        duration: 5000,
        description: "Failed to update like status. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, isLiked, likeBlog, unlikeBlog, post.postId, toast]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Success",
      duration: 5000,
      description: "Link copied to clipboard!",
      variant: "default",
    });
  }, [toast]);

  return (
    <Card className="mb-8 overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={"/profile.jpg"} alt={post.authorName} />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.authorName}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">{post.title}</h1>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="prose dark:prose-invert max-w-none">{post.content}</div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleLikeToggle}
              disabled={isLiking || isUnliking}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked ? "fill-destructive stroke-destructive" : ""
                }`}
              />
              <span>{likes.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() =>
                document
                  .getElementById("comments")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments?.length || 0}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
