export default () => {
  return {
    email: 'required|email',
    password: 'required|min:6',
    fullname: 'required|max:50',
    token: 'required|valid_token'
  }
}
