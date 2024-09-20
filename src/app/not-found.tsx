import Image from "next/image";
import Link from "next/link";

import { button } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="https://illustrations.popsy.co/teal/question-mark.svg"
        alt="Not Found"
        className="dark:invert"
        width={250}
        height={250}
      />
      <h1 className="mt-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
        Oops! Page not found.
      </h1>
      <p className="mb-6 mt-4 text-lg text-gray-600 dark:text-gray-400">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href="/" className={button({ size: "lg", color: "primary" })}>
        Go to Homepage
      </Link>
    </div>
  );
}
