import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import useResetPassword from "@/hooks/useResetPassword";
import { resetPasswordSchema } from "@/lib/schema";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPassProps {
  token: string | undefined;
}

export function ResetPass({ token }: ResetPassProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const { loading: isLoading, resetPassword: onResetPass } = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setFormError(null);
    if (!token) {
      setFormError("Invalid or missing reset token. Please try again.");
      return;
    }

    try {
      await onResetPass(token, data.newPassword);
      form.reset();
    } catch (error) {
      setFormError(
        "An error occurred while resetting your password. Please try again."
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && <div className="text-red-500 text-sm">{formError}</div>}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || form.formState.isSubmitting}
        >
          {(isLoading || form.formState.isSubmitting) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isLoading || form.formState.isSubmitting
            ? "Please Wait..."
            : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
}
