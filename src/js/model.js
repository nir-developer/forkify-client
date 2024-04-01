import { getJSON } from "./helpers.js";

import { API_URL } from "./config";


export const state = {
    recipe:{}, 
    search:{
        query:'',
        results:[]
    }


}


export const loadRecipe = async (id)=>
{
    try 
    {
        //1) LOAD THE RECIPE FROM THE API
        //IF getJSON throws - then all code after this call will skip to catch below!
        const data = await getJSON( `${API_URL}${id}`)
        

        //2) RENAME API's NAME PROPERTIES
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

        //3)UPDATE THE STATE
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


export const loadSearchResults = async query =>{

    try 
    {
        //0.UPDATE THE STATE: set the query 
        state.search.query = query; 
        
        //1.FETCH THE RESULTS FROM API: OK
       const data = await getJSON(`${API_URL}?search=${query}`) 
      

       //2.RENAME API's PROPERTIES NAMES 
        const recipes =data.data.recipes.map(rec =>{
            return {
                publisher:rec.publisher, 
                image:rec.image_url,
                title:rec.title, 
                id:rec.id
            }
        })


       //3.STORE THE RESULTS IN THE STATE 
       state.search.results = recipes
    
    //    console.log('STATE AFTER SEARCH RESULTS')
    //    console.log(state)
       
    }
    catch(err)
    {
        console.error(`Model: getSearchResults - catch an error:`, err.message)
        //RETHROW!
        throw err; 
    }
    
}

// loadSearchResults('Pizza')