import Link from "next/link";
import { DemoLoginCard } from "@/features/auth/components/demo-login-card";
import { routes } from "@/config/routes";

export default function LoginPage() {
  return (
    <main className="centok-shell flex min-h-screen items-center justify-center p-6">
      <div className="w-full">
        <DemoLoginCard />
        <p className="mt-6 text-center text-sm text-text-muted-dark">
          <Link href={routes.home} className="underline underline-offset-4">
            Return to landing page
          </Link>
        </p>
      </div>
    </main>
  );
}
