
export class mael {
    constructor(strMeal = 'a', id = '123', strCategory = 'stander', thisstrMeal = 'stander', strArea = 'stander', Ingredient = "stander", strInstructions = 'stander', strMealThumb = 'stander', strTags = 'stander', strYoutube = 'stander') {
        this.strMeal = strMeal;
        this.id = id;
        this.strCategory = strCategory;
        this.thisstrMeal = thisstrMeal;
        this.strArea = strArea;
        this.Ingredient = Ingredient;
        this.strInstructions = strInstructions;
        this.strMealThumb = strMealThumb;
        this.strTags = strTags;
        this.strYoutube = strYoutube;
    }
    async getDataByfirstLetter() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.strMeal}`);
        let responsData = await allData.json();
        return responsData.meals
    }
    async getDataByName() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.strMeal}`);
        let responsData = await allData.json();
        return responsData.meals
    }
    async getAllmael() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
        let responsData = await allData.json();
        return responsData.meals
    }

    async fullmealDetailsById() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`);
        let responsData = await allData.json();
        return responsData.meals
    }

    async mealCategories() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let responsData = await allData.json();
        return responsData.categories
    }

    async FilterByCategory() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.strCategory}`);
        let responsData = await allData.json();
        return responsData.meals
    }

    async maelsArea() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let responsData = await allData.json();
        return responsData.meals
    }

    async FilterByArea() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.strArea}`);
        let responsData = await allData.json();
        return responsData.meals
    }

    async maelsIngredients() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let responsData = await allData.json();
        return responsData.meals
    }
    async FilterByMainIngredient() {
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.Ingredient}`);
        let responsData = await allData.json();
        return responsData.meals
    }

}