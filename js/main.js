
import { mael } from "./meal.js";

let maelBlock = document.getElementById('allMeals')



// ===========================================================
// 0-loader ---using jquery
// ===========================================================




// window.addEventListener('load', function () {

//     $('#loding .lds-ellipsis').fadeOut(1000, function () {
//         $('#loding').fadeOut(1000, function () {
//             $('body').css('overflow', 'auto')
//             $('#loding').addClass('d-none')
//         })
//     })


// })









// ===========================================================
// 1-the aside animation and close open aside ---using jquery
// ===========================================================

let theasideLeftWidth = $('.asideleft').innerWidth()
console.log($('.aside').css('left'))

// defuelt animate when open page 
$('.aside').animate({ left: -theasideLeftWidth });

let animatUp = function () {

    $('.link_5').animate({ opacity: "0.9", top: "-4px" }, 100, function () {
        $('.link_4').animate({ opacity: "0.9", top: "-4px" }, 100, function () {
            $('.link_3').animate({ opacity: "0.9", top: "-4px" }, 100, function () {
                $('.link_2').animate({ opacity: "0.9", top: "-4px" }, 100, function () {
                    $('.link_1').animate({ opacity: "0.9", top: "-4px" })
                })
            })

        })
    })


}
let animatReset = function () {

    $('.link_1').animate({ opacity: "0", top: "0px" }, 130, function () {
        $('.link_2').animate({ opacity: "0", top: "0px" }, 130, function () {
            $('.link_3').animate({ opacity: "0", top: "0px" }, 130, function () {
                $('.link_4').animate({ opacity: "0", top: "0px" }, 130, function () {
                    $('.link_5').animate({ opacity: "0", top: "0px" })
                })
            })

        })
    })
}



// on click do animation and close open aside
$('.btnAside').click(function () {

    // console.log()

    if ($('.aside').css('left') == "0px") {
        $('.aside').animate({ left: -theasideLeftWidth }, function () {
            animatReset()

        });
        $('.btnAside').removeClass("fa-x");
        $('.btnAside').addClass("fa-bars")

    } else {
        $('.aside').animate({ left: "0px" }, function () {
            animatUp()
        })

        $('.btnAside').addClass("fa-x");
        $('.btnAside').removeClass("fa-bars")

    }
})
$('.link_1 , .link_2 , .link_3 , .link_4 , .link_5 ').click(function () {
    $('.aside').animate({ left: -theasideLeftWidth })
    $('.btnAside').removeClass("fa-x")
    $('.btnAside').addClass("fa-bars")
    $('#showOneMael').addClass('d-none')
    $('#showArea').addClass('d-none')
    $('#showIngredients').addClass('d-none')
    document.getElementById('showOneMael').innerHTML = ``
    $("#contactUs").addClass('d-none')


})



// ===========================================================
// 2-show all meals when open app ----> the first open app
// ===========================================================

let dispalyDataDiv = document.querySelector('.displayMeals')
let maels
let maelsObject



window.addEventListener('load', async function () {

    maels = new mael()
    maelsObject = await maels.getAllmael()
    console.log(maelsObject)
    displayMeals(maelsObject)

})

function displayMeals(maels) {
    var cartona = ``;
    for (let x = 0; x < maels.length; x++) {
        cartona += `
        <div>
        <div class=" customCard  p-0">
            <div class="  h-100 d-flex justify-content-center align-items-center position-relative">
                <img src="${maels[x].strMealThumb}" class="img-fluid rounded-1" alt="">
                <p id="selectCard" idMael="${maels[x].idMeal}"
                    class="w-100 effict bg-white bg-opacity-75 h2 text-center position-absolute d-flex justify-content-center align-items-center px-3 p-0 m-0">
                    ${maels[x].strMeal}
                </p>
            </div>
        </div>
        </div>
        `
    }
    document.getElementById('allMeals').innerHTML = cartona

}

// ===========================================================
// 3-show data when serch by frist name or litter
// ===========================================================
let serchName = document.getElementById('serchByName')
let serchLitter = document.getElementById('serchByLitter')
let maelsSerchLitter
let maelsSerchName

$('.link_1').click(function () {
    $('.serch').removeClass('d-none')
    document.getElementById('allMeals').innerHTML = ``
})

serchLitter.addEventListener('input', async function () {
    console.log(serchLitter.value)
    maelsSerchLitter = new mael(serchLitter.value)
    // console.log(maels)
    maelsObject = await maelsSerchLitter.getDataByfirstLetter()
    // console.log(maelsObject)
    displayMeals(maelsObject)
    $('#showOneMael').addClass('d-none')


})

