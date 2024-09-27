import { getUserByEmail as getUserByEmailAction } from "@/actions/user-action";

export async function getUserByEmail(email: string) {
  return getUserByEmailAction(email);
}
