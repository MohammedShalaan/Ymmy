// ===========================================================
// 0-loader ---using jquery
// ===========================================================


async function showLodaer() {
    $('.lood').removeClass('d-none')
    $('.lood').css('opacity', '1')
    console.log('waiiiiiiiiiiiiiiiiiit')
}
async function hideLodaer() {

    await $('.lood').animate({ opacity: '0.5' }, function () {
        $('.lood').addClass('d-none')
    })
    await $('body').css('overflow', 'auto')

    console.log('doooooooooooooooone')
}

// ===========================================================
// 1-create class of maels 
// ===========================================================

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
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.strMeal}`);
        let responsData = await allData.json();
        await hideLodaer()
        return responsData.meals
    }
    async getDataByName() {
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.strMeal}`);
        let responsData = await allData.json();
        await hideLodaer()
        return responsData.meals
    }
    async getAllmael() {
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
        let responsData = await allData.json();
        await hideLodaer();
        return responsData.meals
    }

    async fullmealDetailsById() {
        showLodaer()

        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`);
        let responsData = await allData.json();
        await hideLodaer();
        return responsData.meals
    }

    async mealCategories() {
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let responsData = await allData.json();
        await hideLodaer();
        return responsData.categories
    }

    async FilterByCategory() {
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.strCategory}`);
        let responsData = await allData.json();
        await hideLodaer();
        return responsData.meals
    }

    async maelsArea() {
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let responsData = await allData.json();
        await hideLodaer();
        return responsData.meals
    }

    async FilterByArea() {
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.strArea}`);
        let responsData = await allData.json();
        await hideLodaer();
        return responsData.meals
    }

    async maelsIngredients() {
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let responsData = await allData.json();
        await hideLodaer();
        return responsData.meals
    }
    async FilterByMainIngredient() {
        showLodaer()
        let allData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.Ingredient}`);
        let responsData = await allData.json();
        await hideLodaer();
        return responsData.meals
    }

}