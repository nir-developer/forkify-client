'use strict'

import icons from 'url:../img/icons.svg' //PARCEL 2: FOR ANY ASSET WHICH IS NOT A PROGRAMMING FILE(IMAGES, ICONS, VIDEO,,)

//POLYFILLING ASYNC AWAIT + ANY THING ELSE - FOR OLD BROWSERS
import 'regenerator-runtime/runtime' 
import 'core-js/stable'; 


const recipeContainer = document.querySelector('.recipe')




const url = `https://forkify-api.herokuapp.com/api/v2/recipes/`


const renderSpinner = function(parentEl)
{
      const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> ` 

        
        //EMPTY THE CONTAINER 
        parentEl.innerHTML = ''
        //RENDER THE SPINNER 
        parentEl.insertAdjacentHTML('afterbegin', markup) 

}

const showRecipe = async() =>{
    try    
    {
       
      //Read the id from the hash 
      //if no hash return
      //if there is hash: then extract the id from the hash  by removing the '#'

       const id = window.location.hash.slice(1)
       console.log(`id in hash: ${id}`)
       if(!id)
       {
        console.log('NO HASH'); 
        return ;
       }


        //0)LOAD SPINNER 
        renderSpinner(recipeContainer)
    
     
        //1) LOAD RECIPE
        const res = await fetch(`${url}${id}`); 
        const data =await res.json(); 

       if(!res.ok) throw new Error(`${data.message} (${res.status})`)
        //console.log(res, data)

        //REFORMAT THE RECIPE SHAPE - RENAME THE API PROPERTIES NAMES :
        let {recipe} = data.data;
        console.log(recipe)

        recipe = {
            id:recipe.id, 
            title:recipe.title ,
            publisher:recipe.publisher, 
            source:recipe.source_url, //CHANGED
            image:recipe.image_url, //CHANGED
            servings:recipe.servings, 
            cookingTime:recipe.cooking_time, //CHANGED
            ingredients:recipe.ingredients
        }

        console.log(recipe)



        //2) RENDER RECIPE
        const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">4</span>
            <span class="recipe__info-text">${recipe.servings}</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(ing => {
                return `
                    <li class="recipe__ingredient">
                        <svg class="recipe__icon">
                            <use href="${icons}#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${ing.quantity}</div>
                        <div class="recipe__description">
                            <span class="recipe__unit">${ing.unit}</span>
                            ${ing.description}
                        </div>
                    </li>
                `
            }).join('')}

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `
        //CLEAR THE CURRENT DEFAULT MESSAGE 
        recipeContainer.innerHTML = ''

        //FIRST CHILD - afterbegin
        recipeContainer.insertAdjacentHTML('afterbegin', markup)
    }
    catch(err)
    {

        console.error(err.message)
    }
}



//LISTEN TO THE LOAD  AND HASHCHANGE EVENTS
['hashchange', 'load'].forEach(e => window.addEventListener(e, showRecipe))
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe)