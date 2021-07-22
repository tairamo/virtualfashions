import { Modal } from "../ui/Modal";
import { ListToken } from "./ListToken";
import Curtain from "../loading/curtain";
import { WrongNetwork } from "./WrongNetwork";
import { useModal } from "../../context/Modal";
import {
  MODAL_AGE_VERIFICATION,
  MODAL_LIST_TOKEN,
  MODAL_WRONG_NETWORK,
} from "../../constants";

export const Modals = () => {
  const { modal, showModal } = useModal();

  return (
    <Modal
      show={!!modal?.name}
      title={modal?.title}
      showModal={showModal}
      modalType={modal?.name}
      closeButton={modal?.showCloseBtn}
    >
      {modal?.name === MODAL_LIST_TOKEN && (
        <ListToken modal={modal} showModal={showModal} />
      )}

      {modal?.name === MODAL_AGE_VERIFICATION && (
        <Curtain modal={modal} showModal={showModal} />
      )}

      {modal?.name === MODAL_WRONG_NETWORK && <WrongNetwork />}
    </Modal>
  );
};
