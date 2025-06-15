import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import axios from 'axios';

import './DeleteModal.css'

function DeleteModal({ modalOpen, handleClose, documentID }) {

    // delete recipe
    const processRemoveRecipe = () => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3456/RecipeRoutes/removerecipe', { documentID: documentID });
        console.log("axios delete")
        handleClose();
        window.location.reload();
        // axios.post('http://localhost:3456/UserRoutes/signup', testMessage ).then( result => console.log(result) );
    }

    return (
        <>
            <div>
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    aria-labelledby="delete-modal-title"
                    aria-describedby="delete-modal-description"
                >
                    <Box className='deleteRecipeModal'>
                        <form>
                            <div className='deleteRecipeForm'>
                                <p>Are you sure? (if not, click outside of the modal to exit)</p>
                                <Button
                                    color='secondary'
                                    id="delete-recipe-button"
                                    variant="contained"
                                    onClick={ processRemoveRecipe }
                                > Yes </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default DeleteModal;