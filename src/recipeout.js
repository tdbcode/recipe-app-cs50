import React from 'react';
import './recipeout.css'; // Import CSS for recipe tile layout

// Create new recipe tile with title, calories, image and ingredients passed from App.js
const Recipe = ({title, calories, image, ingredients}) => {

    // function to round calories from decimals to whole numbers for displaying
    const roundCalories = (calories) => {
        return Math.round(calories);
    };

    // displays the HTML code for each tile when run
    // Sets up layout with appropriate CSS classNames
    // uses the dictionary.map function to output the entire array of ingredients in a list
    return (
        <div className="Recipe">
            <div className="Recipe-title">
                <h2>{title}</h2>
                <p>Calories: {roundCalories(calories)}</p>
            </div>
            <div className="Recipe-image">
                <img src={image} alt={title} />
            </div>
            <div className="Recipe-ingredients">
                <h3>Ingredients</h3>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.text}</li>
                    ))}
                </ul>
            </div>
            
            
        </div>
    );
}

export default Recipe;