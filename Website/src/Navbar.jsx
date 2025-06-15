import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import SearchTerms from './Terms'
import UserContext from './Context'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import theme from './Theme.jsx'
import useMediaQuery from '@mui/material/useMediaQuery';

import { styled, alpha } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Navbar.css'

// https://mui.com/material-ui/react-app-bar/ searchbar
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

function Navbar() {

    const [user, setUser] = useContext(UserContext);

    const [terms, setTerms] = useContext(SearchTerms);

    const linkNavigation = useNavigate();

    const handleWord = (e) => { setTerms({ ...terms, word: e.target.value }); }
    const handleCuisine = (e) => { setTerms({ ...terms, cuisine: e.target.value }); }
    const handleCookTime = (e) => { setTerms({ ...terms, cookTime: e.target.value }); }

    const processLogout = () => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3456/UserRoutes/logout').then(() => {
            linkNavigation('/');
            console.log('logout website');
            setUser('');
            sessionStorage.setItem('user', '');
        });
        // axios.post('http://localhost:3456/UserRoutes/signup', testMessage ).then( result => console.log(result) );
    };

    // select -- cuisine
    const [cuisine, setCuisine] = useState("");
    const changeCuisine = (event) => {
        setCuisine(event.target.value);
        handleCuisine(event);
    };

    // select -- preptime
    const [prepTime, setPrepTime] = useState("");
    const changePrepTime = (event) => {
        setPrepTime(event.target.value);
        handleCookTime(event);
    };

    const [searchWord, setSearchWord] = useState("");
    const changeSearchWord = (event) => {
        setSearchWord(event.target.value);
        handleWord(event);
    }

    const matches = useMediaQuery('(max-width: 450px)');

    return (
        // {/* https://mui.com/material-ui/react-app-bar/ */ }
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {/* matches ? 0 : */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
                            <Button color="inherit" onClick={() => linkNavigation('/')}>Home</Button>
                        </Typography>
                        { !matches && <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search for food"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={ changeSearchWord }
                                value={ searchWord }
                            />
                        </Search> }
                        <FormControl variant="standard" id="cuisineForm" sx={{ color: 'background.white', minWidth: matches ? 30 : 120 }} >
                            <InputLabel id="cuisine-type-label" sx={{ color: 'background.white' }} >Cuisine: </InputLabel>
                            <Select
                                value={cuisine} onChange={changeCuisine} label="cuisine"
                                name="cuisine" sx={{ color: 'background.white' }} >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={'American'}>American</MenuItem>
                                <MenuItem value={'Chinese'}>Chinese</MenuItem>
                                <MenuItem value={'Indian'}>Indian</MenuItem>
                                <MenuItem value={'Italian'}>Italian</MenuItem>
                                <MenuItem value={'Japanese'}>Japanese</MenuItem>
                                <MenuItem value={'Korean'}>Korean</MenuItem>
                                <MenuItem value={'Mexican'}>Mexican</MenuItem>
                            </Select>
                        </FormControl>
                        &nbsp;
                        <FormControl variant="standard" id="prepTimeForm" sx={{ color: 'background.white', minWidth: matches ? 70 : 180 }} >
                            <InputLabel id="prepTime-select-label" sx={{ color: 'background.white' }} > Preparation Time: </InputLabel>
                            <Select
                                value={prepTime} onChange={changePrepTime} label="prepTime"
                                name="cookTime" sx={{ color: 'background.white' }} >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={'30 minutes or less'}>30 minutes or less</MenuItem>
                                <MenuItem value={'30 minutes to an hour'}>30 minutes to an hour</MenuItem>
                                <MenuItem value={'an hour to two hours'}>an hour to two hours</MenuItem>
                                <MenuItem value={'longer than two hours'}>longer than two hours</MenuItem>
                            </Select>
                        </FormControl>
                        {(user != '') ? '' : (<Button color="inherit" onClick={() => linkNavigation('/login')}> Login </Button>)}
                        {(user != '') ? '' : (<Button color="inherit" onClick={() => linkNavigation('/signup')}> SignUp </Button>)}
                        {(user == '') ? '' : (<Button color="inherit" onClick={processLogout}> Logout </Button>)}
                        {(user == '') ? '' : (<p variant="body1"> {user} </p>)}
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}

export default Navbar;
