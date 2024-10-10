import { validateRequest } from "@/auth/auth";
import LoginForm from "@/components/login-form";
import AuthCard from "@/components/oauth-grid";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
// import Image from "next/image";

export default async function Home() {
  const {user} = await validateRequest()
  if(user)
    redirect("/home")
  return (
    <div className="w-full">
      <AuthCard />
    </div>
  );
}


