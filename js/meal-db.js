//Error message
document.getElementById("error-message").style.display='none';

//Spinner  toggler
const toggleSpinner=(displayStyle)=>{
  document.getElementById('spinner').style.display=displayStyle;
}

//Enter button press to search
const searchButton=document.getElementById('button-search');
const searchInput=document.getElementById('search-field');
searchInput.addEventListener("keypress",function(event){
  if(event.key=='Enter'){
    searchButton.click();
    console.log('hello')
  }
});

//Search food items
const searchFood=() =>{
    const searchFood=document.getElementById('search-field');
    const searchText=searchFood.value;
    searchText.value='';
    toggleSpinner('block')
    if(searchText==''){  
    }
    else
    {
      const url=
      `https://www.themealdb.com/api/json/v2/1/search.php?s=${searchText}
      
      `
      console.log(url)
      fetch(url)
      .then(res => res.json())
      .then(data => displayMealsSearch(data.meals))
      .catch(error => console.log(error))
    }
}

//Display Food Items
const displayMealsSearch=(meals) => {
    const searchResult=document.getElementById('search-result');
    searchResult.textContent= '';
    if(meals.length==0){
    }
    meals.forEach(meal => {
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=
        `
        <div onclick="mealLoadDetails(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
        `;
        searchResult.appendChild(div)
    });
    toggleSpinner('none')
}

const mealLoadDetails= (idMeal) => {
    url =
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res =>res.json())
    .then(data =>displayMealDetail(data.meals[0]))
}
//Display single meals
const displayMealDetail= meal => {
   const mealDetails=document.getElementById('meal-details');
   mealDetails.textContent= '';
   const div=document.createElement('div');
   div.classList.add('card');
   div.innerHTML=
   `
   <img src="${meal.strMealThumb}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center fs-1 fw-bold">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item fs-5 fw-bold">${meal.strIngredient1}</li>
          <li class="list-group-item fs-5 fw-bold">${meal.strIngredient2}</li>
          <li class="list-group-item fs-5 fw-bold">${meal.strIngredient3}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
   `
   mealDetails.appendChild(div)
}

// *************************by EMRAN*******************************//