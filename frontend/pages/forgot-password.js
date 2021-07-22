import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../utils/auth";
import { Button } from "../components/ui/Button";
import { Loader } from "../components/ui/Loader";
import { Input } from "../components/ui/Form/Input";
import { verifyEmailSchema } from "../schema/common";
import AuthService from "../services/api/AuthService";
import { ErrorMsg } from "../components/alerts/error";
import { SuccessMsg } from "../components/alerts/success";
import { INTERNAL_SERVER_ERROR, SUBMIT } from "../constants";

export default function Register() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Register use form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(verifyEmailSchema),
  });

  const onSubmit = async (values) => {
    try {
      const { email } = values;
      const { data } = await AuthService.forgotPassword({ email });

      // Set email value
      setValue("email", "");

      toast.success(<SuccessMsg msg={data.message} />);
    } catch (error) {
      toast.error(
        <ErrorMsg msg={error?.response?.data || INTERNAL_SERVER_ERROR} />
      );
    }
  };

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (loading) return LoaderComponent;

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
          Forgot password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              name="email"
              label="Email Address"
              autoComplete="off"
              register={register}
              error={errors?.email?.message}
            />

            <div>
              <Button
                type="submit"
                text={SUBMIT}
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
