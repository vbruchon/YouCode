import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

export const action = createSafeActionClient();

export class ServerError extends Error {}

export const authentificatedAction = createSafeActionClient({
  handleReturnedServerError: (error) => {
    if (error instanceof ServerError) {
      return {
        serverError: error.message,
      };
    }
    return {
      serverError: "An unexpected error occured",
    };
  },
  middleware: async () => {
    const session = await getAuthSession();

    const user = session?.user;
    const userId = user?.id;

    if (!session) {
      throw new ServerError("You must be logged in to perform this action");
    }
    return { user, userId };
  },
});
