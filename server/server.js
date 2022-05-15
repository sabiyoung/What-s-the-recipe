import express from 'express';
const app = express();
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import path from 'path';
const __dirname = path.resolve();

app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://recipe:recipe@cluster0.zhobr.mongodb.net/recipeApp')

const recipeSchema = {
    title: String,
    content: String
}

const Recipe = mongoose.model('Recipe', recipeSchema)

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/index.html')
})

app.post('/', (req, res) => {
    const newRecipe = new Recipe({
        title: req.body.title,
        content: req.body.content
    });
    newRecipe.save();
})

app.listen(3000,() => {
    console.log(`Running on ${3000}`)
})