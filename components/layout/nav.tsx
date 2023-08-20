"use-client";

import { useRouter, usePathname } from "next/navigation";
import useScroll from "@hooks/useScroll";
import { routes } from "@lib/routes";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className={`${useScroll(10)
        ? "shadow-bar backdrop-blur-md"
        : ""}  flex flex-row items-center justify-between px-4 py-2 sticky top-0 z-50 bg-dark transition-all`}
    >
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {routes.map(([name, path]) =>
          <button
            type="button"
            key={name}
            onClick={() => router.push(path)}
            className={`${pathname === path ? "bg-light" : ""} py-1 px-2 rounded-md text-lg`}
          >
            {name}
          </button>
        )}
      </div>
    </nav>
  );
}
