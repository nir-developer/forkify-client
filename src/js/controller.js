
'use strict'

import * as model from './model.js'
import recipeView from './views/recipeView.js'

import icons from 'url:../img/icons.svg' //PARCEL 2: FOR ANY ASSET WHICH IS NOT A PROGRAMMING FILE(IMAGES, ICONS, VIDEO,,)

//POLYFILLING ASYNC AWAIT + ANY THING ELSE - FOR OLD BROWSERS
import 'regenerator-runtime/runtime' 
import 'core-js/stable'; 


const recipeContainer = document.querySelector('.recipe')




const recipeController = async() =>{
   
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
       const {recipe} = model.state;
   
        //3) RENDER RECIPE
        recipeView.render(model.state.recipe)
      
  }
    catch(err)
    {

       //delegate Error Handling(real world handling - by render) to view 
       //BETTER TO LET THE VIEW DEFINE THE MESSAGE IT WANTS TO DISPLAY - dont pass the message 
              recipeView.renderError()
      //  recipeView.renderError('HEY FROM CONTROLLER')
       //recipeView.renderError(`${err} * * * *`)
      // //recipeView.renderError(err.message)
        // console.error(err.message)
    }
}


//SUBSCRIBE THIS CONTROLLER SUBSCRIBER TO THE recipeView PUBLISHER 
function init()
{
  recipeView.addHandlerRender(recipeController)

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