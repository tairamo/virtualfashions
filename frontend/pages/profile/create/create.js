import firebase from "firebase/app";
import "firebase/storage";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRouter } from "next/router";
import uuidv4 from "../../../utils/uuid";
import { useETH } from "../../../context/ETH";
import { useAuth } from "../../../utils/auth";
import Web3Instance from "../../../utils/web3";
import { schema } from "../../../schema/create";
import Layout from "../../../components/layout";
import { Button } from "../../../components/ui/Button";
import { Loader } from "../../../components/ui/Loader";
import { Video } from "../../../components/widget/video";
import { Image } from "../../../components/widget/image";
import Loading from "../../../components/loading/Spinner";
import { ErrorMsg } from "../../../components/alerts/error";
import TokenService from "../../../services/api/TokenService";
import { fileValidation } from "../../../utils/fileValidation";
import { Spinner } from "../../../components/ui/Spinner/Spinner";
import { SuccessMsg } from "../../../components/alerts/success";
import {
  TOKEN,
  CREATE_ART,
  CONFIRMATION,
  WALLET_ERROR,
  CHAINID_ERROR,
  MINTING_ERROR,
  FILE_UPLOAD_ERROR,
  TOKEN_CREATED_SUCCESS,
} from "../../../constants";

const web3 = new Web3Instance();

