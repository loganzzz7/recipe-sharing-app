import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faHeart, faTrashCan, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { useContext } from 'react';
import SearchTerms from '../Terms'
import UserContext from '../Context';

import './RecipeDisplay.css'

function RecipeDisplay({ recipe }) {

    const [terms, setTerms] = useContext(SearchTerms);

    if (!recipe.name.includes(terms.word) && !recipe.ingredients.includes(terms.word) && !recipe.instructions.includes(terms.word)
        || !recipe.cuisine.includes(terms.cuisine) || !recipe.cookTime.includes(terms.cookTime)) {
        return (
            <>
            </>
        );
    }

    const imageUrlConverted = `data:image/webp;base64,${recipe.imageBinary}`;

    // open modal
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // reset checkbox
    const [editChecked, setEditChecked] = useState(false);
    const [deleteChecked, setDeleteChecked] = useState(false);

    const openEditModal = (event) => {
        setEditModalOpen(true);
        setEditChecked(true);
        event.preventDefault();
    }
    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditChecked(prev => !prev);
    }

    const openDeleteModal = (event) => {
        setDeleteModalOpen(true);
        setDeleteChecked(true);
        event.preventDefault();
    }
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeleteChecked(prev => !prev);
    }

    // checkboxes
    const likeCheckboxLabel = { inputProps: { 'aria-label': 'likeCheckbox' } };
    const editCheckboxLabel = { inputProps: { 'aria-label': 'editCheckbox' } };
    const deleteCheckboxLabel = { inputProps: { 'aria-label': 'deleteCheckbox' } };

    const user = useContext(UserContext)[0];
    const userIsAuthor = (user == recipe.author);
    // console.log(user);
    // console.log(recipe.author);

    return (
        <>
            <div className="individualPosts">
                {/* userOne */}
                <div className="userOnPost">
                    <div className="username">
                        {recipe.name}
                        {/* fetch userName */}
                    </div>
                </div>
                {/* post content */}
                <img src={imageUrlConverted} alt='fetched image' className="posts" />
                <div className="postIcons">
                    <div className="likeEditDeleteIcons">
                        {/* icons */}
                        <div>
                            {user && <Checkbox {...likeCheckboxLabel}
                                icon={<FontAwesomeIcon icon={faHeart} />}
                                checkedIcon={<FontAwesomeIcon icon={faHeart} />}
                                onChange={() => console.log("like Checked")}
                            // disabled={ !(user) }
                            />}
                        </div>
                        <div>
                            {userIsAuthor && <Checkbox
                                {...editCheckboxLabel}
                                icon={<FontAwesomeIcon icon={faPenToSquare} />}
                                checkedIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                checked={editChecked}
                                onClick={openEditModal}
                            // disabled={ !(user) }
                            />}
                            {userIsAuthor && <Checkbox
                                {...deleteCheckboxLabel}
                                icon={<FontAwesomeIcon icon={faTrashCan} />}
                                checkedIcon={<FontAwesomeIcon icon={faTrashCan} />}
                                checked={deleteChecked}
                                onClick={openDeleteModal}
                            // disabled={ !(user) }
                            />}
                        </div>
                    </div>
                    {editModalOpen && <EditModal modalOpen={editModalOpen} handleClose={closeEditModal} post={recipe} />}
                    {deleteModalOpen && <DeleteModal modalOpen={deleteModalOpen} handleClose={closeDeleteModal} documentID={recipe._id} />}
                </div>
                <div className='ingredients'>
                    Ingredients: &nbsp;{recipe.ingredients}
                    {/* fetch ingredients */}
                </div>
                <div className='cookGuide'>
                    Instructions: &nbsp;{recipe.instructions}
                    {/* fetch cookguide */}
                </div>
                <div className='cuisineAndPrepTime'>
                    Cuisine: &nbsp;{recipe.cuisine}
                    <br />
                    Preparation Time: &nbsp;{recipe.cookTime}
                    {/* fetch cookguide */}
                </div>
                <div className='tags'>
                    Gluten-free: &nbsp;{(recipe.tags.gluten == true) ? (<FontAwesomeIcon icon={faCheck} />) : (<FontAwesomeIcon icon={faX} />)}
                    &nbsp; Alcoholic: &nbsp;{(recipe.tags.alcoholic == true) ? (<FontAwesomeIcon icon={faCheck} />) : (<FontAwesomeIcon icon={faX} />)}
                    &nbsp; Vegetarian: &nbsp;{(recipe.tags.vegetarian == true) ? (<FontAwesomeIcon icon={faCheck} />) : (<FontAwesomeIcon icon={faX} />)}
                    {/* fetch tags */}
                </div>
                {/* <div className="likes">
                    (fetch likes) likes
                </div> */}
                <div className="postCaption">
                    <p><span className="postUsername"> {recipe.author} </span> {recipe.name} </p>
                </div>
                <div className="addComment">
                    <input type="text" placeholder="Add a comment..." className="commentInput" />
                    {/* icon dots for comment */}
                </div>
            </div>
        </>
    )
}

export default RecipeDisplay;
