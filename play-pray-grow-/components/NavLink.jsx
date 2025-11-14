import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavLink({ to, className, activeClassName, children, ...props }) {
  const pathname = usePathname();
  const isActive = pathname === to || (to !== "/" && pathname?.startsWith(to));

  return (
    <Link href={to} className={cn(className, isActive && activeClassName)} {...props}>
      {children}
    </Link>
  );
}

export { NavLink };
