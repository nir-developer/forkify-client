//HIS API!
const API_BASE_URL = `https://forkify-api.herokuapp.com/api/v2/recipes/`

//MY API!! OK - JUST ADD IMAGES TO MY API
//const API_BASE_URL= `http://localhost:3000/forkify/api/v1/recipes/`
//66051297c508547d3ca89c91

export const state = {
    recipe:{

    }
}


export async function loadRecipe(id)
{
    try 
    {
        const res = await fetch(`${API_BASE_URL}${id}`); 
        const data =await res.json(); 

        if(!res.ok) throw new Error(`${data.message} (${res.status})`)

        let {recipe} = data.data;
        console.log(recipe)

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

        console.log(recipe)

        state.recipe = recipe; 


    }
    catch(err)
    {
        alert(err)
        //throw err; 

    }
    


}