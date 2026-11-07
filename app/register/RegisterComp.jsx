import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterComp({ role }) {
  const isStudent = role === "student";
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-5">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6">
        <div className="text-center">
          <div className="text-2xl font-semibold tracking-tight text-slate-950">
            Create your account
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {isStudent
              ? "Build your profile and find internships that fit."
              : "Find strong student talent for your next opportunity."}
          </p>
        </div>
        <div className="mt-5">
          <RegisterForm role={role} />
        </div>
        <div className="mt-5 border-t border-slate-100 pt-4 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link className="font-semibold text-green-700 hover:text-green-800 hover:underline" href="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
