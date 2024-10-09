import lucia from "lucia";

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        UserId: number;

    }
}