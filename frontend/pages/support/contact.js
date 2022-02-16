import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Layout from "../../components/layout";
import { contactSchema } from "../../schema/contact";
import { Input } from "../../components/ui/Form/Input";
import UserService from "../../services/api/UserService";
import { ErrorMsg } from "../../components/alerts/error";
import { Button } from "../../components/ui/Button/Button";
import { SuccessMsg } from "../../components/alerts/success";
import {
  SUBMIT,
  SUPPORT_ERROR,
  SUPPORT_REQUEST_SUCCESS,
} from "../../constants";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  // On submit handler function
  const onSubmit = async (values) => {
    try {
      // Call request support function
      await UserService.requestSupport(values);

      // Reset form
      reset({ email: "", phone: "", fullname: "", message: "" });

      // Show success message
      toast.success(<SuccessMsg msg={SUPPORT_REQUEST_SUCCESS} />);
    } catch (err) {
      console.log(err);

      const data = err?.response?.data;

      let errMsg = SUPPORT_ERROR;
      if (data?.email) {
        errMsg = data?.email[0];
      } else if (data?.message) {
        errMsg = data?.message[0];
      } else if (data?.fullname) {
        errMsg = data?.fullname[0];
      }

      // Show error message
      toast.error(<ErrorMsg msg={errMsg} />);
    }
  };

  return (
    <Layout>
      <div className="relative bg-white my-8">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Get in touch
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                Nullam risus blandit ac aliquam justo ipsum. Quam mauris
                volutpat massa dictumst amet. Sapien tortor lacus arcu.
              </p>
              <dl className="mt-8 text-base text-gray-500">
                <div className="mt-3">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    {/* Heroicon name: outline/mail */}
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="ml-3">hello@virtualfashion.io</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-y-6"
              >
                <Input
                  type="text"
                  id="fullname"
                  name="fullname"
                  register={register}
                  autoComplete="name"
                  placeholder="Full name"
                  className="py-3 px-4 placeholder-gray-500 shadow-sm sm:text-base text-base"
                  error={errors?.fullname?.message}
                />

                <Input
                  id="email"
                  type="email"
                  name="email"
                  register={register}
                  placeholder="Email"
                  autoComplete="email"
                  className="py-3 px-4 placeholder-gray-500 shadow-sm sm:text-base text-base"
                  error={errors?.email?.message}
                />

                <div>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    autoComplete="tel"
                    {...register("phone")}
                    placeholder="Phone (Optional)"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-black focus:border-black border-gray-300 rounded-md transition-all duration-300 ease-trans-expo outline-none"
                  />
                  {errors?.phone?.message && (
                    <p className="text-xs leading-6 text-red-500">
                      {errors?.phone?.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    rows={4}
                    id="message"
                    name="message"
                    placeholder="Message"
                    {...register("message")}
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-black focus:border-black border-gray-300 rounded-md transition-all duration-300 ease-trans-expo outline-none"
                  />

                  {errors?.message?.message && (
                    <p className="text-xs leading-6 text-red-500">
                      {errors?.message?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Button
                    text={SUBMIT}
                    type="submit"
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}
                    className="items-center inline-flex w-2/12	h-3.25 justify-center py-3 px-6 border-2 border-black shadow-sm text-base font-medium rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
