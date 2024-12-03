import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { ForgotPass } from "@/components/auth/ForgotPass";
import useForgotPassword from "@/hooks/useForgotPassword";
import { Helmet } from "react-helmet-async";

export default function ForgotPassword() {
  const { loading, forgotPassword } = useForgotPassword();

  return (
    <>
      <Helmet>
        <title>Forgot Password - MLOGS</title>
        <meta
          name="description"
          content="Forgot your MLOGS password? Enter your registered email to receive a password reset link and regain access to your account."
        />
        <meta
          name="keywords"
          content="MLOGS, forgot password, reset password, recover account, password reset link"
        />
        <meta property="og:title" content="Forgot Password - MLOGS" />
        <meta
          property="og:description"
          content="Reset your password on MLOGS. Enter your email to receive a link and get back to exploring inspiring blogs and ideas."
        />
        <meta
          property="og:url"
          content="https://mlogs.mayanktiwari.tech/forgot-password"
        />
        <link rel="canonical" href="/forgot-password" />
      </Helmet>
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
            <ForgotPass onForgotPass={forgotPassword} isLoading={loading} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