serchName.addEventListener('input', async function () {
    console.log(serchName.value)
    maelsSerchName = new mael(serchName.value)
    // console.log(maels)
    maelsObject = await maelsSerchName.getDataByName()
    // console.log(maelsObject)
    displayMeals(maelsObject)
    $('#showOneMael').addClass('d-none')

})

// ===========================================================
// 4-Lookup full meal details by id or detect one mael in one page
// ===========================================================


var oneDetalsMeal
var maelsObject1


maelBlock.addEventListener('click', async function (e) {
    // console.log(e.target.getAttribute("idMael"))


    if (e.target.id == "selectCard") {
        document.getElementById('allMeals').innerHTML = ``
        $('#showOneMael').removeClass('d-none')
        oneDetalsMeal = new mael('a', `${e.target.getAttribute("idMael")}`)
        // console.log(oneDetalsMeal)
        maelsObject1 = await oneDetalsMeal.fullmealDetailsById()
        // console.log(maelsObject1[0].strMeal)
        displayMealOnly()

    } else {
        console.log("notwanted")
    }

})




function displayMealOnly() {
    $('.serch').addClass('d-none')
    console.log(Object.keys(maelsObject1[0]).length)

    //to display the Recipes 
    let RecipesCartona = ``
    for (let x = 1; x < Object.keys(maelsObject1[0]).length; x++) {
        if (maelsObject1[0]['strIngredient' + x.toString()] && maelsObject1[0]['strMeasure' + x.toString()]) {
            let spanContent = maelsObject1[0]['strIngredient' + x.toString()]
            let spanContent2 = maelsObject1[0]['strMeasure' + x.toString()]
            RecipesCartona += `<p class="p-1 bg-info-subtle bg-opacity-75 text-black rounded-1 m-1 ">${spanContent2 + " " + spanContent} </p>`
        } else {

        }
    }
    //to display the Tags  

    console.log(maelsObject1[0].strTags)
    let TagsNames = maelsObject1[0].strTags
    let myTagsArray = []
    let TagsCartona = ``

    if (TagsNames) {
        myTagsArray = TagsNames.split(",");
        for (let x = 0; x < myTagsArray.length; x++) {
            let spanContent = myTagsArray[x]
            TagsCartona += `<span class="p-1 bg-danger-subtle bg-opacity-75 text-black rounded-1 m-1 ">${spanContent}</span>`
        }
    } else {
        console.log("notfound")
    }

    let cartonatwo = `

<div class=" py-5 my-4 row text-white">
<div class="col-12 col-lg-4 leftDetales ">
    <img src="${maelsObject1[0].strMealThumb}" class="img-fluid rounded-3" alt="">
    <h3 class="text-center py-2">${maelsObject1[0].strMeal}</h3>
</div>
<div class="col-12 col-lg-8 rightDetales ">
    <h2>${maelsObject1[0].strMeal}</h2>
    <p>${maelsObject1[0].strInstructions}</p>
    
    <h2>Area: <span>${maelsObject1[0].strArea}</span></h2>
    <h2>Category : <span>${maelsObject1[0].strCategory}</span></h2>
    <h3 class="pb-2 ">Recipes :</h3>
    <div class="d-flex flex-wrap">
    ${RecipesCartona} 
    </div>

    <h2 class="pt-3 pb-3">Tags : </h2>
    <div class="d-flex flex-wrap">
    ${TagsCartona} 
    </div>

    <div class="mt-4">
        <a href="${maelsObject1[0].strSource}" class="btn btn-success" target="_blank">source</a>
        <a href="${maelsObject1[0].strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
    </div>
</div>
</div>
`

    document.getElementById('showOneMael').innerHTML = cartonatwo


}

// ===========================================================
// 5-meal Category
// ===========================================================


let categoryData
let categoryBtn = document.querySelector(".link_2")

categoryBtn.addEventListener('click', async function () {
    document.getElementById('allMeals').innerHTML = ``
    document.getElementById('showOneMael').innerHTML = ``
    let catgeory = new mael()
    categoryData = await catgeory.mealCategories()
    console.log(categoryData)
    displaycatgeory()

})

