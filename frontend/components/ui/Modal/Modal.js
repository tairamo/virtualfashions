import { MODAL_WRONG_NETWORK } from "../../../constants";
import { ReactComponent as CloseIcon } from "../../../public/icons/times-circle.svg";

export const Modal = ({
  show,
  title,
  children,
  showModal,
  closeButton,
  modalType,
}) => {
  return show ? (
    <div>
      <div className="fixed text-gray-700 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-70 left-0 right-0 top-0 bottom-0">
        <div
          className={`bg-white rounded-xl shadow-2xl p-4 mx-10 relative ${
            modalType === MODAL_WRONG_NETWORK ? "w-auto" : "dl:w-1/2"
          }`}
        >
          {closeButton && (
            <CloseIcon
              className="absolute top-2 right-2 fill-current cursor-pointer"
              width="25"
              height="25"
              onClick={() => showModal()}
            />
          )}
          {title && (
            <span className="font-bold block text-2xl mb-3">{title}</span>
          )}
          {children}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
