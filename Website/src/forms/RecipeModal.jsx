import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import PublishIcon from '@mui/icons-material/Publish';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import useMediaQuery from '@mui/material/useMediaQuery';
import { visuallyHidden } from '@mui/utils';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheatAwn, faWheatAwnCircleExclamation, faMartiniGlassEmpty, faMartiniGlass, faCow, faSeedling } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import { useState, useEffect, useContext } from "react";
import UserContext from '../Context';
import './RecipeModal.css'

let initialLoad = {
    react: { name: true, ingredients: true, instructions: true, cuisine: true, cooktime: true },
    router: { name: true, ingredients: true, instructions: true, cuisine: true, cooktime: true }
};

function RecipeModal() {

    const [user, setUser] = useContext(UserContext);

    // modal
    const [modalOpen, setModalState] = useState(false);
    const handleOpen = () => setModalState(true);
    const handleClose = () => setModalState(false);

    // checkboxes
    const glutenCheckboxLabel = { inputProps: { 'aria-label': 'glutenCheckbox' } };
    const alcoholicCheckboxLabel = { inputProps: { 'aria-label': 'alcoholicCheckbox' } };
    const vegetarianCheckboxLabel = { inputProps: { 'aria-label': 'vegetarianCheckbox' } };

    const emptyRecipe = {
        name: '',
        author: user,
        ingredients: '',
        instructions: '',
        tags: { gluten: false, alcoholic: false, vegetarian: false },
        cuisine: '',
        cookTime: '',
        imageBinary: '',
        comments: []
    };

    const emptyMessages = {
        name: '',
        ingredients: '',
        instructions: '',
        cuisine: '',
        cookTime: '',
    }

    const emptyReady = {
        name: false,
        ingredients: false,
        instructions: false,
        cuisine: false,
        cookTime: false,
    }

    // recipe info
    const [recipe, setRecipe] = useState(emptyRecipe);

    const [attempt, setAttempt] = useState(emptyRecipe);
    const [message, setMessage] = useState(emptyMessages);
    const [ready, setReady] = useState(emptyReady);

    // name
    useEffect(function () {

        if (initialLoad.react.name == true) {
            initialLoad.react.name = false;
        } else if (initialLoad.router.name == true) {
            initialLoad.router.name = false;
        } else {

            if (attempt.name == '') {
                setMessage({ ...message, name: 'Enter a name for your recipe!' });
                setReady({ ...ready, name: false });
                return;
            }

            setMessage({ ...message, name: '' });
            setReady({ ...ready, name: true });
            
        }

    }, [ attempt.name ]);

    // ingredients
    useEffect(function () {

        if (initialLoad.react.ingredients == true) {
            initialLoad.react.ingredients = false;
        } else if (initialLoad.router.ingredients == true) {
            initialLoad.router.ingredients = false;
        } else {

            if (attempt.ingredients == '') {
                setMessage({ ...message, ingredients: 'Enter the ingredients for your recipe!' });
                setReady({ ...ready, ingredients: false });
                return;
            }

            setMessage({ ...message, ingredients: '' });
            setReady({ ...ready, ingredients: true });
            
        }

    }, [ attempt.ingredients ]);

    // instructions
    useEffect(function () {

        if (initialLoad.react.instructions == true) {
            initialLoad.react.instructions = false;
        } else if (initialLoad.router.instructions == true) {
            initialLoad.router.instructions = false;
        } else {

            if (attempt.instructions == '') {
                setMessage({ ...message, instructions: 'Enter the instructions for your recipe!' });
                setReady({ ...ready, instructions: false });
                return;
            }

            setMessage({ ...message, instructions: '' });
            setReady({ ...ready, instructions: true });
            
        }

    }, [ attempt.instructions ]);

    // cuisine
    useEffect(function () {

        if (initialLoad.react.cuisine == true) {
            initialLoad.react.cuisine = false;
        } else if (initialLoad.router.cuisine == true) {
            initialLoad.router.cuisine = false;
        } else {

            if (attempt.cuisine == '') {
                setMessage({ ...message, cuisine: 'Enter a cuisine for your recipe!' });
                setReady({ ...ready, cuisine: false });
                return;
            }

            setMessage({ ...message, cuisine: '' });
            setReady({ ...ready, cuisine: true });
            
        }

    }, [ attempt.cuisine ]);
    
    // cooktime
    useEffect(function () {

        if (initialLoad.react.cookTime == true) {
            initialLoad.react.cookTime = false;
        } else if (initialLoad.router.cookTime == true) {
            initialLoad.router.cookTime = false;
        } else {

            if (attempt.cookTime == '') {
                setMessage({ ...message, cookTime: 'Enter a cook time for your recipe!' });
                setReady({ ...ready, cookTime: false });
                return;
            }

            setMessage({ ...message, cookTime: '' });
            setReady({ ...ready, cookTime: true });
            
        }

    }, [ attempt.cookTime ]);

    // handles to get data
    const handleName = (e) => { setAttempt({ ...attempt, name: e.target.value }); }
    const handleIngredients = (e) => { setAttempt({ ...attempt, ingredients: e.target.value }); }
    const handleInstructions = (e) => { setAttempt({ ...attempt, instructions: e.target.value }); }
    const handleGluten = (e) => { setAttempt({ ...attempt, tags: { ...attempt.tags, gluten: e.target.checked } }); }
    const handleAlcohol = (e) => { setAttempt({ ...attempt, tags: { ...attempt.tags, alcoholic: e.target.checked } }); }
    const handleVegetarian = (e) => { setAttempt({ ...attempt, tags: { ...attempt.tags, vegetarian: e.target.checked } }); }
    const handleCuisine = (e) => { setAttempt({ ...attempt, cuisine: e.target.value }); }
    const handleCookTime = (e) => { setAttempt({ ...attempt, cookTime: e.target.value }); }
    const handleImageBinary = (e) => { setAttempt({ ...attempt, imageBinary: e }); }

    const processAddRecipe = () => {

        const request = {
            name: attempt.name,
            author: user,
            ingredients: attempt.ingredients,
            instructions: attempt.instructions,
            tags: { gluten: attempt.tags.gluten, alcoholic: attempt.tags.alcoholic, vegetarian: attempt.tags.vegetarian },
            cuisine: attempt.cuisine,
            cookTime: attempt.cookTime,
            imageBinary: attempt.imageBinary,
            comments: []
        };

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3456/RecipeRoutes/addrecipe', request).then((result) => {
            console.log(result.data);
            // Close the modal
            setModalState(false);
            window.location.reload();
        });
        // axios.post('http://localhost:3456/UserRoutes/signup', testMessage ).then( result => console.log(result) );
    };

    // image upload
    const [imageUploaded, setImageUploaded] = useState("");

    // from https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f 
    function convertImageToBinary(file) {
        // test to see file before conversion
        console.log(file);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file.target.files[0]);
        fileReader.onload = () => {
            console.log(fileReader.result);
            setImageUploaded(fileReader.result); // displaying image back from binary setting state imageUploaded
            handleImageBinary(fileReader.result);
        };
        fileReader.onerror = (error) => {
            console.log('img conversion error: ', error);
        };
    }

    // mui button for upload: https://mui.com/material-ui/react-button/
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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

    // media query
    const matches = useMediaQuery('(max-width: 450px)');


    return (
        <>
            <div className='addNewRecipeFAB'>
                {/* userloggedin == true ? show fab : "" */}
                {/* modal code: https://mui.com/material-ui/react-modal/ */}
                {(user == '') ? '' : (<Fab color="secondary" aria-label="add" onClick={handleOpen}><AddIcon /></Fab>)}
            </div>
            <div>
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    aria-labelledby="recipe-modal-title"
                    aria-describedby="recipe-modal-description"
                >
                    <Box className='addNewRecipeModal'>
                        <form className='modalHeaderAndInput'>
                            <div className='modalHeader'>
                                <p> Upload a Recipe: </p>
                            </div>
                            <div className='recipeModalInput'>
                                <TextField
                                    id="recipe-modal-title"
                                    label="Name of Recipe:"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    // name='name'
                                    onChange={ (e) => handleName(e) }
                                    helperText={ message.name }
                                />
                                <TextField
                                    id="recipe-modal-ingredients"
                                    label="Ingredients for Recipe:"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    // name='ingredients'
                                    onChange={ (e) => handleIngredients(e) }
                                    helperText={ message.ingredients }
                                />
                                <TextField
                                    id="recipe-modal-cook-guide"
                                    label="Cook Guide for Recipe:"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    required
                                    inputProps={{
                                        style: { maxHeight: '310px', overflow: 'auto' } // overflow for textbox
                                    }}
                                    fullWidth
                                    // name='instructions'
                                    onChange={ (e) => handleInstructions(e) }
                                    helperText={ message.instructions }
                                />
                                <div className='labelImageUpload'>
                                    <div className='recipeHealthLabels'>
                                        <div className='recipeHealthLabelsHeader'>
                                            <p> Labels: </p>
                                        </div>
                                        <div className='recipeHealthLabelsChecks'>
                                            <Checkbox
                                                {...glutenCheckboxLabel}
                                                icon={<FontAwesomeIcon icon={faWheatAwn} />}
                                                checkedIcon={<FontAwesomeIcon icon={faWheatAwnCircleExclamation} />}
                                                checked={attempt.tags.gluten}
                                                onChange={(e) => handleGluten(e)}
                                            // onChange={() => console.log("glutenCheckbox Checked")}
                                            />
                                            <Checkbox
                                                {...alcoholicCheckboxLabel}
                                                icon={<FontAwesomeIcon icon={faMartiniGlassEmpty} />}
                                                checkedIcon={<FontAwesomeIcon icon={faMartiniGlass} />}
                                                checked={attempt.tags.alcoholic}
                                                onChange={(e) => handleAlcohol(e)}
                                            // onChange={() => console.log("alcoholCheckbox Checked")}
                                            />
                                            <Checkbox
                                                {...vegetarianCheckboxLabel}
                                                icon={<FontAwesomeIcon icon={faCow} />}
                                                checkedIcon={<FontAwesomeIcon icon={faSeedling} />}
                                                checked={attempt.tags.vegetarian}
                                                onChange={(e) => handleVegetarian(e)}
                                            // onChange={() => console.log("vegetarianCheckbox Checked")}
                                            />
                                        </div>
                                    </div>
                                    <div className='recipeImages'>
                                        {/* <Input type='file' accept="image/" onChange={convertImageToBinary} /> */}
                                        <Button color='secondary' id="attach-image-button"
                                            component="label" variant="contained" startIcon={<PublishIcon />} >
                                            Attach Image
                                            <Input type='file' accept="image/" sx={visuallyHidden} onChange={convertImageToBinary} />
                                        </Button>
                                    </div>
                                </div>
                                <div className='selectors'>
                                    <div className='cuisineType'>
                                        <FormControl variant="standard" sx={{ minWidth: matches ? 30 : 120 }} required >
                                            <InputLabel id="cuisine-type-label">Cuisine: </InputLabel>
                                            <Select
                                                value={cuisine} onChange={changeCuisine} label="cuisine"
                                                name="cuisine" >
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value={'American'}>American</MenuItem>
                                                <MenuItem value={'Chinese'}>Chinese</MenuItem>
                                                <MenuItem value={'Indian'}>Indian</MenuItem>
                                                <MenuItem value={'Italian'}>Italian</MenuItem>
                                                <MenuItem value={'Japanese'}>Japanese</MenuItem>
                                                <MenuItem value={'Korean'}>Korean</MenuItem>
                                                <MenuItem value={'Mexican'}>Mexican</MenuItem>
                                            </Select>
                                            <FormHelperText> {message.cuisine} </FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className='prepTime'>
                                        <FormControl variant="standard" sx={{ minWidth: matches ? 30 : 120 }} required >
                                            <InputLabel id="prepTime-select-label"> Preparation Time: </InputLabel>
                                            <Select
                                                value={prepTime} onChange={changePrepTime} label="prepTime"
                                                name="cookTime" >
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value={'30 minutes or less'}>30 minutes or less</MenuItem>
                                                <MenuItem value={'30 minutes to an hour'}>30 minutes to an hour</MenuItem>
                                                <MenuItem value={'an hour to two hours'}>an hour to two hours</MenuItem>
                                                <MenuItem value={'longer than two hours'}>longer than two hours</MenuItem>
                                            </Select>
                                            <FormHelperText> {message.cookTime} </FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className='displayImages'>
                                    {imageUploaded == '' ? 'Your Image' : <img src={imageUploaded} height={150} />}
                                </div>
                            </div>
                            <Button
                                color='secondary'
                                id="upload-recipe-button"
                                variant="contained"
                                disabled={!(ready.name && ready.ingredients && ready.instructions && ready.cuisine && ready.cookTime)}
                                onClick={ processAddRecipe }
                            > Upload </Button>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default RecipeModal;