function displaycatgeory() {
    var cartona = ``;
    for (let x = 0; x < categoryData.length; x++) {
        cartona += `
        <div id="catgeorycard"   >
        <div class=" customCard  p-0"  >
            <div class="  h-100 d-flex justify-content-center align-items-center position-relative">
                <img src="${categoryData[x].strCategoryThumb}" class="img-fluid rounded-1" alt="">
                <div categoryname="${categoryData[x].strCategory}"  class="w-100 effict bg-white bg-opacity-75 position-absolute d-flex flex-column justify-content-center align-items-center ">    
                    <h3  idMael="${categoryData[x].idCategory}" categoryname="${categoryData[x].strCategory}"
                    class=" h2 text-center  d-flex justify-content-center align-items-center px-3 p-0 m-0">
                    ${categoryData[x].strCategory}
                    </h3>
                    <p id="categoryName" class="previewText text-center m-3" categoryname="${categoryData[x].strCategory}">${categoryData[x].strCategoryDescription}</p>
                </div>
            </div>
        </div>
        </div>
        `
    }
    document.getElementById('allMeals').innerHTML = cartona

}

// ===========================================================
// 6-Filter by Category
// ===========================================================

// at the first get the data belong category

let maelByCategory
let maelByCategoryData

maelBlock.addEventListener('click', async function (e) {
    console.log(e.target)

    if (e.target.getAttribute('categoryname')) {
        console.log(this.getAttribute('categoryname'))
        document.getElementById('allMeals').innerHTML = ``
        document.getElementById('showOneMael').innerHTML = ``

        maelByCategory = new mael('', '', e.target.getAttribute('categoryname'))
        console.log(maelByCategory)

        maelByCategoryData = await maelByCategory.FilterByCategory()
        displayMeals(maelByCategoryData)

    } else {
        console.log("notwanted category")
    }

})

// ===========================================================
// 7-Maels in Area
// =========================================================== 

let AreaBtn = document.querySelector('.link_3');
let maelsArea
let maelsAreaData

AreaBtn.addEventListener('click', async function () {
    document.getElementById('allMeals').innerHTML = ``
    document.getElementById('showOneMael').innerHTML = ``
    $('#showOneMael').addClass('d-none')
    $('.serch').addClass('d-none')
    $('#showArea').removeClass('d-none')



    maelsArea = new mael();
    // console.log(maelsArea)
    maelsAreaData = await maelsArea.maelsArea()
    console.log(maelsAreaData)
    displayArea()

})

function displayArea() {
    var cartona = ``;
    for (let x = 0; x < maelsAreaData.length; x++) {
        cartona += `
        <div class="areaCard  p-0">
        <div class=" h-100 d-flex flex-column justify-content-center align-items-center">
            <img src="img/region.png" class="img-fluid " width="80px" alt="" selectArea="${maelsAreaData[x].strArea}">
            <p id="selectCard" selectArea="${maelsAreaData[x].strArea}"
                class="pt-2 w-100 text-white h2 text-center  d-flex flex-column justify-content-center align-items-center px-3 p-0 m-0">
                ${maelsAreaData[x].strArea}
            </p>
        </div>
    </div>`

    }

    document.getElementById('showArea').innerHTML = cartona
}

// ===========================================================
// 8-filter meal by Area
// =========================================================== 
let areaBlock = document.getElementById('showArea');
let maelsFilterArea
let maelsFilterAreaData

areaBlock.addEventListener("click", async function (e) {
    document.getElementById('showArea').innerHTML = ``
    document.getElementById('showOneMael').innerHTML = ``
    // console.log(e.target.getAttribute('selectArea'))

    if (e.target.getAttribute('selectArea')) {

        maelsFilterArea = new mael()
        maelsFilterArea.strArea = e.target.getAttribute('selectArea')
        console.log(maelsFilterArea)
        maelsFilterAreaData = await maelsFilterArea.FilterByArea()
        console.log(maelsFilterAreaData)
        displayMeals(maelsFilterAreaData)

    }

})

// ===========================================================
// 9-Ingredients list
// =========================================================== 
let IngredientsBtn = document.querySelector('.link_4');
let maelsIngredients
let maelsIngredientsData


IngredientsBtn.addEventListener('click', async function () {
    document.getElementById('allMeals').innerHTML = ``
    document.getElementById('showOneMael').innerHTML = ``
    $('#showOneMael').addClass('d-none')
    $('.serch').addClass('d-none')
    $('#showIngredients').removeClass('d-none')

    maelsIngredients = new mael();

    maelsIngredientsData = await maelsIngredients.maelsIngredients()

    displayMaelsIngredients(maelsIngredientsData)

})

