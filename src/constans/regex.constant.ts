const regexConstant = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
  EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
  PHONE: /^(\\+?38)?(0[5-9][0-9]{8}|[1-9][0-9]{8})$/,
};

export { regexConstant };
