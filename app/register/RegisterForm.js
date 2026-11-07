"use client";

import handleRegisterAction from "@/actions/auth/handleRegisterAction";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function RegisterForm({ role }) {
  const [error, setError] = useState();
  const { pending } = useFormStatus();
  const [typedValues, setTypedValues] = useState({ name: "", email: "" });
  async function handleSubmit(formdata) {
    const response = await handleRegisterAction(formdata, role);
    console.log(response);
    if (response?.error) {
      setError(response);
    }
  }
  return (
    <form
      className="flex flex-col gap-3"
      action={handleSubmit}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="block text-xs font-medium text-slate-700">
          {role === "student" ? "Full name" : "Company name"}
        </label>
        <input
          className={`h-9 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 ${error?.path === "name" ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-slate-300"}`}
          id="name"
          name="name"
          autoComplete="name"
          value={typedValues?.name}
          onChange={(e) => {
            setTypedValues({ ...typedValues, name: e.target.value });
            setError(null);
          }}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs font-medium text-slate-700">
          Email address
        </label>
        <input
          className={`h-9 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 ${error?.path === "email" ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-slate-300"}`}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={typedValues?.email}
          onChange={(e) => {
            setTypedValues({ ...typedValues, email: e.target.value });
            setError(null);
          }}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-xs font-medium text-slate-700">
          Password
        </label>
        <input
          className={`h-9 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 ${error?.path === "password" ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-slate-300"}`}
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          onChange={() => {
            setError(null);
          }}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="cpassword" className="block text-xs font-medium text-slate-700">
          Confirm password
        </label>
        <input
          className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
          type="password"
          id="cpassword"
          name="cpassword"
          autoComplete="new-password"
        />
      </div>
      <div className="mt-1">
        <div className="mb-2 min-h-5 text-center">
          {error && (
            <p className="text-sm text-red-600">
              {error?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="h-10 w-full rounded-lg bg-green-700 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/20 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Creating account..." : "Create account"}
        </button>
      </div>
    </form>
  );
}