function displayMaelsIngredients(maels) {
    let cartona = ``
    for (let index in maels) {
        cartona += `
        <div class="areaCard p-0">
                    <div class=" h-100 d-flex flex-column justify-content-center align-items-center">
                        <img selectIngredient="${maels[index].strIngredient}" src="img/Ingredients.png" class="img-fluid " width="100px" alt="">
                        <h2 selectIngredient="${maels[index].strIngredient}" class="text-white pt-2">${maels[index].strIngredient}</h2>
                        <p selectIngredient="${maels[index].strIngredient}" id="selectCard"
                            class=" pt-1  text-white text-center previewText my-3">
                            ${maels[index].strDescription}
                        </p>
                    </div>
                </div> `
        if (index == 20) {
            break;
        }

    }
    document.getElementById('showIngredients').innerHTML = cartona


}

// ===========================================================
// 10-Filter by main ingredient
// =========================================================== 
let IngredientsBlock = document.getElementById('showIngredients');
let ingredientsfilter
let ingredientsfilterdata


IngredientsBlock.addEventListener('click', async function (e) {
    // console.log(e.target)
    if (e.target.getAttribute('selectIngredient')) {
        document.getElementById('showIngredients').innerHTML = ``
        document.getElementById('showOneMael').innerHTML = ``
        // console.log(e.target.getAttribute('selectIngredient'))
        ingredientsfilter = new mael()
        ingredientsfilter.Ingredient = e.target.getAttribute('selectIngredient')
        // console.log(ingredientsfilter)
        ingredientsfilterdata = await ingredientsfilter.FilterByMainIngredient()
        displayMeals(ingredientsfilterdata)

    }

})


// ===========================================================
// 11-rigex in js
// =========================================================== 
let nameInput = document.getElementById('inputName')
let emailInput = document.getElementById('inputEmail')
let phoneInput = document.getElementById('inputphone')
let ageInput = document.getElementById('inputAge')
let passInput = document.getElementById('inputPassword')
let RpassInput = document.getElementById('inputRepassword')

let contactBtn = document.querySelector(".link_5")

contactBtn.addEventListener('click', async function () {
    document.getElementById('allMeals').innerHTML = ``
    document.getElementById('showOneMael').innerHTML = ``
    $("#contactUs").removeClass('d-none')
    $('.serch').addClass('d-none')

})


function regexNameResult() {
    let regexName = /[^A-Za-z]/
    if (regexName.test(nameInput.value)) {
        $("#nameNotValid").removeClass('d-none')
        return false
    } else {
        $("#nameNotValid").addClass('d-none')
        return true
    }
}
function regexMailResult() {
    let regexName = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regexName.test(emailInput.value)) {
        $("#mailNotValid").addClass('d-none')
        return true
    } else {
        $("#mailNotValid").removeClass('d-none')

        return false
    }
}

function regexPhoneResult() {
    let regexName = /^01[0125][0-9]{8}$/
    if (regexName.test(phoneInput.value)) {
        $("#PhoneNotValid").addClass('d-none')
        return true
    } else {
        $("#PhoneNotValid").removeClass('d-none')
        return false
    }
}
function regexAgeResult() {
    let regexName = /-/
    if (regexName.test(ageInput.value)) {
        $("#ageNotValid").removeClass('d-none')
        return false
    } else {
        $("#ageNotValid").addClass('d-none')
        return true
    }
}


function regexPassResult() {
    let regexName = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if (regexName.test(passInput.value)) {
        $("#PassNotValid").addClass('d-none')
        return true

    } else {
        $("#PassNotValid").removeClass('d-none')
        return false
    }
}

function regexRePassResult() {

    if (RpassInput.value == passInput.value) {
        $("#repassNotValid").addClass('d-none')
        return true

    } else {
        $("#repassNotValid").removeClass('d-none')
        return false
    }
}



nameInput.addEventListener('input', function () {
    regexNameResult()

})
emailInput.addEventListener('input', function () {
    regexMailResult()

})
phoneInput.addEventListener('input', function () {
    regexPhoneResult()

})
ageInput.addEventListener('input', function () {
    regexAgeResult()

})
passInput.addEventListener('input', function () {
    regexPassResult()
    enabelSubmitBtn()
})

RpassInput.addEventListener('input', function () {
    regexRePassResult()
    enabelSubmitBtn()
})

function enabelSubmitBtn() {

    if (regexNameResult() && regexMailResult() && regexPhoneResult() && regexAgeResult() && regexPassResult() && regexRePassResult()) {
        console.log('valied allllllllllllllllllllll thankes')
        $("#btnsubmit").removeClass('disabled')
    } else {
        console.log('not vailed')
        $("#btnsubmit").addClass('disabled')
    }
}




