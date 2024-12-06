import BlogList from "@/components/blog/PostsList";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MLOGS - Explore Inspiring Blogs & Ideas</title>
        <meta
          name="description"
          content="Dive into MLOGS: A blog platform filled with inspiring stories, random thoughts, and creative ideas by a passionate engineer. Explore now!"
        />
        <meta
          name="keywords"
          content="blogs, ideas, stories, engineering thoughts, MLOGS"
        />
        <meta
          property="og:title"
          content="MLOGS - Explore Inspiring Blogs & Ideas"
        />
        <meta
          property="og:description"
          content="Welcome to MLOGS! Discover inspiring blogs and stories shared by a community of passionate creators. Join the journey today."
        />
        <meta property="og:url" content="https://mlogs.mayanktiwari.tech" />
        <link rel="canonical" href="/" />
      </Helmet>
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-background to-muted/50 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Welcome to MLOGS
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
              Random thoughts, stories, and ideas of a random engineer.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>
            <BlogList />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
