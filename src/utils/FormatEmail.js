const FormatEmail = (email) => {
  return email.replace(/[.@]/g, "");
};

export default FormatEmail;
