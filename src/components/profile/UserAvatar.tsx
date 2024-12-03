import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, className }) => (
  <Avatar className={className}>
    <AvatarImage src={"k"} alt={name} />
    <AvatarFallback>{name[0]}</AvatarFallback>
  </Avatar>
);
