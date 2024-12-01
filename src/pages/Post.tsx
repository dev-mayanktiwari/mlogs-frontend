import PostPageClient from "@/components/blog/PostPageClient";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  return <PostPageClient postId={id as string} />;
};

export default Post;
