const Button = (theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          borderRadius: "10px",
          padding: "5px 8px",
          textTransform: "capitalize",
          boxShadow: "none",
          "&:hover" : {
            boxShadow: "none"
          },
          "&.MuiButton-containedPrimary": {
            color: "white",
            backgroundColor: "#7C36D6",
            "&.Mui-disabled": {
              opacity: "50%",
            }
          },
          "&.MuiButton-containedSecondary": {
            color: "white",
            backgroundColor: "#45474E",
            "&.Mui-disabled": {
              opacity: "50%",
            }
          },
          "&.MuiButton-containedSuccess": {
            color: "white",
            backgroundColor: "#37393F",
            "&.Mui-disabled": {
              opacity: "50%",
            }
          }
        },
      },
    },
  };
};

export default Button;
