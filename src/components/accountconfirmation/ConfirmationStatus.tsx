import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface ConfirmationStatusProps {
  loading: boolean;
  isConfirmed: boolean;
  error: Error | null;
}

export const ConfirmationStatus: React.FC<ConfirmationStatusProps> = ({
  loading,
  isConfirmed,
  error,
}) => {
  if (loading) {
    return <Loader2 className="h-16 w-16 text-primary animate-spin" />;
  }
  if (isConfirmed) {
    return <CheckCircle className="h-16 w-16 text-green-500" />;
  }
  if (error) {
    return <XCircle className="h-16 w-16 text-red-500" />;
  }
  return null;
};
