import React, {useState} from 'react';
import './App.css';
import Recipe from './recipeout';
import axios from 'axios';
import * as API from './keys';
import HealthLabels from "./APILabels";
import MealTypes from "./APILabels";
import DietLabels from "./APILabels";

function App() {

  const [searchcriteria, setSearchCriteria] = useState(""); 
  const [healthcriteria, setHealthCriteria] = useState("");
  const [mealtypecriteria, setMealTypeCriteria] = useState(''); 
  const [dietcriteria, setDietCriteria] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [HEALTH_URL, setHealthURL] = useState("");
  const [DIET_URL, setDietURL] = useState("");
  const [MEALTYPE_URL, setMealTypeURL] = useState("");
  const RECIPE_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchcriteria}&app_id=${API.APP_ID}&app_key=${API.APP_KEY}${HEALTH_URL}${DIET_URL}${MEALTYPE_URL}`;


  // https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=0b90b246&app_key=f08b044bcfbbe977ae670414e62303c8&diet=low-fat&health=celery-free&mealType=Dinner

  const formSubmit = (e) => {
    e.preventDefault();
    getRecipes();
    console.log(RECIPE_URL); 
  }
 
  const getRecipes = async () => {
    const response = await axios.get(RECIPE_URL)
    .then((response) => {
       console.log("GET Response");
       console.log(response.data.hits);
       setRecipes(response.data.hits);
    })
    .catch((error) => {
      console.log("Error in fetching recipes.")
    })
    .finally(() => {
      console.log("Promise completed.");
    });
  };

  const handleHealthChange = (h) => {
    const newHealthCriteria = h.target.value;
    setHealthCriteria(newHealthCriteria);
    console.log(newHealthCriteria); 
    if(newHealthCriteria===""){
      setHealthURL("");
      console.log(RECIPE_URL); 
    }
    else{
      setHealthURL(`&health=${newHealthCriteria}`);
      console.log(RECIPE_URL); 
    }
  };

  const handleDietChange = (d) => {
    const newDietCriteria = d.target.value;
    setDietCriteria(newDietCriteria);
    console.log(newDietCriteria); 
    if(newDietCriteria===""){
      setDietURL("");
    }
    else{
      setDietURL(`&diet=${newDietCriteria}`);
    }
  };

  const handleMealType = (m) => {
    const newMealTypeCriteria = m.target.value;
    setMealTypeCriteria(newMealTypeCriteria);
    console.log(newMealTypeCriteria); 
    if(newMealTypeCriteria===""){
      setMealTypeURL("");
    }
    else{
      setMealTypeURL(`&mealType=${newMealTypeCriteria}`);
    }
    
  };

  return (
    <div className="App">
      <h1 className="App-header">TDB Recipes</h1>
      
      <form className="App-form" onSubmit={formSubmit}>
        <input 
          type="text"
          className="App-form-search-bar" 
          value={searchcriteria} 
          onChange={(s) => setSearchCriteria(s.target.value)}
        />
        <input className="App-form-submit" type="Submit"/>
        <select className="App-food-options" value={healthcriteria} onChange={handleHealthChange}>
        <option value="">Select a health option</option>
          {HealthLabels.HealthLabels.map((healthLabel) => (
            <option key={healthLabel.APIID} value={healthLabel.APIID}>{healthLabel.Name}</option>
        ))}
        </select>

        <select value={mealtypecriteria} onChange={handleMealType}>
        <option value="">Select a meal type</option>
        {MealTypes.MealTypes.map((mealType) => (
          <option key={mealType.APIID} value={mealType.APIID}>
            {mealType.Type}
          </option>
        ))}
      </select>

      <select value={dietcriteria} onChange={handleDietChange}>
        <option value="">Select a diet label</option>
        {DietLabels.DietLabels.map((dietLabel) => (
          <option key={dietLabel.APIID} value={dietLabel.APIID}>
            {dietLabel.Name}
          </option>
        ))}
      </select>


      </form>
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))};
    </div>
  );
}

export default App;


/* Sources used:
https://developer.edamam.com/edamam-docs-recipe-api#/
https://www.upgrad.com/blog/axios-in-react/
https://forums.meteor.com/t/solved-how-to-return-the-result-of-an-axios-call-to-the-client/55392/3
https://stackoverflow.com/questions/63880605/react-js-how-to-prevent-page-reload-once-click-on-the-link-right-now-the-whole#:~:text=You%20could%20prevent%20the%20page,method%20in%20the%20event%20practice.&text=Easy%20way%20to%20redirect%20another%20page%20without%20refreshing%20the%20page%20...
https://www.robinwieruch.de/react-preventdefault/
https://developer.edamam.com/edamam-docs-recipe-api#/
https://stackoverflow.com/questions/29108779/how-to-get-selected-value-of-a-dropdown-menu-in-reactjs
https://www.guvi.in/blog/how-to-fetch-data-using-api-in-react/
https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#basic-syntax
https://www.w3schools.com/react/react_useeffect.asp 
https://forums.meteor.com/t/solved-how-to-return-the-result-of-an-axios-call-to-the-client/55392
https://www.smashingmagazine.com/2020/11/comparison-async-await-versus-then-catch/
https://stackoverflow.com/questions/64590346/how-to-assign-axios-response-to-a-constant-and-return-the-const-with-assigned-va
Maps and displaying items from a dictionary:
https://stackblitz.com/edit/react-dictionary-map?file=index.js
https://stackoverflow.com/questions/35191336/how-to-map-a-dictionary-in-reactjs
Code splitting to make table of items:
https://legacy.reactjs.org/docs/code-splitting.html
https://medium.com/@shivampip/add-external-script-in-react-d935428351d9
Was getting key errors after making recipeout.js. Answers:
https://sentry.io/answers/unique-key-prop/
https://www.reddit.com/r/reactjs/comments/w5kqd7/warning_each_child_in_a_list_should_have_a_unique/
https://legacy.reactjs.org/docs/lists-and-keys.html
Using JSON files to store data for page:
https://stackoverflow.com/questions/17496513/json-to-dictionary-in-javascript
Creation a dictionary from a JSON file and adding it as options to a select:
https://stackoverflow.com/questions/40810673/mapping-over-a-dictionary-to-display-dropdown-values-in-javascript
https://www.pluralsight.com/guides/convert-a-json-file-to-an-array-in-react
*/
