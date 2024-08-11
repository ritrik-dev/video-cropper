const IconButton = (theme) => {
    return {
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 0,
            "& svg": {
                color: "white"
            }
          },
        },
      },
    };
  };
  
  export default IconButton;
  