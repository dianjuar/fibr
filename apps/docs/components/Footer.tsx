"use client";
import { Button } from "@rafty/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsDiscord, BsGithub, BsTwitter } from "react-icons/bs";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { navigation } from "../components/Navigation";

function PageLink({
  label,
  page,
  previous = false,
}: {
  label: string;
  page: { href: string; title: string };
  previous?: boolean;
}) {
  return (
    <>
      <Link href={page.href}>
        <Button
          className="!bg-secondary-100 hover:!bg-secondary-200 dark:!bg-secondary-800 dark:border-secondary-700 dark:hover:!bg-secondary-700/70 !rounded-full !py-1 focus:ring-0"
          aria-label={`${label}: ${page.title}`}
          variant="solid"
          leftIcon={previous ? <HiArrowLeft /> : undefined}
          rightIcon={!previous ? <HiArrowRight /> : undefined}
        >
          {label}
        </Button>
      </Link>
      <Link
        href={page.href}
        tabIndex={-1}
        aria-hidden="true"
        className="text-secondary-900 hover:text-secondary-600 dark:hover:text-secondary-300 text-base font-semibold transition dark:text-white"
      >
        {page.title}
      </Link>
    </>
  );
}

function PageNavigation() {
  const pathname = usePathname();
  const allPages = navigation.flatMap((group) => group.links);
  const currentPageIndex = allPages.findIndex((page) => page.href === pathname);

  if (currentPageIndex === -1) {
    return null;
  }

  const previousPage = allPages[currentPageIndex - 1];
  const nextPage = allPages[currentPageIndex + 1];

  if (!previousPage && !nextPage) {
    return null;
  }

  return (
    <div className="flex">
      {previousPage && (
        <div className="flex flex-col items-start gap-3">
          <PageLink label="Previous" page={previousPage} previous />
        </div>
      )}
      {nextPage && (
        <div className="ml-auto flex flex-col items-end gap-3">
          <PageLink label="Next" page={nextPage} />
        </div>
      )}
    </div>
  );
}

const SOCIALS = [
  {
    name: "Twitter",
    link: "#",
    icon: BsTwitter,
  },
  {
    name: "Github",
    link: "#",
    icon: BsGithub,
  },
  {
    name: "Discord",
    link: "#",
    icon: BsDiscord,
  },
];

function SmallPrint() {
  return (
    <div className="border-secondary-900/5 flex flex-col items-center justify-between gap-5 border-t pt-8 dark:border-white/5 sm:flex-row">
      <p className="text-secondary-600 dark:text-secondary-400 text-xs">
        &copy; Copyright {new Date().getFullYear()}. All rights reserved.
      </p>
      <div className="flex items-center gap-5">
        {SOCIALS.map(({ name, icon: Icon, link }, index) => (
          <Link href={link} key={index}>
            <Icon
              size={17}
              className="hover:fill-secondary-900 fill-secondary-500 dark:hover:fill-secondary-300 dark:fill-secondary-500 transition-all"
            />
            <span className="sr-only">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
      <PageNavigation />
      <SmallPrint />
    </footer>
  );
}
