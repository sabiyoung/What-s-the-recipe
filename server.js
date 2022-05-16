import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from "cors";
import { RecipeModel } from './server/schemas/recipe.schema.js';


const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/WhatsRecipe').then(() => {
    console.log("connected to DB successfully");
}).catch((err) => {
    console.log("Failed to connect to DB", err);
});







app.get('/recipe', function(req,res){
    RecipeModel.find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});
app.post('/create-recipe', function(req,res){
    const {foodName,foodImage,foodIngredients} = req.body;
    const recipe = new  RecipeModel({
        foodName,foodImage,foodIngredients
    });
    recipe.save()
    .then((data) => {
      
        res.json({data});
    })
    .catch(err => {
        res.status(501);
        res.json({errors: err});
    })
});











app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/index.html')
})


app.listen(3002,() => {
    console.log(`Running on ${3002}`)
})