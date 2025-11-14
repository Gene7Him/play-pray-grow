import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Calendar,
  Lightbulb,
  ClipboardList,
  BookMarked,
  ShoppingCart,
  Plane,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Curriculum", path: "/curriculum" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: Lightbulb, label: "Brainstorm", path: "/brainstorm" },
  { icon: ClipboardList, label: "Assignments", path: "/assignments" },
  { icon: BookMarked, label: "Resources", path: "/resources" },
  { icon: ShoppingCart, label: "Supplies", path: "/supplies" },
  { icon: Plane, label: "Field Trips", path: "/field-trips" },
  { icon: GraduationCap, label: "Portfolios", path: "/portfolios" },
  { icon: MessageCircle, label: "Discussion", path: "/discussion" },
];

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-card shadow-sm z-10">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <BookOpen className="w-7 h-7" />
            HomeLearn
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Homeschool Hub</p>
        </div>

        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  );
}
