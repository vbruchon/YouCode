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
      <div className="container flex h-16 items-center  space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center gap-2 md:gap-10">
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

        <div className="flex flex-1 items-center justify-end space-x-12">
          <div className="flex justify-center gap-4">
            <Typography
              as={Link}
              href="/explorer"
              className="text-muted-foreground hover:text-foreground"
            >
              Explorer
            </Typography>
            <Typography
              as={Link}
              href="/courses"
              className="text-muted-foreground hover:text-foreground"
            >
              Courses
            </Typography>
          </div>
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
