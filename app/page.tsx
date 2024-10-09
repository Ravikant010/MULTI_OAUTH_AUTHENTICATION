import LoginForm from "@/components/login-form";
import AuthCard from "@/components/oauth-grid";
import { Button } from "@/components/ui/button";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <AuthCard />
    </div>
  );
}
