
'use strict'

import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'



//POLYFILLING ASYNC AWAIT + ANY THING ELSE - FOR OLD BROWSERS
import 'regenerator-runtime/runtime' 
import 'core-js/stable'; 


///PARCEL HOT RELOAD REPLACEMENT 
// if(module.hot) module.hot.accept()


const controlRecipes = async() =>{
   
  try    
    {
       //0)Routing(application logic - implementing here in the controller):Fetch the 
       const id = window.location.hash.slice(1)
    
       //GOURD 
       if(!id) return ;

        //1)LOAD SPINNER - UI LOGIC - IMPLEMENTED IN THE VIEW
        recipeView.renderSpinner();
    
     
        //2) LOAD RECIPE(HTTP LIBRARY COMPONENT - IMPLEMENTED IN THE MODEL)
        await model.loadRecipe(id)

        console.log('controller - the RECIPE:')
        console.log(model.state.recipe)
       
   
        //3) RENDER RECIPE
        recipeView.render(model.state.recipe)
      
  }
    catch(err)
    {

      console.log(err)
       //delegate Error Handling(real world handling - by render) to view 
       //BETTER TO LET THE VIEW DEFINE THE MESSAGE IT WANTS TO DISPLAY(instead of passing it the message from the controller)
        recipeView.renderError()
      
    }
}

const controlSearchResults = async (query) =>{

  try 
  {
    //0) Render the spinner 
    resultsView.renderSpinner()
    //1)Get the search input from the SearchView 
    const query = searchView.getQuery()
    if(!query) return ; 

    //2)LOAD THE RECIPES USING THE MODEL (the model does not return anything- it should only manipulate the state)
    await model.loadSearchResults(query)

    
    //3)GET THE RESULTS FROM THE MODEL STATE AND RENDER THEM 
    //BEFORE PAGINATION
    //resultsView.render(model.state.search.results)

   //WITH PAGINATION
    const res = model.getSearchResultsPage(1)
    //console.log(res)

    resultsView.render(res)


    
  }
  
catch(err)
{
  console.log('controller controlSearchResults catched errror')
  console.log(err)
  throw err;

}
}


function init()
{
  //SUBSCRIBE controlRecipes ON LOAD/HASHCHANGE EVENTS(ON PAGE LOAD - app start!)
  recipeView.addHandlerRender(controlRecipes)
    //SUBSCRIBE controlSearchResults ON THE SEARCH FORM SUBMIT(NOT ON PAGE LOAD - NOT ON APP START)
  searchView.addHandlerSearch(controlSearchResults)
  //searchView.addHandlerRender(controlSearchResults)

}

init();



//LISTEN TO THE LOAD  AND HASHCHANGE EVENTS - REFACTORED THISLOGIC TO THE VIEW!
//['hashchange', 'load'].forEach(e => window.addEventListener(e, recipeController))
// window.addEventListener('hashchange', recipeController);
// window.addEventListener('load', recipeController)



//SIMPL TEST TO MY API WITH THE CORS I ADDED TO IT:
// fetch('http://localhost:3000/forkify/api/v1/recipes') 
// .then(response => {
//   console.log(response)

//   return response.json(); 
// })
// .then(data => {
//   console.log(data)

// })
// .catch(err => console.log(err.name))

