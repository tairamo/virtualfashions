import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../context/auth";
import { schema } from "../schema/register";
import { errorMessage } from "../utils/general";
import { Button } from "../components/ui/Button";
import { Loader } from "../components/ui/Loader";
import { Input } from "../components/ui/Form/Input";
import { ErrorMsg } from "../components/alerts/error";
import storage, { app as firebaseApp } from "../utils/firebase/storage";

export default function Register() {
  let uniqueName;
  const router = useRouter();
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const genetateUsername = async (name) => {
    try {
      uniqueName = `${name}${Math.floor(Math.random() * 90000) + 10000}`;

      const result = await storage
        .collection("users")
        .where("username", "==", uniqueName)
        .get();

      // If username exist then regenerate username
      if (result?.docs?.length > 0) {
        console.log("username exist already!!!");
        await genetateUsername(name);
      }

      // Return unique username
      return uniqueName;
    } catch (err) {
      console.log({ err });
    }
  };

  const onSubmit = async (values) => {
    const { email, password, fullname } = values;

    try {
      const userCredentials = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Create random username using fullname
      const name = fullname.split(" ")[0];

      // Generate username
      const username = await genetateUsername(name);

      await storage.collection("users").doc(userCredentials.user.uid).set({
        fullname,
        username,
        email: email,
        bannerUrl: "",
        profileUrl: "",
        isCreator: false,
        uid: userCredentials.user.uid,
        createdAt: new Date().getTime(),
      });

      await firebaseApp.auth().currentUser.updateProfile({
        displayName: username,
      });

      // Redirect to main page
      router.replace("/index-2");
    } catch (error) {
      console.log(error);
      // Show error message
      toast.error(<ErrorMsg msg={errorMessage(error)} />);
    }
  };

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (loading) return LoaderComponent;

  if (!loading && user) {
    router.replace("/index-2");
    return LoaderComponent;
  }

  return (
    <div className="min-h-screen bg-brand-lighter flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="email"
              type="text"
              name="fullname"
              label="Full Name"
              autoComplete="fullname"
              register={register}
              error={errors?.fullname?.message}
            />

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
                text="Sign up"
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// https://www.w3schools.com/colors/colors_picker.asp?colorhex=FFB6C1
