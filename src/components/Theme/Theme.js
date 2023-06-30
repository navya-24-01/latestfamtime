import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#61A5C2",
    },

    secondary: {
      main: "#293241",
    },
  },

  typography: {
    fontFamily: ["Boogaloo", "Cookie", "Padauk"].join(","),
  },
});
