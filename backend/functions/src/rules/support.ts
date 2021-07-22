export default () => {
    return {
      email: 'required|email',
      message: 'required|min:20',
      fullname: 'required|max:50',
    }
  }
  