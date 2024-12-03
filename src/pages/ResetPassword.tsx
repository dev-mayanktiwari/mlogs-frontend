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
import { Helmet } from "react-helmet-async";

export default function ResetPassword() {
  const { loading, resetPassword } = useResetPassword();
  const { token } = useParams<{ token: string }>();
  return (
    <>
      <Helmet>
        <title>Reset Password - Your App Name</title>
        <meta
          name="description"
          content="Set a new password for your account to regain access. Please ensure the token is valid."
        />
        <meta
          name="keywords"
          content="reset password, forgot password, recover account, password reset link"
        />
        <meta property="og:title" content="Reset Password - MLOGS" />
        <meta
          property="og:description"
          content="Reset your password on MLOGS. Enter your email to receive a link and get back to exploring inspiring blogs and ideas."
        />
        <meta
          property="og:url"
          content="https://mlogs.mayanktiwari.tech/forgot-password"
        />
        <link rel="canonical" href="/reset-password" />
      </Helmet>
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
    </>
  );
}
