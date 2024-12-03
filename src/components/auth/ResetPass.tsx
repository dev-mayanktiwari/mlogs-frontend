import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ResetPassProps {
  onResetPass: (token: string, password: string) => Promise<void>;
  isLoading: boolean;
  token: string | undefined;
}

export function ResetPass({ onResetPass, isLoading, token }: ResetPassProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResetPass(token as string, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Enter new password:</Label>
        <Input
          id="text"
          type="email"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Please Wait..." : "Continue"}
      </Button>
    </form>
  );
}
