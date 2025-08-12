import express from "express";
const app = express();
import Recipe from './models/reciple.models.js';
import connectDatabse from './db/database.js';

app.use(express.json());
connectDatabse();

app.post("/recipes", async (req, res) => {
    try {
        const reicpecreate = new Recipe(req.body);
        const savedRecipe = await reicpecreate.save();
        if (savedRecipe) {
            res.status(201).json({ message: "successfully added the recipe data", recipe: savedRecipe });
        } else {
            res.status(404).json({ error: "Unable to add the recipe the data" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the data" });
    }
});

// API to get all the recipes in the database as a response
app.get("/recipes", async (req, res) => {
    try {
        const getAllrecipe = await Recipe.find();
        if (getAllrecipe) {
            res.status(200).json({ message: "Successfully get all recipe", getAll: getAllrecipe });
        } else {
            res.status(404).json({ error: "Unable to get  recipe  data" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the data" });
    }
});
// API to get a recipe's details by its title
app.get("/recipes/:title", async (req, res) => {
    try {
        const getRecipeByTitle = await Recipe.findOne({ title: req.params.title });
        if (getRecipeByTitle) {
            res.status(201).json({ message: "Success get recipe with title", title: getRecipeByTitle });
        } else {
            res.status(404).json({ message: "unable to get recipe with title " });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the data" });
    }
});
// an API to get details of all the recipes by an author
app.get("/recipes/author/:authorName", async (req, res) => {
    try {
        const getRecipeByauthor = await Recipe.find({ author: req.params.authorName });
        if (getRecipeByauthor) {
            res.status(201).json({ message: "Success get recipe with author", author: getRecipeByauthor });
        } else {
            res.status(404).json({ message: "unable to get recipe with author " });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the data" });
    }
});
// an API to get all the recipes that are of "Easy" difficulty level.
app.get("/recipes/difficulty/:difficultylevel", async (req, res) => {
    try {
        const getRecipeWithDificulty = await Recipe.find({ difficulty: req.params.difficultylevel });
        if (getRecipeWithDificulty) {
            res.status(201).json({ message: "Success get the recipe with difficulty", recipeifficulty: getRecipeWithDificulty });
        } else {
            res.status(404).json({ message: "unable to get recipe with difficulty " });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the data" });
    }
});
// API to update a recipe's difficulty level with the help of its id
app.post("/recipes/update/:recipeId", async (req, res) => {
    try {
        const updateRecipeWithId = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
        if (updateRecipeWithId) {
            res.status(201).json({ message: "Successfully updated the data", recipeId: updateRecipeWithId });
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the data" });
    }
});
// API to update a recipe's prep time and cook time with the help of its title.
app.post("/recipes/prepcook/:titleName", async (req, res) => {
    try {
        const updateRecipeWithCook = await Recipe.findOneAndUpdate({ title: req.params.titleName }, req.body, { new: true });
        if (updateRecipeWithCook) {
            res.status(201).json({ message: "Successfully updated the data with title", recipeData: updateRecipeWithCook });
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the data" });
    }
});
// an API to delete a recipe with the help of a recipe id
app.delete("/recipes/data/:dataId", async (req, res) => {
    try {
        const deleteRecipeWithId = await Recipe.findByIdAndDelete(req.params.dataId);
        if (deleteRecipeWithId) {
            res.status(201).json({ message: "Successfuy deleted the data", data: deleteRecipeWithId });
        } else {
            res.status(404).json({ error: "Failed to delete the data" });
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the data" });
    }
});

const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("server is listening to", PORT);
});