const Select = (theme) => {
    return {
      MuiSelect: {
        styleOverrides: {
          root: {
            width: "fit-content",
            padding: "5px 10px",
            "& .MuiSelect-select": {
                padding: 0,
                paddingRight: 32,
                "& p": {
                    color: "white",
                    "& span": {
                        marginLeft: 10,
                        color: "#9BA6AB",
                    }
                }
            },
            "& fieldset": {
                padding: 0,
                borderColor: "white !important",
                borderRadius: 10
            },
            "& svg": {
                color: "white"
            }
          },
        },
      },
    };
  };
  
  export default Select;
  