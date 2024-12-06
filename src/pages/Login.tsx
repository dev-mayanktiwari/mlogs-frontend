import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "@/lib/api";
import { Login } from "@/components/auth/Login";
import useUserStore from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user } = await login(email, password);
      setUser(user);

      toast({
        title: "Success",
        duration: 5000,
        description: "You have successfully logged in.",
        variant: "default",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        duration: 5000,
        description:
          error.response?.data?.message || "Failed to login. Please try again later.",
        variant: "destructive",
      });
      throw error; // Re-throw the error to be handled by the form
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - MLOGS</title>
        <meta
          name="description"
          content="Log in to your MLOGS account to explore inspiring blogs, ideas, and stories. Stay connected with the creative community."
        />
        <meta
          name="keywords"
          content="MLOGS, login, access blogs, blogging platform, user account"
        />
        <meta property="og:title" content="Login - MLOGS" />
        <meta
          property="og:description"
          content="Log in to your MLOGS account to access blogs, stories, and creative ideas shared by a passionate community."
        />
        <meta
          property="og:url"
          content="https://mlogs.mayanktiwari.tech/login"
        />
        <link rel="canonical" href="/login" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Log in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Login onLogin={handleLogin} />
            <div className="mt-4 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/register">Create an account</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
