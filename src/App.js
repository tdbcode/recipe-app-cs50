import React, {useState} from 'react'; // import useState to create a variable with a set function
import './App.css';  // CSS for main part of App
import Recipe from './recipeout'; // Custom written JavaScript file to display the recipes in a tile form when found
import axios from 'axios';  // Use axios as it's more secure than fetch and allows you to do asyncronize requests of APIs
import * as API from './keys';  // Custom written JavaScript file to store API access keys for Edamam - make's it easier to change accounts if need be
import HealthLabels from "./APILabels"; // Custom made JSON - Heath labels copied from Edamam into a JSON file for easy importing as a dictionary. Allows fast displays of options in dropdown box for Health Labels and updating RECIPE_URL queries
import MealTypes from "./APILabels";   // Custom made JSON - Meal Type labels copied from Edamam into a JSON file for easy importing as a dictionary. Allows fast displays of options in dropdown box for Meal Types and updating RECIPE_URL queries
import DietLabels from "./APILabels"; // Custom made JSON - Diet Labels copied from Edamam into a JSON file for easy importing as a dictionary. Allows fast displays of options in dropdown box for Dietery options and updating RECIPE_URL queries

function App() {

  // Create constants with set methods using getState for search criteria, health criteria, meal type criteria, diet criteria which can be concatenated into RECIPE_URL to run correct query of API database
  const [searchcriteria, setSearchCriteria] = useState(""); 
  const [healthcriteria, setHealthCriteria] = useState("");
  const [mealtypecriteria, setMealTypeCriteria] = useState(''); 
  const [dietcriteria, setDietCriteria] = useState("");
  // Create recipe array to store results from API
  const [recipes, setRecipes] = useState([]);
  // Create custom URLs in format of '&health=${option selected here}' to allow easier and dynamic updates of the RECIPE_RUL without reload
  const [HEALTH_URL, setHealthURL] = useState("");
  const [DIET_URL, setDietURL] = useState("");
  const [MEALTYPE_URL, setMealTypeURL] = useState("");
  const [CALORIES_URL, setCaloriesURL] = useState("");
  // For collecting Min and Max Calories for database searching of recipes
  const [mincalories, setMinCalories] = useState('');
  const [maxcalories, setMaxCalories] = useState('');

  // RECIPE_URL is taken from https://developer.edamam.com/edamam-docs-recipe-api and allows correct connection and retrieval of results from API recipe database
  // Link format example from API documentation: https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=0b90b246&app_key=f08b044bcfbbe977ae670414e62303c8&diet=low-fat&health=celery-free&mealType=Dinner
  const RECIPE_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchcriteria}&app_id=${API.APP_ID}&app_key=${API.APP_KEY}${HEALTH_URL}${DIET_URL}${MEALTYPE_URL}${CALORIES_URL}`;

  // Handles form submit when submit button is clicked without refreshing page. Calls getRecipes to run search of API database
  const formSubmit = (e) => {
    e.preventDefault(); // Stops page refreshing and wiping results
    getRecipes();
    //console.log(RECIPE_URL); // for testing only
  };

  // function that parses in recipes results array when called
  const filterByCalories = (items) => {
    // uses results array to filter the items into a new list
    const newRecipeList = items.filter(item => {
      // using the min and max calories entered by the user, filters out any items that do not meet the users max and min calories
      const calories = item.recipe.calories;
      // if there have been no max or min calories entered, it returns true for item and adds all items to the list
      if (!mincalories && !maxcalories) {
        return true;
      }
      else{
        // else only puts items in the list that meet the critera
        return calories >= mincalories && calories <=maxcalories;
      }
    })
    // console.log(newRecipeList); // for testing only
    setRecipes(newRecipeList); // Sets the main Recipes Array to filtered list so that it can be output on the page
  };

  // Creates an asynchronous function which allows results be be retrieved while other things are processing simultaneously 
  const getRecipes = async () => {
    // trys to retrieve data from API using RECIPE_URL with user selected settings for HEALTH, DIET, MEALTYPE and CALORIES
    try{
      const response = await axios.get(RECIPE_URL) // creates a promise and assigns responses (the results) to variable reponse
      // console.log("GET Response"); // for testing only
      // console.log(response.data.hits); // for testing only
      filterByCalories(response.data.hits); // takes results from axios call to API, checks the collection (response) and gets the data and hits (the recipes which match the critera) and passes them in to be filtered for calorie limits
    }
    // if an error occurs output log with error information
    catch (error) {
      console.log("Error in fetching recipes.", error)
    }
    // for testing only, output that promise was completed
    finally{
      console.log("Promise completed.");
    };
  };

  // called by dropdown box for health functions (h is the event for selecting a health item)
  const handleHealthChange = (h) => {
    const newHealthCriteria = h.target.value; // get the value of selected combobox item
    setHealthCriteria(newHealthCriteria); // update health critera for search
     // console.log(newHealthCriteria); // testing purposes only
    if(newHealthCriteria===""){ // if health criteria selected is black
      setHealthURL("");  // clear health URL to avoid errors when searching API
      // console.log(RECIPE_URL);  // for testing only
    }
    else{
      setHealthURL(`&health=${newHealthCriteria}`); // else set healthURL variable to appropriate function for the URL
      // console.log(RECIPE_URL);  // for testing only
    }
  };

  // same logic for dietery choices as health
  const handleDietChange = (d) => {
    const newDietCriteria = d.target.value;
    setDietCriteria(newDietCriteria);
    // console.log(newDietCriteria); // for testing only
    if(newDietCriteria===""){
      setDietURL("");
    }
    else{
      setDietURL(`&diet=${newDietCriteria}`);
    }
  };

  // same logic for meal options as health
  const handleMealType = (m) => {
    const newMealTypeCriteria = m.target.value;
    setMealTypeCriteria(newMealTypeCriteria);
    // console.log(newMealTypeCriteria); // for testing only
    if(newMealTypeCriteria===""){
      setMealTypeURL("");
    }
    else{
      setMealTypeURL(`&mealType=${newMealTypeCriteria}`);
    }
  };

  // created to handle inputs for minimum calories without overwriting maximum calorie input
  const handleMinCalories = (c) => {
    const mincals = c.target.value; // assigns value to mincals variable
    setMinCalories(mincals); // assigns value for mincals to global MinCalories to be used in search query

    // Checks to see if either calories field is blank
    if (mincals === "" && maxcalories === "") {
      setCaloriesURL(""); // if so reset the URL if both fields are empty
    } else if (maxcalories === "") {  // if only max cals then set appropriate query to only look for min cals in API (this doesn't entirely seem to work and needs further development) - WIP AND NEEDS REVIEWING
      setCaloriesURL(`&calories=${mincals}`);
    } else if (mincals === "") {
      setCaloriesURL(`&calories=${maxcalories}`); // if only min cals then set appropriate query to only look for max cals in API (this works)
    } else {
      setCaloriesURL(`&calories=${mincals}-${maxcalories}`); // else use the format for the range prescribed by API documentation for calories
    }
  };

  // Same as above but for Max calories field
  const handleMaxCalories = (c) => {
    const maxcals = c.target.value;
    setMaxCalories(maxcals);

    if (maxcals === "" && mincalories === "") {
      setCaloriesURL(""); 
    } else if (mincalories === "") {
      setCaloriesURL(`&calories=${maxcals}`);
    } else if (maxcals === "") {
      setCaloriesURL(`&calories=${mincalories}`);
    } else {
      setCaloriesURL(`&calories=${mincalories}-${maxcals}`);
    }
  };


  // Build HTML for the App - cannot seem to comment directly but in short builds the form and CSS classNames to design layout

  // The select tags for health, mealtype and diet use the map function to output repeated HTML for options in the dropdown box
  // This is based off of the health, meals and diets imported from the APILabels.json dictionaries
  // Selected choices update the query to the API

  // Recipe Container div handles displaying results from the recipes API and displaying them in a grid format (using CSS) and the .map function to output every item using duplicate HTML
  // The <Recipe> tag refers to imported React script from recipeout.js
  // <recipe> passes across values from the recipes array such as key, title, total calories of the recipe, the image of the recipe and the ingredients dictionary
  // Each recipe tile is set to a hyperlink pointing to the recipes own page from the recipe API database link property
  return (
    <div className="App"> 
      <h1 className="App-header">TDB Recipes</h1> 
      
      <form className="App-form" onSubmit={formSubmit}>
      <div className="App-form-container">
        <h3>Search for recipes by entering ingredients, e.g. chicken, health labels, meal type, dietary options, or calorie range.</h3>
      <label htmlFor="searchcriteria">Search Criteria: </label>
        <input 
          type="text"
          className="App-form-search-bar" 
          value={searchcriteria} 
          placeholder="Search for a recipe by name"
          onChange={(s) => setSearchCriteria(s.target.value)}
        />
        
        <input className="App-form-submit" type="Submit" value="Search" />

      <div className="App-form-options">
        <label htmlFor="healthcriteria">Health Labels: </label>
        <select value={healthcriteria} onChange={handleHealthChange}>
        <option value="">Select a health option</option>
          {HealthLabels.HealthLabels.map((healthLabel) => (
            <option key={healthLabel.APIID} value={healthLabel.APIID}>{healthLabel.Name}</option>
        ))}
        </select>
            </div>
            <div className="App-form-options">
        <label htmlFor="mealtypecriteria">Meal Type: </label>
        <select value={mealtypecriteria} onChange={handleMealType}>
        <option value="">Select a meal type</option>
        {MealTypes.MealTypes.map((mealType) => (
          <option key={mealType.APIID} value={mealType.APIID}>
            {mealType.Type}
          </option>
        ))}
      </select>
          </div>
          <div className="App-form-options">
      <label htmlFor="dietcriteria">Dietary Options: </label>
      <select value={dietcriteria} onChange={handleDietChange}>
        <option value="">Select a diet option</option>
        {DietLabels.DietLabels.map((dietLabel) => (
          <option key={dietLabel.APIID} value={dietLabel.APIID}>
            {dietLabel.Name}
          </option>
        ))}
      </select>
      </div>
      <div className="App-form-options">
      <label htmlFor="mincalories">Min Calories:</label>         
      <input 
          type="text"
          className="App-form-calories-bar" 
          value={mincalories} 
          onChange={handleMinCalories}
        />

     <label htmlFor="maxcalories">Max Calories:</label>   
      <input 
          type="text"
          className="App-form-calories-bar" 
          value={maxcalories} 
          onChange={handleMaxCalories}
        />
        </div>
      </div>
      </form>
      <div className="RecipeContainer"><h3>Click on recipes to be taken to their respective pages</h3></div>
      <div className="RecipeContainer">
        {recipes.map(recipe =>(
          <a href={recipe.recipe.url} className="RecipeLink">
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          /></a>
        ))}
      </div>
    </div>
  );
}

export default App;


/* Sources used:
I wanted to learn ReactJS as it seems relevant for the industry and I wanted to get my head around APIs more after the Flask tasks, so I esearched for final project ideas and came across this site suggesting:
https://developer.epages.com/blog/coding/three-simple-to-use-apis-for-newbies/

This led me to edamam which has a ton of resources to help you get started (in the video)
https://developer.edamam.com/edamam-docs-recipe-api#/

Another relevant source used:
https://rapidapi.com/blog/edamam-food-and-grocery-database-api-with-python-php-ruby-javascript-examples/


Sources used to help build project and solve problems as I went:
https://www.upgrad.com/blog/axios-in-react/
https://forums.meteor.com/t/solved-how-to-return-the-result-of-an-axios-call-to-the-client/55392/3
https://stackoverflow.com/questions/63880605/react-js-how-to-prevent-page-reload-once-click-on-the-link-right-now-the-whole#:~:text=You%20could%20prevent%20the%20page,method%20in%20the%20event%20practice.&text=Easy%20way%20to%20redirect%20another%20page%20without%20refreshing%20the%20page%20...
https://www.robinwieruch.de/react-preventdefault/
https://www.pluralsight.com/guides/how-to-use-the-map()-function-to-export-javascript-in-react
https://developer.edamam.com/edamam-docs-recipe-api#/
https://stackoverflow.com/questions/29108779/how-to-get-selected-value-of-a-dropdown-menu-in-reactjs
https://www.guvi.in/blog/how-to-fetch-data-using-api-in-react/
https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#basic-syntax
https://www.w3schools.com/react/react_useeffect.asp 
https://forums.meteor.com/t/solved-how-to-return-the-result-of-an-axios-call-to-the-client/55392
https://www.smashingmagazine.com/2020/11/comparison-async-await-versus-then-catch/
https://stackoverflow.com/questions/64590346/how-to-assign-axios-response-to-a-constant-and-return-the-const-with-assigned-va
https://betterprogramming.pub/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668

Maps and displaying items from a dictionary:
https://stackblitz.com/edit/react-dictionary-map?file=index.js
https://stackoverflow.com/questions/35191336/how-to-map-a-dictionary-in-reactjs

Code splitting to make table of items:
https://legacy.reactjs.org/docs/code-splitting.html
https://medium.com/@shivampip/add-external-script-in-react-d935428351d9

Was getting key errors after making recipeout.js. Sources for help:
https://sentry.io/answers/unique-key-prop/
https://www.reddit.com/r/reactjs/comments/w5kqd7/warning_each_child_in_a_list_should_have_a_unique/
https://legacy.reactjs.org/docs/lists-and-keys.html

Using JSON files to store data for page:
https://stackoverflow.com/questions/17496513/json-to-dictionary-in-javascript

Creation a dictionary from a JSON file and adding it as options to a select:
https://stackoverflow.com/questions/40810673/mapping-over-a-dictionary-to-display-dropdown-values-in-javascript
https://www.pluralsight.com/guides/convert-a-json-file-to-an-array-in-react

Getting length of list:
https://linuxhint.com/dictionary-length-javascript/

Removing items from list:
https://stackoverflow.com/questions/49103681/best-way-to-delete-an-item-from-dictionary-react-js#:~:text=As%20for%20deleting%20an%20object,more%20what%20the%20problem%20is.
https://www.robinwieruch.de/react-remove-item-from-list/
https://dev.to/collegewap/how-to-delete-an-item-from-the-state-array-in-react-kl

CSS3 Sources used:
https://blog.hubspot.com/website/css-id

Ton of helpful CSS items here:
https://www.w3schools.com/css/css_list.asp
https://www.tutorialrepublic.com/css-tutorial/css-syntax.php
https://stackoverflow.com/questions/47409585/using-rem-units-in-media-queries-and-as-width
*/