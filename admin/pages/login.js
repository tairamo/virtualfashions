import nookies from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { TOKEN } from "../constants";
import { useAuth } from "../context/auth";
import { schema } from "../schema/login";
import { Button } from "../components/ui/Button";
import { Loader } from "../components/ui/Loader";
import { Input } from "../components/ui/Form/Input";
import AuthService from "../services/api/AuthService";

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
    const role = "Admin";

    try {
      const { data } = await AuthService.login({ email, password, role });
      const { token, user } = data;

      // Set cookies
      nookies.set(undefined, TOKEN, token, { path: "/" });

      // Set user state
      setUser(user);

      router.replace("/");
    } catch (err) {
      console.error(err);
      if (err?.response?.data) {
        toast.error(err.response.data);
      }
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/placeholders/vfs.png"
          alt="Virtual Fashion"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Sign in
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

            <div>
              <Button
                type="submit"
                text="Sign In"
                disabled={isSubmitting}
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
