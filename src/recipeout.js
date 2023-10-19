import React from 'react';

const Recipe = ({title,calories,image}) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>Description</p>
            <p>{calories}</p>
            <img src={image} alt="" />
        </div>
    );
}

export default Recipe;