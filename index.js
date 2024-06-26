const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");

let meals = [];
async function fetchMeals(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

}

const mealsDisplay = () => {
  if (meals === null) {
    result.innerHTML = "<h2>Aucun resultat</h2>";
  } else {
    meals.length = 12;

    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];
        for (i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            ingredients.push(`${ingredient} - ${measure}`);
          }
        }
        //   console.log(ingredients);
        return `
              <li class="card">
              <h2>${meal.strMeal}</h2>
              <p>${meal.strArea}</p>
        <img src=${meal.strMealThumb} alt="Photo de ${meal.strMeal}">
        <ul>${ingredients.join("")}</ul>
        </li>
        `;
      })
      .join("");
  }
};
input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
