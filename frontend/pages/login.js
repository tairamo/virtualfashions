import Link from "next/link";
import nookies from "nookies";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../utils/auth";
import { schema } from "../schema/login";
import { Button } from "../components/ui/Button";
import { Loader } from "../components/ui/Loader";
import { Input } from "../components/ui/Form/Input";
import AuthService from "../services/api/AuthService";
import { ErrorMsg } from "../components/alerts/error";
import { Link as URLLink } from "../components/ui/Link";
import { Checkbox } from "../components/ui/Form/Checkbox";
import { EMAIL_PASSOWRD_ERROR, SIGN_IN, TOKEN } from "../constants";

export default function Login() {
  const router = useRouter();
  const { user, setUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const { data } = await AuthService.login({ email, password });
      const { token, user } = data;

      // Set cookies
      nookies.set(undefined, TOKEN, token, { path: "/" });

      // Set user state
      setUser(user);

      router.replace("/");
    } catch (error) {
      console.error(error);
      toast.error(<ErrorMsg msg={EMAIL_PASSOWRD_ERROR} />);
    }
  };

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (loading) return LoaderComponent;

  if (!loading && user) {
    // Redirect to main page
    router.replace("/");
    return LoaderComponent;
  }

  return (
    <div className="min-h-screen bg-brand-f2f2f2 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="Nifty Nudes"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          <span className="mr-1">Or</span>
          <Link href="/register" className="url-link" passHref>
            <span className="url-link">register here</span>
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              register={register}
              error={errors?.email?.message}
            />

            <Input
              id="password"
              type="password"
              name="password"
              label="Password"
              register={register}
              autoComplete="current-password"
              error={errors?.password?.message}
            />

            <div className="flex items-center justify-between">
              <Checkbox
                id="remember_me"
                name="remember_me"
                label="Remember me"
              />

              <div className="text-sm">
                <URLLink href="/forgot-password" text="Forgot your password?" />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                text={SIGN_IN}
                isSubmitting={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                  isSubmitting ? "opacity-50" : ""
                }`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
