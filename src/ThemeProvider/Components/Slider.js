const Slider = (theme) => {
    return {
      MuiSlider: {
        styleOverrides: {
          root: {
            padding: 0,
            "& .MuiSlider-rail": {
                backgroundColor: "grey",
                height: 3
            },
            "& .MuiSlider-thumb": {
                backgroundColor: "white",
            },
            "& .MuiSlider-track": {
                backgroundColor: "white",
                height: 3
            },
          },
        },
      },
    };
  };
  
  export default Slider;
  