import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4">
      <div className="text-center space-y-8">
        <div className="text-9xl font-extrabold text-primary">404</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="text-muted-foreground max-w-prose mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or never existed.
        </p>
        <div>
          <Button asChild size="lg">
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
