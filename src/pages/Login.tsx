import { useState } from "react";
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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user } = await login(email, password);
      console.log(user);
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
          error.response?.data?.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <Login onLogin={handleLogin} isLoading={isLoading} />
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
  );
}
