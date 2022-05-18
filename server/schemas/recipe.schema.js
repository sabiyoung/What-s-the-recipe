import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
    foodName:{type:String,required:true},
    foodImage:{type:String,required:true},
    foodIngredients:[{type:String,required:true}]
});
export const RecipeModel = mongoose.model('Recipe', recipeSchema )