import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GuestbookMessage } from "@/components/guestbook/GuestbookMessage";
import { GuestbookForm } from "@/components/guestbook/GuestbookForm";
import useGetGuestbook from "@/hooks/useGetGuestbook";
import useUserStore from "@/store/userStore";
import { Helmet } from "react-helmet-async";

export const Guestbook = () => {
  const { guestbook, error, isLoading, mutate } = useGetGuestbook();
  const user = useUserStore((state) => state.user);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">
          Failed to load guestbook messages. Please try again.
        </p>
        <Button onClick={() => mutate()}>Retry</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Guestbook - Share Your Thoughts</title>
        <meta
          name="description"
          content="Explore heartfelt messages and stories from our visitors. Share your thoughts in our guestbook and join the conversation!"
        />
        <meta
          name="keywords"
          content="guestbook, messages, visitor thoughts, share ideas, community stories"
        />
        <meta property="og:title" content="Guestbook - Share Your Thoughts" />
        <meta
          property="og:description"
          content="Read and share meaningful messages in our guestbook. Connect with others and leave your mark today!"
        />
        <meta
          property="og:url"
          content="https://mlogs.mayanktiwari.tech/guestbook"
        />
        <link rel="canonical" href="/guestbook" />
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Guestbook</h1>

        {user ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Leave a Message</h2>
            <GuestbookForm onSuccess={() => mutate()} />
          </div>
        ) : (
          <div className="text-center mb-8">
            <p className="mb-4">Please log in to leave a message.</p>
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          {guestbook && guestbook.messages.length > 0 ? (
            guestbook.messages.map((msg) => (
              <GuestbookMessage
                key={msg.guestbookId}
                name={msg.user.name}
                message={msg.guestbook.message}
                createdAt={msg.guestbook.createdAt}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No messages yet. Be the first to write something!
            </p>
          )}
        </div>
      </div>
    </>
  );
};
