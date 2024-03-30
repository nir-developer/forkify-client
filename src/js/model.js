import { getJSON } from "./helpers.js";

import { API_URL } from "./config";

//MY API!! OK - JUST ADD IMAGES TO MY API
//const API_BASE_URL= `http://localhost:3000/forkify/api/v1/recipes/`
//66051297c508547d3ca89c91

export const state = {
    recipe:{

    }
}


export const loadRecipe = async (id)=>
{
    try 
    {
        //IF getJSON throws - then all code after this call will skip to catch below!
        const data = await getJSON( `${API_URL}/${id}`)
        
        //console.log(`Model: received resolved promise - data: `, data)
        let {recipe} = data.data;

        recipe = {
            //MY API WITH _id 
            //id:recipe._id,
            id:recipe.id, 
            title:recipe.title ,
            publisher:recipe.publisher, 
            source:recipe.source_url, //CHANGED
            image:recipe.image_url, //CHANGED
            servings:recipe.servings, 
            cookingTime:recipe.cooking_time, //CHANGED
            ingredients:recipe.ingredients
        }

        //console.log(recipe)

        state.recipe = recipe; 


    }
    catch(err)
    {
        //WRONG PLACE OF HANDLING "REAL WORLD ERROR HANDLING" BY RENDERING ON THE UI
        //ERROR HANDLING SHOULD BE MOVE BE IN THE VIEW LOGIC!
        // alert(err)
         console.error(`*Model: ERROR*: $${err}`)
        throw err

    }
    


}