import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import useAccountConfirmation from "@/hooks/useAccountConfirmation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const AccountConfirmation = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { accountConfirmation, loading, verificationData } =
    useAccountConfirmation();
  const [isAttempted, setIsAttempted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAccount = async () => {
      if (token && code && !isAttempted) {
        setIsAttempted(true);
        await accountConfirmation(token, code);
      }
    };
    confirmAccount();
  }, [token, code, accountConfirmation, isAttempted]);

  const handleNavigate = () => {
    navigate("/login");
  };

  const isVerified =
    verificationData?.success &&
    verificationData?.data?.user.accountConfirmation.isVerified;

  const pageTitle = loading
    ? "Verifying Account..."
    : isVerified
    ? "Account Verified"
    : "Account Confirmation Failed";
  const pageDescription = loading
    ? "Please wait while we verify your account."
    : isVerified
    ? "Your account has been successfully verified!"
    : "We couldn't verify your account. The link may be invalid or expired.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="account confirmation, verify account" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <link rel="canonical" href="/account-confirmation" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Account Confirmation
            </CardTitle>
            <CardDescription className="text-center">
              {loading ? "Verifying your account..." : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {loading && (
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            )}
            {!loading && isVerified && (
              <CheckCircle className="h-16 w-16 text-green-500" />
            )}
            {!loading && !isVerified && (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
            <p className="text-center text-lg">
              {loading
                ? "Please wait while we confirm your account..."
                : isVerified
                ? "Your account has been successfully verified!"
                : "We couldn't verify your account. The link may be invalid or expired."}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            {!loading && (
              <Button onClick={handleNavigate}>
                {isVerified ? "Go to Login" : "Back to Home"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AccountConfirmation;
