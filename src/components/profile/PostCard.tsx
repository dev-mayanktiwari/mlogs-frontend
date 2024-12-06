import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: {
    postId: number;
    title: string;
    content: string;
    headline: string;
    createdAt: string;
    updatedAt: string;
    authorName: string;
  };
  likes?: number;
  comments?: number;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  likes = 0,
  comments = 0,
}) => (
  <Link to={`/post/${post.postId}`}>
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.headline}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>By {post.authorName}</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {comments}
          </span>
        </div>
      </CardFooter>
    </Card>
  </Link>
);
