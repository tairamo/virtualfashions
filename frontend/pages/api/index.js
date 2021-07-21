// import Head from "next/head";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { TwitterShareButton, TwitterIcon } from "react-share";

// import { verifyEmailSchema } from "../schema/common";
// import LeadService from "../services/api/LeadService";
// import { Button } from "../components/ui/Button/Button";

// export default function Landing() {
//   const [email, setEmail] = useState("");

//   // Use form
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { isSubmitting, errors },
//   } = useForm({
//     resolver: yupResolver(verifyEmailSchema),
//   });

//   const onSubmit = async (values) => {
//     try {
//       // Call create lead method of Lead service
//       await LeadService.createLead(values);

//       // Set mail state
//       setEmail(values.email);

//       // Set value
//       setValue("email", "");

//       let successTag = document.getElementById("success");
//       successTag.style.display = "block";

//       let errorTag = document.getElementById("error");
//       errorTag.style.display = "none";
//     } catch (err) {
//       console.log(err);
//       let errorTag = document.getElementById("error");
//       errorTag.style.display = "block";

//       let successTag = document.getElementById("success");
//       successTag.style.display = "none";
//     }
//   };

//   return (
//     <>
//       <Head>
//         {/* Primary Meta Tags */}
//         <title>Nifty Nudes</title>

//         <meta
//           name="viewport"
//           content="initial-scale=1.0, width=device-width, user-scalable=no, width=device-width, height=device-height, viewport-fit=cover"
//         />
//         <meta name="title" content="Nifty Nudes" />
//         <meta name="description" content="NFT market for adult content" />

//         {/* Open Graph / Facebook */}
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="http://niftynudes.io/" />
//         <meta property="og:title" content="Nifty Nudes" />
//         <meta
//           property="og:description"
//           content="NFT market for adult content"
//         />
//         <meta property="og:image" content="niftyThumb.png" />

//         {/* Twitter */}
//         <meta property="twitter:card" content="summary_large_image" />
//         <meta property="twitter:url" content="NFT market for adult content" />
//         <meta property="twitter:title" content="Nifty Nudes" />
//         <meta
//           property="twitter:description"
//           content="NFT market for adult content"
//         />
//         <meta property="twitter:image" content="niftyThumb.png" />

//         <link rel="shortcut icon" href="/niftyicon.svg" />
//       </Head>

//       <div className="relative bg-white overflow-hidden">
//         <div
//           className="hidden lg:block lg:absolute lg:inset-0"
//           aria-hidden="true"
//         >
//           <svg
//             className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
//             width="640"
//             height="784"
//             fill="none"
//             viewBox="0 0 640 784"
//           >
//             <defs>
//               <pattern
//                 id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
//                 x="118"
//                 y="0"
//                 width="20"
//                 height="20"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <rect
//                   x="0"
//                   y="0"
//                   width="4"
//                   height="4"
//                   className="text-gray-200"
//                   fill="currentColor"
//                 />
//               </pattern>
//             </defs>
//             <rect
//               y="72"
//               width="640"
//               height="640"
//               className="text-gray-50"
//               fill="currentColor"
//             />
//             <rect
//               x="118"
//               width="404"
//               height="784"
//               fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
//             />
//           </svg>
//         </div>
//         <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
//           <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
//             <div className="lg:grid lg:grid-cols-12 lg:gap-8">
//               <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left my-auto">
//                 <h1>
//                   <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
//                     Coming soon
//                   </span>
//                   <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
//                     <span className="block text-gray-900">NFT market for</span>
//                     <span className="block text-brand-f2f2f2">adult content</span>
//                   </span>
//                 </h1>
//                 <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
//                   Buy, sell and discover adult digital items
//                 </p>
//                 <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
//                   <p className="text-base font-medium text-gray-900">
//                     Sign up to get notified when it’s ready.
//                   </p>
//                   <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="mt-3 sm:flex sm:justify-center lg:justify-start">
//                       <label htmlFor="email" className="sr-only">
//                         Email
//                       </label>
//                       <div>
//                         <input
//                           id="email"
//                           type="email"
//                           autoComplete="off"
//                           {...register("email")}
//                           placeholder="Enter your email"
//                           error={errors?.email?.message}
//                           className="block w-full max-h-3.125 py-3 text-base rounded-md placeholder-gray-500 shadow-sm transition-all duration-300 ease-trans-expo outline-none focus:ring-black focus:border-black sm:flex-1 border-gray-300"
//                         />
//                         {errors?.email && (
//                           <p className="text-xs leading-6 text-red-500 text-left">
//                             {errors.email.message}
//                           </p>
//                         )}
//                       </div>

//                       <Button
//                         type="submit"
//                         text="Notify me"
//                         disabled={isSubmitting}
//                         isSubmitting={isSubmitting}
//                         className={`mt-3 w-full sm:w-3/12 lg:w-4/12 max-h-3.125 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0 sm:ml-3 ${
//                           isSubmitting
//                             ? "cursor-default opacity-50"
//                             : ""
//                         }`}
//                       />
//                     </div>
//                   </form>

//                   <p
//                     id="error"
//                     style={{ display: "none" }}
//                     className="mt-3 text-red-500 text-sm sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
//                   >
//                     Something went wrong. Please try again later.{" "}
//                   </p>

//                   <p
//                     id="success"
//                     style={{ display: "none" }}
//                     className="mt-3 text-base sm:mt-5 text-black sm:text-base lg:text-base xl:text-xl text-center"
//                   >
//                     Thank you. We will notify you on {email} when we launch!{" "}
//                     <br />
//                     <TwitterShareButton
//                       id="twitterShare"
//                       title="Checkout the sexiest NFT marketplace for adult content"
//                       hashtags={["niftynudes", "nft"]}
//                       url="niftynudes.io"
//                       className="flex m-auto h-10 items-center space-x-2"
//                     >
//                       <span className="text-blue-500">
//                         {" "}
//                         also help us spread the word on Twitter!{" "}
//                       </span>
//                       <TwitterIcon size={32} round />
//                     </TwitterShareButton>
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
//                 <svg
//                   className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
//                   width="640"
//                   height="784"
//                   fill="none"
//                   viewBox="0 0 640 784"
//                   aria-hidden="true"
//                 >
//                   <defs>
//                     <pattern
//                       id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
//                       x="118"
//                       y="0"
//                       width="20"
//                       height="20"
//                       patternUnits="userSpaceOnUse"
//                     >
//                       <rect
//                         x="0"
//                         y="0"
//                         width="4"
//                         height="4"
//                         className="text-gray-200"
//                         fill="currentColor"
//                       />
//                     </pattern>
//                   </defs>
//                   <rect
//                     y="72"
//                     width="640"
//                     height="640"
//                     className="text-gray-50"
//                     fill="currentColor"
//                   />
//                   <rect
//                     x="118"
//                     width="404"
//                     height="784"
//                     fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
//                   />
//                 </svg>
//                 <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
//                   <img
//                     className="w-full rounded-lg shadow-lg"
//                     src="/placeholders/brittney.jpg"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }
