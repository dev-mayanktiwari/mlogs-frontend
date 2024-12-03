import { Button } from "@/components/ui/button";

interface ConfirmationActionProps {
  loading: boolean;
  isConfirmed: boolean;
  onRetry: () => void;
  onGoToLogin: () => void;
}

export const ConfirmationAction: React.FC<ConfirmationActionProps> = ({
  loading,
  isConfirmed,
  onRetry,
  onGoToLogin,
}) => {
  if (loading) {
    return null;
  }
  return (
    <Button onClick={isConfirmed ? onGoToLogin : onRetry}>
      {isConfirmed ? "Go to Login" : "Retry Verification"}
    </Button>
  );
};
