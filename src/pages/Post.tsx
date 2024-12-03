import PostPageClient from "@/components/blog/PostPageClient";
import useGetBlogByID from "@/hooks/useGetBlogByID";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams<{ id: string }>();

  const { post, error, isLoading } = useGetBlogByID(id as string);

  return (
    <>
      {post && (
        <Helmet>
          <title>{post?.blog?.title} - MLOGS</title>
          <meta
            name="description"
            content={post?.blog?.headline || "A detailed blog post"}
          />
          <meta
            name="keywords"
            content={post?.tags?.join(", ") || "blog, post"}
          />
          <meta property="og:title" content={post.title} />
          <meta
            property="og:description"
            content={post?.blog?.content || "A detailed blog post"}
          />
          <meta
            property="og:url"
            content={`https://mlogs.mayanktiwari.tech/posts/${id}`}
          />
          <link rel="canonical" href={`/post/${id}`} />
        </Helmet>
      )}
      <PostPageClient post={post} error={error} isLoading={isLoading} />
    </>
  );
};

export default Post;
