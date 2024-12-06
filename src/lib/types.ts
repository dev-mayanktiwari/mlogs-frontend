export type User = {
  userId: string;
  username: string;
  email: string;
  name: string;
} | null;

export type Like = {
  userId: string;
  postId: string;
  createdAt: string;
};

export type Comment = {
  commentId: string;
  user: User;
  postId: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type SComment = {
  commentId: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type Saved = {
  userId: string;
  postId: string;
  createdAt: string;
};

export type PostType = {
  postId: string;
  title: string;
  content: string;
  headline: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  likes: Like[];
  comments: SComment[];
  savedByUsers: Saved[];
};

export interface Post {
  postId: number;
  title: string;
  headline: string;
  content: string;
  createdAt: string;
  likes: [];
  comments: [];
}
