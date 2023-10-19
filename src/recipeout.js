import React from 'react';
import './recipeout.css';

const Recipe = ({title,calories,image,ingredients}) => {

    const roundCalories = (calories) => {
        return Math.round(calories);
    };

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