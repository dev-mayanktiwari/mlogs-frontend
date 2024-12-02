import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface GuestbookMessageProps {
  name: string;
  message: string;
  createdAt: string;
}

export const GuestbookMessage: React.FC<GuestbookMessageProps> = ({
  name,
  message,
  createdAt,
}) => (
  <Card className="mb-4 overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={`h}`} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold truncate">{name}</h3>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
          <p className="text-sm break-words">{message}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
