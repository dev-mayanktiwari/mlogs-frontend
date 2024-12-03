import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import useResetPassword from "@/hooks/useResetPassword";
import { ResetPass } from "@/components/auth/ResetPass";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { loading, resetPassword } = useResetPassword();
  const { token } = useParams<{ token: string }>();
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPass
            onResetPass={resetPassword}
            isLoading={loading}
            token={token}
          />
        </CardContent>
      </Card>
    </div>
  );
}
