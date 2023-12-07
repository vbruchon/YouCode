import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Typography } from "../ui/Typography";
import Image from "next/image";
import { LoginButton } from "../features/auth/LoginButton";
import { AuthButton } from "../features/auth/AuthButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center flex-1 gap-2 md:gap-10">
          <Image
            src={"/images/you-code.svg"}
            width={50}
            height={35}
            alt="app logo"
          />
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>
        <div className="flex justify-center flex-1">
          <Link href="/explorer">Explorer</Link>
        </div>
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
