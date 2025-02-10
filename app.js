const searchMeal = document.getElementById("input");
// console.log(searchMeal.value);
function fetchMeal() {
  if (searchMeal.value) {
    console.log(searchMeal.value);
    let URL = `https://themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}
        `;
    fetch(URL)
      .then((res) => res.json())
      .then((meals) => showMeal(meals.meals));
    document.getElementById("noMeal").style.display = "none";
    document.querySelector(".meal-wrapper").innerHTML = "";
  } else {
    alert("Search for a food first! :)");
    document.getElementById("noMeal").style.display = "block";
  }
}

function showMeal(meals) {
  console.log("Show Meal:", meals);
  for (let meal of meals) {
    document.querySelector(
      ".meal-wrapper"
    ).innerHTML += `<div class="meal-box border border-gray-500 rounded-xl">
          <img
            src= ${meal.strMealThumb}
            alt=${meal.strMeal}
            class="rounded h-[200px] w-full object-cover"
          />
          <div class="p-3">
            <h3 class="text-2xl text-white">${meal.strMeal}</h3>
            <p class="text-gray-400 my-2"> ${meal.strInstructions.slice(
              0,
              100
            )}...
            </p>
            <p class="italic text-gray-500">
              <span>${meal.strArea}</span> <span>${meal.strCategory}</span>
            </p>
            <div class="my-4">
              <a
                class="btn bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-xl"
                href=${meal.strYoutube} target="_black"
                >Watch</a
              >
              <button class="px-3 text-white cursor-pointer" onclick="lookUpDetails('${
                meal.idMeal
              }')">View Recipe</button>
            </div>
          </div>
        </div>`;
  }
}

function lookUpDetails(id) {
  console.log("Look Up", id);
  let URL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}
        `;
  fetch(URL)
    .then((res) => res.json())
    .then((meals) => showMealDetails(meals.meals[0]));
}

function showMealDetails(meal) {
  console.log(meal);
  const details = document.getElementById("details");
  details.classList.add("visible");
  details.classList.remove("invisible");
  details.innerHTML = `<div class="popup bg-white w-[70%] min-h[500px] p-10">
            <h2 class="text-2xl font-bold mb-4">${meal.strMeal}</h2>
            <p class="mb-6">${meal.strInstructions}</p>
            <a
                class="btn bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded"
                href=${meal.strYoutube} target="_black"
                >Watch</a
              >
            <button
              class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded" onclick="closeDetails()"
            >
              Close
            </button>
          </div>`;
}

function closeDetails() {
  details.classList.add("invisible");
  details.classList.remove("visible");
}
const search = document.getElementById("search");
search.addEventListener("click", () => {
  fetchMeal();
});
