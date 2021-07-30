import { toast } from "react-toastify";
import firebase from "firebase";
import "firebase/storage";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useRef } from "react";

import { useAuth } from "../../utils/auth";
import Layout from "../../components/layout";
import { Button } from "../../components/ui/Button";
import { schema } from "../../schema/updateDetails";
import { Loader } from "../../components/ui/Loader";
import Loading from "../../components/loading/Spinner";
import AuthService from "../../services/api/AuthService";
import UserService from "../../services/api/UserService";
import { ErrorMsg } from "../../components/alerts/error";
import { imageValidation } from "../../utils/fileValidation";
import { getBannerUrl, getProfileUrl } from "../../utils/general";
import { ErrorWidget } from "../../components/widget/validation/error";
import { ReactComponent as UrlIcon } from "../../public/icons/globe.svg";
import { SuccessWidget } from "../../components/widget/validation/success";
import { ReactComponent as TwitterIcon } from "../../public/icons/twitter.svg";
import { ReactComponent as InstagramIcon } from "../../public/icons/instagram.svg";
import {
  SAVE,
  FILE_UPLOAD_ERROR,
  USER_FETCHING_ERROR,
  INTERNAL_SERVER_ERROR,
  INTERVAL,
} from "../../constants";

let timeout;

function RegisterDetails(props) {
  let router = useRouter();
  const avatarRef = useRef(null);
  const bannerRef = useRef(null);
  const { setUser, loading } = useAuth();

  const [err, setErr] = useState(null);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [avatar, setAvatar] = useState({ file: null, loading: false });
  const [banner, setBanner] = useState({ file: null, loading: false });

  const [usernameStatus, setUsernameStatus] = useState({
    type: "hidden",
    message: "Loading",
  });

  // React hook form
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      ...userData,
      avatar: getProfileUrl(userData),
      banner: getBannerUrl(userData),
    },
  });

  async function checkUsernameValidity(username) {
    try {
      let user_name = username;
      if (user_name.includes("#")) {
        user_name = user_name.replaceAll("#", "%23");
      }

      if (user_name.includes("+")) {
        user_name = user_name.replaceAll("+", "%2B");
      }

      if (user_name.includes("&")) {
        user_name = user_name.replaceAll("&", "%26");
      }

      return await UserService.checkUsername(user_name);
    } catch (err) {
      console.log(err);
    }
  }

  // Form submit handler function
  const submitHanlder = async (values) => {
    try {
      // Set show loader
      setShowLoader(true);

      const {
        username,
        avatar,
        profileUrl,
        bannerUrl,
        banner,
        bio,
        socials,
        fullname,
      } = values;

      // Update user collection
      if (banner === "" && bannerUrl?.length > 0) {
        // Create reference
        const bannerRef = firebase
          .storage()
          .ref("users")
          .child(userData._id)
          .child("banner");

        // Delete file
        await bannerRef.delete();
      }

      if (avatar === "" && profileUrl?.length > 0) {
        // Create reference
        const avatarRef = firebase
          .storage()
          .ref("users")
          .child(userData._id)
          .child("avatar");

        // Delete file
        await avatarRef.delete();
      }

      // Set auth user context
      setUser({
        ...userData,
        bannerUrl: banner || "",
        profileUrl: avatar || "",
      });

      const updateData = {
        bio: bio || "",
        socials: socials,
        username: username,
        bannerUrl: banner || "",
        fullname: fullname || "",
        profileUrl: avatar || "",
      };

      await UserService.updateUser(userData._id, { updateData });

      // Set show loader
      setShowLoader(false);

      // Redirect to profile page
      router.push(`/${username}`);
    } catch (err) {
      console.log(err);

      // Set show loader
      setShowLoader(false);

      // Show error
      toast.error(
        <ErrorMsg msg={err?.response?.data || INTERNAL_SERVER_ERROR} />
      );
    }
  };

  // Avatar change handler function
  const avatarChangeHandler = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Image validation
      imageValidation(file);

      // Set avatar state
      setAvatar({ file: file.name, loading: true });

      // Upload file to storage
      const avatarUploadTask = await firebase
        .storage()
        .ref("users")
        .child(userData._id)
        .child("avatar")
        .put(file);

      const avatarURL = await avatarUploadTask.ref.getDownloadURL();

      // Set avatarUrl
      setAvatar({ file: avatarURL, loading: false });

      // Set avatar value into form
      setValue("avatar", avatarURL);
    } catch (err) {
      console.log(err);

      // Set avatarUrl
      setAvatar({ file: null, loading: false });

      // Remove ref value
      avatarRef.current.value = "";

      // Show error
      toast.error(<ErrorMsg msg={FILE_UPLOAD_ERROR} />);
    }
  };

  // Remove avatar
  const removeAvatar = async () => {
    try {
      // Set avatar state
      setAvatar({ file: null, loading: false });

      // Set value
      setValue("avatar", "");
    } catch (err) {
      console.log(err);
    }
  };

  // Banner change handler function
  const bannerChangeHandler = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Image validation
      imageValidation(file);

      // Set banner state
      setBanner({ file: file.name, loading: true });

      // Upload file to storage
      const bannerUploadTask = await firebase
        .storage()
        .ref("users")
        .child(userData._id)
        .child("banner")
        .put(file);

      const bannerURL = await bannerUploadTask.ref.getDownloadURL();

      // Set bannerUrl
      setBanner({ file: bannerURL, loading: false });

      // Set banner value into form
      setValue("banner", bannerURL);
    } catch (err) {
      console.log(err);

      // Set bannerUrl
      setBanner({ file: null, loading: false });

      // Remove ref value
      bannerRef.current.value = "";

      // Show error
      toast.error(<ErrorMsg msg={FILE_UPLOAD_ERROR} />);
    }
  };

  // Remove banner
  const removeBanner = async () => {
    try {
      // Set banner state
      setBanner({ file: null, loading: false });

      // Set value
      setValue("banner", "");
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch user detail function
  const fetchUserDetails = async () => {
    try {
      const { data: user } = await AuthService.me();

      // Set user data state
      setUserData(user);
    } catch (err) {
      console.log(err);

      // Set error state
      setErr({ message: USER_FETCHING_ERROR, statusCode: 400 });
    }
  };

  useEffect(() => {
    // Call fetch user details
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (username.length > 0) {
      // Clear settimeout function
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        checkUsernameValidity(username).then((response) => {
          if (response?.data?.isTaken) {
            setUsernameStatus({
              type: "error",
              message: `Username ${username} is already taken`,
            });
          } else {
            setUsernameStatus({
              type: "success",
              message: `Username ${username} is available`,
            });
          }
        });
      }, INTERVAL);
    } else {
      setUsernameStatus({
        type: "hiden",
      });
    }
  }, [username]);

  useEffect(() => {
    if (!userData) return;

    // Reset form value
    reset({
      ...userData,
      avatar: getProfileUrl(userData),
      banner: getBannerUrl(userData),
    });

    if (userData.bannerUrl) {
      // Set banner state
      setBanner({ file: userData.bannerUrl, loading: false });

      // Set banner state
      setValue("banner", userData.bannerUrl);
    }

    if (userData.profileUrl) {
      // Set avatar state
      setAvatar({ file: userData.profileUrl, loading: false });

      // Set banner state
      setValue("avatar", userData.profileUrl);
    }

    // Set text state
    setText(userData.bio || "");

    // Set username state
    setUsername(userData.username || "");
  }, [userData]);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (loading) return LoaderComponent;

  return (
    <Layout>
      <div>
        <h2 className="sm:pt-8 sm:text-4xl md:pt-16 md:text-5xl lg:pt-24 mx-auto max-w-46.25 text-center text-3xl font-semibold tracking-tight">
          Edit Profile
        </h2>
        <div className="sm:py-8 md:py-16 md:px-12 lg:py-24 grid gap-6 py-6">
          <div className="sm:px-8 md:px-12 md:py-8 md:mx-auto md:w-full lg:py-12 block p-6 shadow-3xl bg-white rounded-2xl no-underline max-w-46.25">
            <form onSubmit={handleSubmit(submitHanlder)}>
              <div className="grid gap-8">
                <div className="grid md:gap-16 md:grid-cols-250">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold">
                      Enter your details.
                    </h2>
                  </div>

                  <div className="mb-2.5 grid gap-2.5  min-w-0">
                    <div className="relative">
                      <div className="font-normal top-2.5 left-5 text-0.625 pointer-events-none absolute	opacity-100	transform translate-y-px transition-all ease-trans-expo">
                        Name
                      </div>
                      <input
                        type="text"
                        label="Name"
                        name="fullname"
                        autoComplete="off"
                        {...register("fullname")}
                        className="appearance-none block w-full px-5 pb-0.5 pt-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:outline-none focus:ring-black focus:border-black min-h-3.75 h-3.75 outline:none shadow-text-area transition-all duration-300 ease-trans-expo"
                      />
                    </div>
                    <div className="">
                      <div className="flex items-center rounded-md border border-gray-200 bg-gray-100">
                        <div className="text-lg px-5 font-normal text-brand-gray">
                          @
                        </div>
                        <div className="relative w-full">
                          <div className="font-normal top-2.5 left-5 text-0.625 pointer-events-none absolute	opacity-100	transform translate-y-px transition-all ease-trans-expo">
                            Username
                          </div>
                          <input
                            type="text"
                            id="username"
                            minLength={3}
                            name="username"
                            label="Username"
                            autoComplete="off"
                            {...register("username")}
                            className="appearance-none block w-full px-5 pb-0.5 pt-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:outline-none focus:ring-black focus:border-black min-h-3.75 h-3.75 outline:none shadow-text-area transition-all duration-300 ease-trans-expo"
                            onChange={(e) => {
                              const value = e.target.value.trim();

                              // Set username value into form
                              setValue("username", value, {
                                shouldValidate: true,
                              });

                              // Set username state
                              setUsername(value);
                            }}
                          />
                        </div>
                      </div>
                      {errors.username && (
                        <ErrorWidget msg={errors.username.message} />
                      )}
                      {usernameStatus?.type &&
                        usernameStatus?.message &&
                        (usernameStatus.type === "error" ? (
                          <ErrorWidget msg={usernameStatus.message} />
                        ) : (
                          <SuccessWidget msg={usernameStatus.message} />
                        ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:gap-16 md:grid-cols-250">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold">Add bio.</h2>
                  </div>
                  <div className=" min-w-0">
                    <div className="relative">
                      <div
                        className={`font-normal top-2.5 left-5 text-0.625 pointer-events-none absolute transform translate-y-px transition-all ease-trans-expo ${
                          text.length > 0 ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        Enter bio
                      </div>
                      <textarea
                        rows="10"
                        id="about"
                        {...register("bio")}
                        placeholder="Enter bio"
                        className="focus:ring-black focus:border-black border-gray-300 rounded-md resize-none block w-full leading-normal appearance: none bg-white px-5 py-6 rounded-md	outline-none focus:outline-none shadow-text-area transition-all duration-300 ease-trans-expo"
                        onChange={(e) => {
                          const value = e.target.value;

                          // Set text state
                          setText(value);

                          // Set value
                          setValue("bio", value);
                        }}
                      />
                    </div>
                    {errors.bio && (
                      <p className="text-xs leading-6 text-red-500">
                        {errors.bio.message}
                      </p>
                    )}
                    {/* <div className="pt-2 text-right	tracking-wide	text-gray-500 text-0.625 font-normal">
                      0/200
                    </div> */}
                  </div>
                </div>

                <div className="grid md:gap-16 md:grid-cols-250">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold">
                      Upload profile image.
                    </h2>
                    <div className="mb-4 font-base font-normal leading-relaxed">
                      Recommended size:
                      <br />
                      1000x1000px.
                      <br />
                      JPG, PNG or GIF.
                      <br />
                      10MB max size.
                    </div>
                  </div>

                  {avatar.file ? (
                    <div className="flex items-center p-5 min-h-7.188 bg-white rounded-md shadow-ho3xl h-7.188 min-w-0">
                      <div className="mr-6 flex relative min-w-4.5 max-w-4.5 min-h-4.5 max-h-4.5">
                        {avatar.loading ? (
                          <div className="absolute opacity-100 top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 z-40">
                            {/* Loader */}
                            <Loading color="bg-black ring-black opacity-100" />
                          </div>
                        ) : (
                          <div
                            className="w-full h-full bg-cover bg-center opacity-100 rounded-lg absolute top-0 left-0 z-10"
                            style={{
                              backgroundImage: `url(${avatar.file})`,
                            }}
                          ></div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="mb-2 font-base font-semibold truncate">
                          Profile Image
                        </div>
                        {avatar.loading ? (
                          <div className="text-black font-noraml font-base">
                            Uploading...
                          </div>
                        ) : (
                          <div
                            className="text-gray-500 font-noraml font-base cursor-pointer"
                            onClick={removeAvatar}
                          >
                            Delete
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex border border-dashed	border-gray-300	rounded-md min-h-7 h-7.188 items-center cursor-pointer outline:none min-w-0"
                      onClick={() => avatarRef.current.click()}
                    >
                      <input
                        type="file"
                        name="avatar"
                        ref={avatarRef}
                        className="hidden"
                        onChange={avatarChangeHandler}
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/svg+xml"
                      />
                      <div className="text-center leading-snug max-w-11.25 mx-auto font-base font-normal w-11.25">
                        Drag and drop an image here, or click to browse.
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:gap-16 md:grid-cols-250">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold">
                      Upload cover image.
                    </h2>
                    <div className="mb-4 font-base font-normal leading-relaxed">
                      Recommended size:
                      <br />
                      1500x500px.
                      <br />
                      JPG, PNG or GIF.
                      <br />
                      10MB max size.
                    </div>
                  </div>

                  {banner.file ? (
                    <div className="flex items-center p-5 min-h-7.188 bg-white rounded-md shadow-ho3xl h-7.188 min-w-0">
                      <div className="mr-6 flex relative min-w-4.5 max-w-4.5 min-h-4.5 max-h-4.5">
                        {banner.loading ? (
                          <div className="absolute opacity-100 top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 z-40">
                            {/* Loader */}
                            <Loading color="bg-black ring-black opacity-100" />
                          </div>
                        ) : (
                          <div
                            className="w-full h-full bg-cover bg-center opacity-100 rounded-lg absolute top-0 left-0 z-10"
                            style={{
                              backgroundImage: `url(${banner.file})`,
                            }}
                          ></div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="mb-2 font-base font-semibold truncate">
                          Banner Image
                        </div>
                        {banner.loading ? (
                          <div className="text-black font-noraml font-base">
                            Uploading...
                          </div>
                        ) : (
                          <div
                            className="text-gray-500 font-noraml font-base cursor-pointer"
                            onClick={removeBanner}
                          >
                            Delete
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex border border-dashed	border-gray-300	rounded-md min-h-7 h-7.188 items-center cursor-pointer outline:none min-w-0"
                      onClick={() => bannerRef.current.click()}
                    >
                      <input
                        type="file"
                        name="banner"
                        ref={bannerRef}
                        className="hidden"
                        onChange={bannerChangeHandler}
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/svg+xml"
                      />
                      <div className="text-center leading-snug max-w-11.25 mx-auto font-base font-normal w-11.25">
                        Drag and drop an image here, or click to browse.
                      </div>
                    </div>
                  )}
                </div>

                <div className="">
                  <h2 className="mb-6 text-2xl font-semibold w-15 max-w-15">
                    Link social media profile.
                  </h2>
                  <div className="grid gap-5">
                    <div className="grid gap-0 items-center bg-gray-200 rounded-md border-gray-300 md:grid-cols-2sm sm:grid-cols-1sm">
                      <div className="flex items-center p-4">
                        <div className="flex items-center">
                          <div className="mr-2 ">
                            <UrlIcon
                              className="text-black fill-current"
                              width="20"
                              height="20"
                            />
                          </div>
                          <div className="font-semibold font-lg">Website</div>
                        </div>
                        {/* <div className="text-gray-500 text-xs	ml-auto">
                          https://
                        </div> */}
                      </div>
                      <div className="">
                        <input
                          type="text"
                          autoComplete="off"
                          name="socials.website"
                          {...register("socials.website")}
                          className="appearance-none block w-full px-5 py-0.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:outline-none focus:ring-black focus:border-black min-h-3.75 h-3.75 outline:none shadow-text-area transition-all duration-300 ease-trans-expo"
                        />
                      </div>
                      {errors.socials?.website && (
                        <p className="text-xs leading-6 text-red-500">
                          {errors.socials.website.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-0 items-center bg-gray-200 rounded-md border-gray-300 md:grid-cols-2sm sm:grid-cols-1sm">
                      <div className="flex items-center p-4">
                        <div className="flex items-center">
                          <div className="mr-2 ">
                            <InstagramIcon
                              className="text-black fill-current"
                              width="20"
                              height="20"
                            />
                          </div>
                          <div className="font-semibold font-lg">Instagram</div>
                        </div>
                        {/* <div className="text-gray-500 text-xs	ml-auto">
                          https://
                        </div> */}
                      </div>
                      <div className="">
                        <input
                          type="text"
                          autoComplete="off"
                          name="socials.instagram"
                          {...register("socials.instagram")}
                          className="appearance-none block w-full px-5 py-0.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:outline-none focus:ring-black focus:border-black min-h-3.75 h-3.75 outline:none shadow-text-area transition-all duration-300 ease-trans-expo"
                        />
                      </div>
                      {errors.socials?.instagram && (
                        <p className="text-xs leading-6 text-red-500">
                          {errors.socials.instagram.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-0 items-center bg-gray-200 rounded-md border-gray-300 md:grid-cols-2sm sm:grid-cols-1sm">
                      <div className="flex items-center p-4">
                        <div className="flex items-center">
                          <div className="mr-2 ">
                            <TwitterIcon
                              className="text-black fill-current"
                              width="20"
                              height="20"
                            />
                          </div>
                          <div className="font-semibold font-lg">Twitter</div>
                        </div>
                        {/* <div className="text-gray-500 text-xs	ml-auto">
                          https://
                        </div> */}
                      </div>
                      <div className="">
                        <input
                          type="text"
                          autoComplete="off"
                          name="socials.twitter"
                          {...register("socials.twitter")}
                          className="appearance-none block w-full px-5 py-0.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:outline-none focus:ring-black focus:border-black min-h-3.75 h-3.75 outline:none shadow-text-area transition-all duration-300 ease-trans-expo"
                        />
                      </div>
                      {errors.socials?.twitter && (
                        <p className="text-xs leading-6 text-red-500">
                          {errors.socials.twitter.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-auto pt-6">
                <Button
                  text={SAVE}
                  type="submit"
                  disabled={showLoader}
                  isSubmitting={showLoader}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    showLoader ? "opacity-50 cursor-default" : ""
                  }`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterDetails;
