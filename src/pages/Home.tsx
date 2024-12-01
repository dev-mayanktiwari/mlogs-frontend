import BlogList from "@/components/blogs/PostsList";

const Home = () => {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-background to-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Welcome to MLOGS
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
            Random thoughts, stories, and ideas of a random programmer.
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
  );
};

export default Home;
