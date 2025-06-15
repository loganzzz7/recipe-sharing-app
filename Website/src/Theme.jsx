import { createTheme } from '@mui/material/styles';
import { red, pink } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: red[700],
        },

        secondary: {
            main: pink[500],
        },

        background: {
            white: '#FFFFFF',
        }
    },

    typography: {
        "fontFamily": `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`,
        "fontSize": 14,
    },

    
});

export default theme;