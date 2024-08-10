const Button = (theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          borderRadius: "10px"
        },
      },
    },
  };
};

export default Button;
