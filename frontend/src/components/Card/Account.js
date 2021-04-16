import Avatar from "../Avatar";

const MAX_ADDR_LEN = 6;

export const Account = (props) => {
  const { account } = props;
  const _username = account.user ? account.user.username : null;
  const _address = account.address;
  const displayName = _username
    ? _username
    : _address.substring(2, MAX_ADDR_LEN + 2).toUpperCase();
  return (
    <>
      <Avatar width={30} source={account.profile_img_url} />{" "}
      <span>@{displayName}</span>
    </>
  );
};

export default Account;
