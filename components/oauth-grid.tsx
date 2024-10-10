"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  // TwitterIcon,
  // LinkedinIcon,
  // FacebookIcon,
  // MailIcon,
  // AppleIcon,
  // YoutubeIcon,
  // TwitchIcon,
  LogIn,
  // DollarSignIcon,
  UserIcon,
} from "lucide-react";
import LoginForm from "./login-form";
import { useRouter } from "next/navigation";

const oauthProviders = [
  {
    name: "Signup",
    icon: UserIcon,
    olor: "hover:bg-red-100 focus:ring-red-500",
  },
  {
    name: "Login",
    icon: LogIn,
    olor: "hover:bg-red-100 focus:ring-red-500",
  },
  {
    name: "Google",
    icon: GoogleIcon,
    color: "hover:bg-red-100 focus:ring-red-500",
  },
  {
    name: "GitHub",
    icon: GithubIcon,
    color: "hover:bg-gray-100 focus:ring-gray-500",
  },
  // {
  //   name: "Twitter",
  //   icon: TwitterIcon,
  //   color: "hover:bg-blue-100 focus:ring-blue-500",
  // },
  // {
  //   name: "LinkedIn",
  //   icon: LinkedinIcon,
  //   color: "hover:bg-blue-100 focus:ring-blue-500",
  // },
  // {
  //   name: "Facebook",
  //   icon: FacebookIcon,
  //   color: "hover:bg-blue-100 focus:ring-blue-500",
  // },
  // {
  //   name: "Apple",
  //   icon: AppleIcon,
  //   color: "hover:bg-gray-100 focus:ring-gray-500",
  // },
  // {
  //   name: "Email",
  //   icon: MailIcon,
  //   color: "hover:bg-green-100 focus:ring-green-500",
  // },
  // {
  //   name: "YouTube",
  //   icon: YoutubeIcon,
  //   color: "hover:bg-red-100 focus:ring-red-500",
  // },
  // {
  //   name: "Twitch",
  //   icon: TwitchIcon,
  //   color: "hover:bg-purple-100 focus:ring-purple-500",
  // },
];

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function AuthCard() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8 w-full absolute top-0">
      <Card className="mx-auto w-full lg:w-10/12 max-h-screen overflow-y-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold">
            Login and OAuth
          </CardTitle>
          <CardDescription className="mt-2 text-base sm:text-lg">
            Choose your preferred authentication method
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[600px]">
          <div className="flex flex-col space-y-6 items-center py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-10/12">
              {oauthProviders.map((provider) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  onClick={()=>{
                    if(provider.name.toLowerCase() == "google")
                      return  router.push("/login/google")
                    if(provider.name.toLowerCase() == "github")
                      return  router.push("/login/github")
                    if(provider.name.toLowerCase() == "login" || provider.name.toLowerCase() == "signup")
                    return router.push(`/${provider.name.toLowerCase()}`)
                  }}
                  className={`w-full h-12 sm:h-16 flex items-center justify-center gap-3 text-base sm:text-lg font-medium transition-colors ${provider.color}`}
                >
                  <provider.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  {provider.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
        By signing in, you agree to our{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p> */}
    </div>
  );
}
