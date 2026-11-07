import Link from "next/link";
import LoginForm from "./LoginForm";
import checkUserAndRedirect from "@/lib/utils/checkUserAndRedirect";

export default async function Login() {
  await checkUserAndRedirect();
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7">
        <div className="mb-1 text-center text-2xl font-semibold tracking-tight text-slate-950">
          Welcome back
        </div>
        <p className="mb-6 text-center text-sm text-slate-500">
          Sign in to continue your internship journey.
        </p>
        <div className="text-left">
          <LoginForm />
        </div>
        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <p className="text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <span className="font-medium text-slate-700">Register as</span>{" "}
            <Link className="font-semibold text-green-700 hover:text-green-800 hover:underline" href="/register/student">
              student
            </Link>
            <span className="px-1 text-slate-300">or</span>
            <Link className="font-semibold text-green-700 hover:text-green-800 hover:underline" href="/register/company">
              company
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
