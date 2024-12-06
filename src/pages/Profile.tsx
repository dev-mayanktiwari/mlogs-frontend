import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PostCard } from "@/components/profile/PostCard";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, Loader2 } from "lucide-react";
import useGetUser from "@/hooks/useGetUserDetails";
import { Helmet } from "react-helmet-async";

export const Profile = () => {
  const { user, error, isLoading } = useGetUser();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load user profile. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!user) return null;

  const {
    userId,
    email,
    name,
    username,
    lastLoginAt,
    savedPosts,
    likedPosts,
    comments,
    guestbook,
    passwordRecovery,
  } = user.user;

  return (
    <>
      {user && (
        <Helmet>
          <title>{name} - Profile | MLOGS</title>
          <meta
            name="description"
            content={`Profile of ${name} (@${username})`}
          />
          <meta
            name="keywords"
            content={`profile, ${name}, ${username}, MLOGS, user`}
          />
          <meta property="og:title" content={`${name} - Profile | MLOGS`} />
          <meta
            property="og:description"
            content={`Visit ${name}'s profile on MLOGS to view saved posts, liked posts, and more.`}
          />
          <meta
            property="og:url"
            content={`https://mlogs.mayanktiwari.tech/profile/${username}`}
          />
          <meta property="og:image" content="default-profile-image-url" />
          <link rel="canonical" href={`/profile/${username}`} />
        </Helmet>
      )}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`tt`} alt={name} />
                <AvatarFallback className="object-fill">
                  {name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{name}</CardTitle>
                <p className="text-muted-foreground">@{username}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="font-semibold">Email:</p>
                <p className="text-muted-foreground">{email}</p>
              </div>
              <div>
                <p className="font-semibold">User ID:</p>
                <p className="text-muted-foreground">{userId}</p>
              </div>
              <div>
                <p className="font-semibold">Last Login:</p>
                <p className="text-muted-foreground">
                  {formatDistanceToNow(new Date(lastLoginAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div>
                <p className="font-semibold">Last Password Reset:</p>
                <p className="text-muted-foreground">
                  {passwordRecovery?.lastResetAt
                    ? formatDistanceToNow(
                        new Date(passwordRecovery.lastResetAt),
                        { addSuffix: true }
                      )
                    : "Never"}
                </p>
              </div>
            </div>
            {isChangingPassword ? (
              <ChangePasswordForm
                onCancel={() => setIsChangingPassword(false)}
              />
            ) : (
              <Button
                className="mt-4"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </Button>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="saved" className="space-y-4">
          <TabsList>
            <TabsTrigger value="saved">Saved Posts</TabsTrigger>
            <TabsTrigger value="liked">Liked Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="guestbook">Guestbook</TabsTrigger>
          </TabsList>
          <TabsContent value="saved">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedPosts.map((saved) => (
                <PostCard
                  key={saved.postId}
                  post={saved.post}
                  likes={saved.post?.likes?.length}
                  comments={saved.post?.comments?.length}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="liked">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              // @ts-expect-error: likedPosts is possibly null
              {likedPosts.map((liked) => (
                <PostCard
                  key={liked.postId}
                  post={liked.post}
                  likes={liked.post?.likes?.length}
                  comments={liked.post?.comments?.length}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="comments">
            <div className="space-y-4">


              // @ts-expect-error: comments is possibly null
              {comments.map((comment) => (
                <Card key={comment.commentId}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {comment.post.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p>{comment.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="guestbook">
            <div className="space-y-4">

              // @ts-expect-error: guestbook is possibly null
              {guestbook.map((entry) => (
                <Card key={entry.guestbookId}>
                  <CardContent className="pt-4">
                    <p>{entry.guestbook.message}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {formatDistanceToNow(
                        new Date(entry.guestbook.createdAt),
                        {
                          addSuffix: true,
                        }
                      )}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
