import { AuthForm } from "../auth-form";

export const metadata = { title: "Create your academy — RabeeSkool" };

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-float sm:p-10">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
