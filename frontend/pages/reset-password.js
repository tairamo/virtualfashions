import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../utils/auth";
import { Button } from "../components/ui/Button";
import { Loader } from "../components/ui/Loader";
import { Input } from "../components/ui/Form/Input";
import AuthService from "../services/api/AuthService";
import { ErrorMsg } from "../components/alerts/error";
import { SuccessMsg } from "../components/alerts/success";
import { resetPasswordShema } from "../schema/resetPassword";
import { jwtError, tokenVerification } from "../utils/general";
import { INTERNAL_SERVER_ERROR, SUBMIT, VALID_TOKEN_ERROR } from "../constants";

export default function Register() {
  const router = useRouter();
  const { query } = router;
  const { token } = query;
  const { user, loading } = useAuth();

  const [isVerify, setIsVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Register use form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(resetPasswordShema),
  });

  const onSubmit = async (values) => {
    try {
      if (!isVerify) throw { response: { data: VALID_TOKEN_ERROR } };

      const { newPassword, confirmPassword } = values;

      const { data } = await AuthService.resetPassword({
        newPassword,
        confirmPassword,
        resetToken: token,
      });

      // Redirect to login page
      router.push("/login");

      toast.success(<SuccessMsg msg={data.message} />);
    } catch (error) {
      toast.error(
        <ErrorMsg msg={error?.response?.data || INTERNAL_SERVER_ERROR} />
      );
    }
  };

  // Verify token
  const verifyToken = (token) => {
    try {
      const data = tokenVerification(token);

      // Set set is verify state
      setIsVerify(true);

      // Set loadind state
      setIsLoading(false);
    } catch (err) {
      console.log(err);

      toast.error(<ErrorMsg msg={jwtError(err.message)} />);

      // Set loadind state
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        // Set loadind state
        setIsLoading(false);
      }, 1000);

      return;
    }

    // Call verify token
    verifyToken(token);
  }, [token]);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (isLoading || loading) return LoaderComponent;

  if (!loading && user) {
    router.replace("/");
    return LoaderComponent;
  }

  return (
    <div className="min-h-screen bg-brand-f2f2f2 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="Virtual Fashion"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="password"
              id="new-password"
              name="newPassword"
              label="New password"
              autoComplete="off"
              register={register}
              error={errors?.newPassword?.message}
            />

            <Input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              label="Confirm password"
              autoComplete="off"
              register={register}
              error={errors?.confirmPassword?.message}
            />

            <div>
              <Button
                type="submit"
                text={SUBMIT}
                disabled={!isVerify}
                isSubmitting={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                  !isVerify ? "opacity-50 cursor-default" : ""
                }`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
