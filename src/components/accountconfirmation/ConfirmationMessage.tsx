interface ConfirmationMessageProps {
  loading: boolean;
  isConfirmed: boolean;
  error: Error | null;
}

export const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({
  loading,
  isConfirmed,
  error,
}) => {
  if (loading) {
    return (
      <p className="text-center text-lg">
        Please wait while we confirm your account...
      </p>
    );
  }
  if (isConfirmed) {
    return (
      <p className="text-center text-lg">
        Your account has been successfully verified!
      </p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-lg">
        We encountered an error while verifying your account. Please try again
        later.
      </p>
    );
  }
  return null;
};
