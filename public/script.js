// public/script.js

// Function to fetch and display verified restaurants
async function fetchRestaurants() {
  try {
    const response = await fetch("http://localhost:3000/api/verified-restaurants"); // API endpoint
    const data = await response.json();

    // Get the element where restaurants will be displayed
    const restaurantsDiv = document.getElementById("restaurants");
    restaurantsDiv.innerHTML = ""; // Clear any existing content

    // Display each restaurant
    data.restaurants.forEach((restaurant) => {
      const restaurantElement = document.createElement("div");
      restaurantElement.classList.add("restaurant");

      // Add restaurant information to the HTML
      restaurantElement.innerHTML = `
        <h3>${restaurant.name}</h3>
        <p>Location: ${restaurant.location}</p>
        <p>${restaurant.halal_verified ? "✅ Halal Verified" : "❌ Not Verified"}</p>
      `;
      restaurantsDiv.appendChild(restaurantElement); // Append to main div
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
}

// Run fetchRestaurants when the page loads
document.addEventListener("DOMContentLoaded", fetchRestaurants);
