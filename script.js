//Usando DOMContentLoaded me aseguro de que el DOM se carge antes de que se ejecute el código JS

document.addEventListener("DOMContentLoaded", function() {

//Declaro las constantes del div donde irá la receta, y la constante del botón

    const recipe = document.getElementById("recipe");
    const btnClick = document.getElementById("btnClick");

//Agrego la función de click al botón

    btnClick.addEventListener("click", getRecipe);

//Creo la función que obtendrá las recetas que están almacenadas en el API

    function getRecipe() {

//Me aseguro que esté vacío el div antes de comenzar
       
        recipe.innerHTML = "";

//Declaro la constante de la URL de la API

        const URL = "https://www.themealdb.com/api/json/v1/1/random.php";

//Hago el llamado a la API a través del fetch, con el método GET. Si la respuesta es OK, elegirá un elemento de los datos proporcionados, con el ID meal y creará una constante que contiene los datos que veremos de la receta, que luego se actualizará en el div correspondiente usando el innerHTML.
       
        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud de la API");
                }
                return response.json();
            })
            .then(data => {
                const meal = data.meals[0];
                if (meal) {
                    const html = `
                        <h3>${meal.strMeal}</h3>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p>Category: ${meal.strCategory}</p>
                        <p>Area: ${meal.strArea}</p>
                        <p>Ingredients:</p>
                        <ul>
                            ${getIngredients(meal).join("")}
                        </ul>
                        <p>Instructions: ${meal.strInstructions}</p>
                    `;
                    recipe.innerHTML = html;
                } else {
                    recipe.innerHTML = "No se encontraron resultados.";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                recipe.innerHTML = "Ocurrió un error al obtener la comida aleatoria.";
            });

    };

//Se declara la función con la cual se pueden tener los ingredientes para la receta escogida.

    function getIngredients(meal) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`<li>${measure} ${ingredient}</li>`);
            }
        }
        return ingredients;
    }
});

