import {
    MongoClient
} from 'mongodb';

async function main() {
    const uri = 'mongodb+srv://recipe:recipe@cluster0.zhobr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await createRecipe(client, {
            name: 'Mac and Cheese',
            ingredients: ['cheese', 'milk', 'butter', 'water'],
            minutes: 60
        })
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createRecipe(client, newRecipe) {
    const recipeResult = await client.db('recipeApp').collection('recipes').insertOne(newRecipe);

console.log(recipeResult.insertedId)
}