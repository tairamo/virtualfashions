import Link from "next/link";
import nookies from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../utils/auth";
import { Button } from "../components/ui/Button";
import { Loader } from "../components/ui/Loader";
import { Input } from "../components/ui/Form/Input";
import { registerSchema } from "../schema/register";
import { verifyEmailSchema } from "../schema/common";
import AuthService from "../services/api/AuthService";
import { ErrorMsg } from "../components/alerts/error";
import { SuccessMsg } from "../components/alerts/success";
import {
  INTERNAL_SERVER_ERROR,
  SIGN_UP,
  TOKEN,
  VERIFY_EMAIL,
} from "../constants";

export default function Register() {
  const router = useRouter();
  const { query } = router;
  const { user, setUser, loading } = useAuth();

  // Register use form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // Verify email use form
  const {
    register: verifyEmailRegister,
    handleSubmit: verifyEmailHandleSubmit,
    formState: verifyEmailFormState,
    setValue: verifyEmailSetValue,
  } = useForm({
    resolver: yupResolver(verifyEmailSchema),
  });

  const onVerifyEmailSubmit = async (values) => {
    try {
      const { email } = values;
      const { data } = await AuthService.verifyEmail({ email });

      // Reset email value to init
      verifyEmailSetValue("email", "");

      toast.success(<SuccessMsg msg={data.message} />, { autoClose: 6000 });
    } catch (error) {
      toast.error(
        <ErrorMsg msg={error?.response?.data || INTERNAL_SERVER_ERROR} />
      );
    }
  };

  const onSubmit = async (values) => {
    try {
      const { email, password, fullname, token } = values;

      // Register user
      await AuthService.register({ email, password, fullname, token });

      const { data } = await AuthService.login({ email, password });
      const { token: authToken, user } = data;

      // Set cookies
      nookies.set(undefined, TOKEN, authToken, { path: "/" });

      // Set user state
      setUser(user);

      router.replace("/");
    } catch (error) {
      toast.error(
        <ErrorMsg msg={error?.response?.data || INTERNAL_SERVER_ERROR} />
      );
    }
  };

  useEffect(() => {
    if (query?.email) setValue("email", query.email, { shouldValidate: true });
    if (query?.token) setValue("token", query.token, { shouldValidate: true });
  }, [query]);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (!loading && user) {
    router.replace("/");
    return LoaderComponent;
  }

  return (
    <div className="min-h-screen bg-brand-f2f2f2 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/placeholders/vfs.png"
          alt="Virtual Fashion"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          <span className="mr-1">Or</span>
          <Link href="/login" className="url-link" passHref>
            <span className="url-link">login here</span>
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {query.token && query.email ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                type="text"
                id="fullname"
                name="fullname"
                label="Full Name"
                autoComplete="fullname"
                register={register}
                error={errors?.fullname?.message}
              />

              <fieldset disabled>
                <Input
                  disabled
                  id="email"
                  type="text"
                  name="email"
                  value={query.email}
                  label="Email Address"
                  autoComplete="email"
                  register={register}
                  error={errors?.email?.message}
                />
              </fieldset>

              <Input
                id="password"
                type="password"
                name="password"
                label="Password"
                register={register}
                autoComplete="current-password"
                error={errors?.password?.message}
              />

              <div>
                <Button
                  type="submit"
                  text={SIGN_UP}
                  isSubmitting={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                />
              </div>
            </form>
          ) : (
            <form
              className="space-y-6"
              onSubmit={verifyEmailHandleSubmit(onVerifyEmailSubmit)}
            >
              <Input
                id="email"
                type="text"
                name="email"
                label="Email Address"
                autoComplete="email"
                register={verifyEmailRegister}
                error={verifyEmailFormState.errors?.email?.message}
              />

              <div>
                <Button
                  type="submit"
                  text={VERIFY_EMAIL}
                  isSubmitting={verifyEmailFormState.isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    verifyEmailFormState.isSubmitting ? "opacity-50" : ""
                  }`}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
