import RecipeModal from './RecipeModal.jsx'
import RecipeDisplay from './RecipeDisplay.jsx'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'

import './home.css'

// let initial 
let initialLoad = { react: true, router: true };

function Home() {

    const [ recipes, setRecipes ] = useState([]);

    // for pulling recipe info

    useEffect(function () {

        if (initialLoad.react == true) {

            initialLoad.react = false;

        } else if (initialLoad.router == true) {

            axios.post('http://localhost:3456/RecipeRoutes/getrecipes').then((result) => {
                setRecipes(result.data);
                console.log("Axios called");
                initialLoad = false;
                return;
            });

            initialLoad.router = false;

        } else {

            console.log("Use effect called");

        }

    }, []);

    return (
        <>
            <div className='homeLayout'>
                <div className='displayRecipes'>
                    {/* display of recipes */}
                    {/* iterate with map */}
                    {recipes.map(recipe => <RecipeDisplay key={recipe._id} recipe={recipe} />)}
                </div>
                <div className='addNewRecipe'>
                    {/* this contains the fab which opens up the modal */}
                    <RecipeModal />
                </div>
            </div>
        </>
    )
}

export default Home;