function Create(props) {
  const router = useRouter();
  const artRef = useRef(null);
  const thumbnailRef = useRef(null);
  const { user, loading } = useAuth();
  const { ETHAccount, chainId } = useETH();
  const storageRef = firebase.storage().ref();

  // State
  const [text, setText] = useState("");
  const [tokenId, setTokenId] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [isArtVideoLoaded, setIsArtVideoLoaded] = useState(false);
  const [isThumbVideoLoaded, setIsThumbVideoLoaded] = useState(false);
  const [art, setArt] = useState({
    file: null,
    loading: false,
    contentType: null,
  });
  const [thumbnail, setThumbnail] = useState({
    file: null,
    loading: false,
    contentType: null,
  });

  // Use react hook form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Form submit handler function
  const submitHanlder = async (values) => {
    try {
      if (!ETHAccount) throw new Error(WALLET_ERROR);
      if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID)
        throw new Error(CHAINID_ERROR);

      // Set show loader
      setShowLoader(true);

      const { file, title, about, thumbnail } = values;

      // Create token
      const tokenData = {
        title: title,
        about: about,
        url: file.url,
        thumbnailUrl: thumbnail.url,
        contentType: file.contentType,
        thumbnailContentType: thumbnail.contentType,
      };

      const { data: token } = await TokenService.createToken(tokenData);

      const tokenURI = `${process.env.NEXT_PUBLIC_API_URL}/tokens/${token._id}/metadata`;

      // Mint token
      const data = await web3.mintToken(ETHAccount, tokenURI);
      const tokenId = data.events.Transfer.returnValues.tokenId;
      const txId = data.transactionHash;

      const chainInfo = {
        txId,
        id: tokenId,
        tokenURI,
      };

      // Update token chain info
      await TokenService.updateToken(token._id, {
        chainInfo,
      });

      // Set show loader
      setShowLoader(false);

      // Show toast notification
      toast.success(<SuccessMsg msg={TOKEN_CREATED_SUCCESS} />);

      // Redirect to profile page
      router.push(`/${user.username}`);
    } catch (err) {
      console.log(err);

      let errMsg = "";
      switch (err.message) {
        case WALLET_ERROR:
          errMsg = WALLET_ERROR;
          break;
        case CHAINID_ERROR:
          errMsg = CHAINID_ERROR;
          break;
        default:
          errMsg = MINTING_ERROR;
          break;
      }

      // Show error toast notification
      toast.error(<ErrorMsg msg={errMsg} />);

      // Set show loader
      setShowLoader(false);

      // Redirect to profile page
      router.push(`/${user.username}`);
    }
  };

  // Art change handler function
  const artChangeHandler = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // File validation
      fileValidation(file);

      // Set art state
      setArt({ file: file.name, loading: true, contentType: file.type });

      // Upload file to storage
      const artUploadTask = await storageRef
        .child("token")
        .child(user._id)
        .child(tokenId)
        .child("asset")
        .put(file);

      const artUrl = await artUploadTask.ref.getDownloadURL();

      // Set artUrl
      setArt({ file: artUrl, loading: false, contentType: file.type });

      // Set file value into form
      setValue(
        "file",
        { url: artUrl, contentType: file.type },
        { shouldValidate: true }
      );
    } catch (err) {
      console.log(err);

      // Remove ref value
      artRef.current.value = "";

      // Show error
      toast.error(<ErrorMsg msg={FILE_UPLOAD_ERROR} />);
    }
  };

  // Thumbnail change handler function
  const thumbnailChangeHandler = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // File validation
      fileValidation(file);

      // Set thumbnail state
      setThumbnail({ file: file.name, loading: true, contentType: file.type });

      // Upload file to storage
      const thumbnailUploadTask = await storageRef
        .child("token")
        .child(user._id)
        .child(tokenId)
        .child("thumbnail")
        .put(file);

      const thumbnailUrl = await thumbnailUploadTask.ref.getDownloadURL();

      // Set thumbnailUrl
      setThumbnail({
        file: thumbnailUrl,
        loading: false,
        contentType: file.type,
      });

      // Set thumbnail value into form
      setValue(
        "thumbnail",
        { url: thumbnailUrl, contentType: file.type },
        { shouldValidate: true }
      );
    } catch (err) {
      console.log(err);

      // Remove ref value
      thumbnailRef.current.value = "";

      // Show error
      toast.error(<ErrorMsg msg={FILE_UPLOAD_ERROR} />);
    }
  };

  // Remove art
  const removeArt = async () => {
    try {
      // Set art state
      setArt({ file: null, loading: false });

      // Set value
      setValue("file", { url: "", contentType: "" }, { shouldValidate: true });

      const artFileRef = storageRef
        .child("token")
        .child(user._id)
        .child(tokenId)
        .child("asset");

      // Delete file
      await artFileRef.delete();
    } catch (err) {
      console.log(err);
    }
  };

  // Remove thumbnail
  const removeThumbnail = async () => {
    try {
      // Set thumbnail state
      setThumbnail({ file: null, loading: false });

      // Set value
      setValue(
        "thumbnail",
        { url: "", contentType: "" },
        { shouldValidate: true }
      );

      const thumbnailFileRef = storageRef
        .child("token")
        .child(user._id)
        .child(tokenId)
        .child("thumbnail");

      // Delete file
      await thumbnailFileRef.delete();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const tokenId = uuidv4();

    // Set token id state
    setTokenId(tokenId);
  }, []);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (!loading && !user) {
    router.push("/login");
    return LoaderComponent;
  }

  let isDisabled = false;
  let buttonText = CREATE_ART;
  if (!ETHAccount) {
    buttonText = WALLET_ERROR;
    isDisabled = true;
  } else if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
    buttonText = CHAINID_ERROR;
    isDisabled = true;
  }

  let artFile = (
    <Image
      bgImage
      url={art.file}
      className="w-full h-full bg-cover bg-center opacity-100 rounded-lg absolute top-0 left-0 z-10"
    />
  );

  if (art.contentType?.includes("video")) {
    artFile = !isArtVideoLoaded ? (
      <div className="flex justify-center w-full">
        <div className="flex relative">
          <Video
            url={art.file}
            onLoadedData={() => setIsArtVideoLoaded(true)}
            className={`w-full h-full bg-cover bg-center opacity-100 rounded-lg absolute top-0 left-0 z-10 bg-gray-300 object-cover ${
              !isArtVideoLoaded && "filter blur drop-shadow-02020"
            }`}
          />

          <div className="opacity-100">
            <div className="absolute transform -translate-y-1/2 -translate-x-1/2 left-2/4 top-2/4">
              <Spinner color="text-black" />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Video
        url={art.file}
        onLoadedData={() => setIsArtVideoLoaded(true)}
        className={`w-full h-full bg-cover bg-center opacity-100 rounded-lg absolute top-0 left-0 z-10 bg-gray-300 object-cover ${
          !isArtVideoLoaded && "filter blur drop-shadow-02020"
        }`}
      />
    );
  }

  let thumbFile = (
    <Image
      bgImage
      url={thumbnail.file}
      className="w-full h-full bg-cover bg-center opacity-100 rounded-lg absolute top-0 left-0 z-10"
    />
  );

  if (thumbnail.contentType?.includes("video")) {
    thumbFile = !isThumbVideoLoaded ? (
      <div className="flex justify-center w-full">
        <div className="flex relative">
          <Video
            url={thumbnail.file}
            onLoadedData={() => setIsThumbVideoLoaded(true)}
            className={`w-full h-full bg-cover bg-center opacity-100 rounded-lg absolute top-0 left-0 z-10 bg-gray-300 object-cover ${
              !isThumbVideoLoaded && "filter blur drop-shadow-02020"
            }`}
          />

          <div className="opacity-100">
            <div className="absolute transform -translate-y-1/2 -translate-x-1/2 left-2/4 top-2/4">
              <Spinner color="text-black" />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Video
        url={thumbnail.file}
        onLoadedData={() => setIsThumbVideoLoaded(true)}
        className={`w-full h-full bg-cover bg-center opacity-100 rounded-lg absolute top-0 left-0 z-10 bg-gray-300 object-cover ${
          !isThumbVideoLoaded && "filter blur drop-shadow-02020"
        }`}
      />
    );
  }

  return (
    <Layout>
      <div>
        <h2 className="sm:pt-8 sm:text-4xl md:pt-16 md:text-5xl lg:pt-24 mx-auto max-w-46.25 text-center text-3xl font-semibold tracking-tight">
          Create Art
        </h2>
        <div className="sm:py-8 md:py-16 md:px-12 lg:py-24 grid gap-6 py-6">
          <div className="sm:px-8 md:px-12 md:py-8 md:mx-auto md:w-full lg:py-12 block p-6 shadow-3xl bg-white rounded-2xl no-underline max-w-46.25">
            <form onSubmit={handleSubmit(submitHanlder)}>
              <div className="grid gap-8">
                <div className="grid md:gap-16 md:grid-cols-250">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold">
                      Enter art details.
                    </h2>
                  </div>

                  <div className="mb-2.5 min-w-0">
                    <div className="relative">
                      <div className="font-normal top-2.5 left-5 text-0.625 pointer-events-none absolute	opacity-100	transform translate-y-px transition-all ease-trans-expo">
                        Title
                      </div>
                      <input
                        type="text"
                        autoComplete="off"
                        {...register("title")}
                        className="appearance-none block w-full px-5 pb-0.5 pt-4 border outline-none border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black min-h-3.75 h-3.75 outline:none shadow-text-area transition-all duration-300 ease-trans-expo"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-xs leading-6 text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:gap-16 md:grid-cols-250">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold">
                      Add description.
                    </h2>
                  </div>
                  <div className="mb-2.5 min-w-0">
                    <div className="relative">
                      <div
                        className={`font-normal top-2.5 left-5 text-0.625 pointer-events-none absolute transform translate-y-px transition-all ease-trans-expo ${
                          text.length > 0 ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        Description
                      </div>
                      <textarea
                        rows="10"
                        id="about"
                        {...register("about")}
                        placeholder="Description"
                        className="focus:ring-black focus:border-black border-gray-300 rounded-md resize-none block w-full leading-normal appearance: none bg-white px-5 py-6 rounded-md outline-none focus:outline-none shadow-text-area transition-all duration-300 ease-trans-expo"
                        onChange={(e) => {
                          const value = e.target.value;

                          // Set text state
                          setText(value);

                          // Set value
                          setValue("about", value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                    </div>
                    {errors.about && (
                      <p className="text-xs leading-6 text-red-500">
                        {errors.about.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:gap-16 md:grid-cols-250">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold">Upload art.</h2>
                    <div className="mb-4 font-base font-normal leading-relaxed">
                      Recommended size:
                      <br />
                      1500x1500px.
                      <br />
                      JPG, PNG, GIF or MP4.
                      <br />
                      20MB max size.
                    </div>
                  </div>

                  {art.file ? (
                    <div className="flex items-center p-5 min-h-7.188 bg-white rounded-md shadow-ho3xl h-7.188 min-w-0">
                      <div className="mr-6 flex relative min-w-4.5 max-w-4.5 min-h-4.5 max-h-4.5">
                        {art.loading ? (
                          <div className="absolute opacity-100 top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 z-40">
                            <Loading color="bg-black ring-black opacity-100" />
                          </div>
                        ) : (
                          artFile
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="mb-2 font-base font-semibold truncate">
                          Art
                        </div>
                        {art.loading ? (
                          <div className="text-black font-noraml font-base">
                            Uploading...
                          </div>
                        ) : (
                          <div
                            className="text-gray-500 font-noraml font-base cursor-pointer"
                            onClick={removeArt}
                          >
                            Delete
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="flex border border-dashed	border-gray-300	rounded-md min-h-7 h-7.188 items-center cursor-pointer outline:none min-w-0"
                        onClick={() => artRef.current.click()}
                      >
                        <input
                          type="file"
                          name="file"
                          ref={artRef}
                          className="hidden"
                          onChange={artChangeHandler}
                          accept="image/jpeg, image/jpg, image/png, image/gif, image/svg+xml, video/mp4"
                        />
                        <div className="text-center leading-snug max-w-11.25 mx-auto font-base font-normal w-11.25">
                          Drag and drop an image here, or click to browse.
                        </div>
                      </div>
                      {errors.file?.url && (
                        <p className="text-xs leading-6 text-red-500">
                          {errors.file?.url.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid md:gap-16 md:grid-cols-250">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold">
                      Upload thumbnail/preview.
                    </h2>
                    <div className="mb-4 font-base font-normal leading-relaxed">
                      Recommended size:
                      <br />
                      1500x1500px.
                      <br />
                      JPG, PNG, GIF or MP4.
                      <br />
                      20MB max size.
                    </div>
                  </div>

                  {thumbnail.file ? (
                    <div className="flex items-center p-5 min-h-7.188 bg-white rounded-md shadow-ho3xl h-7.188 min-w-0">
                      <div className="mr-6 flex relative min-w-4.5 max-w-4.5 min-h-4.5 max-h-4.5">
                        {thumbnail.loading ? (
                          <div className="absolute opacity-100 top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 z-40">
                            <Loading color="bg-black ring-black opacity-100" />
                          </div>
                        ) : (
                          thumbFile
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="mb-2 font-base font-semibold truncate">
                          Thumbnail/Preview
                        </div>
                        {thumbnail.loading ? (
                          <div className="text-black font-noraml font-base">
                            Uploading...
                          </div>
                        ) : (
                          <div
                            className="text-gray-500 font-noraml font-base cursor-pointer"
                            onClick={removeThumbnail}
                          >
                            Delete
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="flex border border-dashed	border-gray-300	rounded-md min-h-7 h-7.188 items-center cursor-pointer outline:none min-w-0"
                        onClick={() => thumbnailRef.current.click()}
                      >
                        <input
                          type="file"
                          name="thumbnail"
                          className="hidden"
                          ref={thumbnailRef}
                          onChange={thumbnailChangeHandler}
                          accept="image/jpeg, image/jpg, image/png, image/gif, image/svg+xml, video/mp4"
                        />
                        <div className="text-center leading-snug max-w-11.25 mx-auto font-base font-normal w-11.25">
                          Drag and drop an image here, or click to browse.
                        </div>
                      </div>
                      {errors.thumbnail?.url && (
                        <p className="text-xs leading-6 text-red-500">
                          {errors.thumbnail?.url.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-auto pt-6">
                <Button
                  type="submit"
                  text={buttonText}
                  isSubmitting={showLoader}
                  submittingText={CONFIRMATION}
                  disabled={showLoader || isDisabled}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    showLoader || isDisabled ? "opacity-50 cursor-default" : ""
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

export default Create;
