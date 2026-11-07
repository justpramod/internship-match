"use client";

import handleLoginAction from "@/actions/auth/handleLoginAction";
import LoadingButton from "@/components/ui/LoadingButton";
import { useActionState, useState } from "react";

export default function LoginForm() {
  const [typedEmail, setTypedEmail] = useState("");

  const [state, formAction, isPending] = useActionState(
    handleLoginAction,
    null,
  );
  const error = state?.error ? state : null;

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4"
    >
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 ${error?.path === "email" ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-slate-300"}`}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={typedEmail}
          onChange={(e) => {
            setTypedEmail(e.target.value);
          }}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 ${error?.path === "password" ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-slate-300"}`}
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
        />
      </div>

      <div className="mt-1">
        <div className="mb-3 min-h-5 text-center">
          {error && (
            <p className="text-sm text-red-600">
              {error?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="flex h-10 w-full cursor-pointer justify-center rounded-lg bg-green-700 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/20 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
        >
          <LoadingButton
            initialValue={"Login"}
            pendingValue={"Logging in"}
            isPending={isPending}
          />
        </button>
      </div>
    </form>
  );
}
