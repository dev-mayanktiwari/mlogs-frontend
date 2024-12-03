import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { ForgotPass } from "@/components/auth/ForgotPass";
import useForgotPassword from "@/hooks/useForgotPassword";

export default function ForgotPassword() {
  const { loading, forgotPassword } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPass onLogin={forgotPassword} isLoading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
