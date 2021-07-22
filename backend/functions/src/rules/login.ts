export default () => {
  return {
    email: 'required|email',
    password: 'required|min:6'
  }
}
