import { z } from "zod";

const adminLoginSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(6)
});

export { adminLoginSchema };

