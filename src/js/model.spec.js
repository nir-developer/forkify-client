// import { RES_PER_PAGE } from './config.js';
// // import * as model from './model.js'
// import path from 'path'
// import fs from 'fs'

import {describe, it, expect, beforeAll, beforeEach} from 'vitest'; 


//GREAT!!! 
//I EXPORTED WITH CJS AND ES6 SUCCESSED  - BUT I WILL STICK TO ES6 TO BE CONSISTENT WITH THE CLIENT PROJECT- CHECK THE import-test-data.js  AS  :
import * as model from '../js/test-data/data/import-test-data.js'

beforeAll(()=> {
    //LOAD FROM JSON FILE - SYNC 
    try 
    {
        // const state = JSON.parse(fs.readFileSync(path.join(__dirname, 'test-data', 'data', 'state.json')))
        // const model = {state:state}
        //console.log(model.state)
      
    }
    catch(err)
    {
        console.log(err.message)
    }

})

describe('getSearchResultsPage', ()=>{
    it('should return correct search results when valid page number is provided', ()=>{
        
    const expected = [
      {
        "publisher": "Closet Cooking",
        "image_url": "http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg",
        "title": "Cauliflower Pizza Crust (with BBQ Chicken Pizza)",
        "id": "5ed6604591c37cdc054bcd09"
      },
      {
        "publisher": "Closet Cooking",
        "image_url": "http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg",
        "title": "Cauliflower Pizza Crust (with BBQ Chicken Pizza)",
        "id": "5ed6604591c37cdc054bcc13"
      },
      {
        "publisher": "Simply Recipes",
        "image_url": "http://forkify-api.herokuapp.com/images/howtogrillpizzad300x20086a60e1b.jpg",
        "title": "How to Grill Pizza",
        "id": "5ed6604591c37cdc054bcb37"
      },
      {
        "publisher": "All Recipes",
        "image_url": "http://forkify-api.herokuapp.com/images/391236ba85.jpg",
        "title": "Veggie Pizza",
        "id": "5ed6604591c37cdc054bca5d"
      },
      {
        "publisher": "Closet Cooking",
        "image_url": "http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg",
        "title": "Pizza Dip",
        "id": "5ed6604591c37cdc054bcac4"
      },
      {
        "publisher": "BBC Good Food",
        "image_url": "http://forkify-api.herokuapp.com/images/1649634_MEDIUMd3fc.jpg",
        "title": "Pitta pizzas",
        "id": "5ed6604591c37cdc054bc990"
      },
      {
        "publisher": "All Recipes",
        "image_url": "http://forkify-api.herokuapp.com/images/7988559586.jpg",
        "title": "Valentine Pizza",
        "id": "5ed6604591c37cdc054bca57"
      },
      {
        "publisher": "A Spicy Perspective",
        "image_url": "http://forkify-api.herokuapp.com/images/IMG_4351180x1804f4a.jpg",
        "title": "Greek Pizza",
        "id": "5ed6604591c37cdc054bca3b"
      },
      {
        "publisher": "My Baking Addiction",
        "image_url": "http://forkify-api.herokuapp.com/images/PizzaDip21of14f05.jpg",
        "title": "Pizza Dip",
        "id": "5ed6604591c37cdc054bca10"
      },
      {
        "publisher": "All Recipes",
        "image_url": "http://forkify-api.herokuapp.com/images/5100898cc5.jpg",
        "title": "Pizza Casserole",
        "id": "5ed6604591c37cdc054bc96e"
      },

    ]; 

      //ACT 
      const actual = model.getSearchResultsPage()
      console.log(actual)
      expect(actual.length).toBe(expected.length)
    //  expect(actual[0]).toEqual(expected[0])
     console.log(actual[0])
    })
    
})