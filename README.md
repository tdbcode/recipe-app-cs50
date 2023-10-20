# TDB Recipe Search using ReactJS and Edamam API
#### Video Demo:  https://www.youtube.com/watch?v=hqQ1WIBf5YE&ab_channel=ThomasBrady
#### Description:

My CS50 final project - I used ReactJS and EdamamAPI to build a basic Recipe Search algorithm with multiple forms of criteria.

I have also commented the code for further explanation of how it works.

I decided to go with a ReactJS project for my final project as it is in a skill area I wanted to develop and relevant for the area of industry I am interested in career switching to.

Having a degree in CS and teaching it for 12 years to high schoolers, I understand many concepts, however I have not pushed myself outside of my comfort zone in recent years and am wishing to career switch. So I decided to develop a project based on an area relevant to that career switch and personal interests of mine.

This final project actually took numerous attempts as intially I couldn't decided whether to attempt a forum app or a search style app and learning ReactJS took a lot more time than anticipated while trying to work a full time teaching job. I settled on this idea when I discovered the following links during the research phase and found out about Edamam API (also another skill I wanted to develop - that being understanding APIs further).

https://developer.epages.com/blog/coding/three-simple-to-use-apis-for-newbies/
https://rapidapi.com/blog/edamam-food-and-grocery-database-api-with-python-php-ruby-javascript-examples/
https://developer.edamam.com/edamam-docs-recipe-api#/

All other sources used throughout my project for coding from scratch are at the end of App.js.

When I discovered how easy it was to develop ReactJS in VSCode I decided to develop the latter project locally on my own laptop and also get my head around GitHub.

I branched a copy of the original react project from here: https://react.dev/learn/start-a-new-react-project

Then began to slowly develop different segments of the App - first focusing on just connecting to the API. This took time including research how Asynchronous functions worked in React and have to await fetch. I ended up finding Axios as a library that is more secure for sending requests and receiving resonses from APIs. I learned a lot of new terminology including what promises were and different ways to write them (although I did settle with the single try catch in my project, there was a point I had the whole .then, .catch .finally process going too).

Once I got the basic query returning recipe results for "chicken" from Edamam API, into a dictionary and viewing it via using a console.log command and Chrome's developer tab, I began to develop the basic form and decide on what features it should have. First I simply tried to get react to output the name and calories of the recipe, but this was frustrating as the page kept refreshing when I submitted the form and nothing would display! This is when I came across https://www.robinwieruch.de/react-preventdefault/ and the prevent default function to stop a refresh and the data then started appearing!

After this was successful, I realized I would need a full design and researched how I could make a tile system to display all of the recipes information. When researching the methods for this I found that you could create a seperate JS file (in my case recipeout.js) then import it and it acts like it's own trag. This can then be used with the map function to output a collection of this and then styled with CSS into a tile to display each individual recipe.

Once I was able to output, using the method described above, recipes into tiles, I then focused on developing other features in the app to further allow the user to refine their recipe search. This meant implemented health,  meal type and dietary options as well as calories (in that order). I researched how I could store the collection of types from Edamam without having to make my App.js ridicously long with huge dictionaries of data for outputting these types. This is when I discovered JSON files: https://stackoverflow.com/questions/17496513/json-to-dictionary-in-javascript

I created an external JSON file (APILabels.json) with dictionaries for each search criteria as I went. I chose this option as it allowed expansion + addition of new dictionaries/categories for criteria as I decided to expand app options. It kept all these options in one location making editing and maintenance easy, but also allowed direct importing as dictionaries in App.js.

I could then use React to autopopulate lists of these options under dropdown boxes to make it easier for the user to refine their search.

Finally I implemented the calories (min and max - although min is a little buggy and I can't entirely work out why - sometimes it returns no results when you use it on it's own, it is fine as part of a range though and max works perfectly). The Edamam API didn't seem to function as they described in their documentation so I decided to make a filterByCalories function which took the results from getRecipes and manually went through the array to build a new array with only recipes that met the calorie criteria. This was then set to the main recipe array and output in the grid system.

The final set of files I developed were the index.html / index.css (only to add the edamam logo in the bottom right), App.css and recipeout.js. I decided to go with a green, white and light grey color scheme similar to the edamam logo. In fact I used the green from the logo itself to make the header, button and some of the other colors on the page then modeled the rest around that. I feel the color scheme actually came together nicely. 

As I haven't written much CSS before, I spent a lot of time research CSS code on W3Schools (all referenced) and other links to ensure I could maximize the usage of CSS styling to make a functional design and try out things I hadn't before, such as curved corners, hover effects and making the tiles look like little recipe cards.

#### Repository on Github: https://github.com/tdbcode/recipe-app-cs50