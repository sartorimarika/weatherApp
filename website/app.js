/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=a7248850bf64c68b9518886a3e506b89&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
document.getElementById("generate").addEventListener("click", displayAction);

function displayAction() {
	const zip = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;

	getData(baseURL, zip, apiKey)
		.then(function (data) {
			// Add data
			console.log("Add data from api: ", data);
			postData("/add", {
				temperature: Math.round(data.main.temp),
				description: data.weather[0].description,
				icon: data.weather[0].icon,
				date: newDate,
				feel: feelings,
				city: data.name,
			});
		})
		.then(() => updateUI());
}

// Async GET
/* Function to GET Web API Data*/
const getData = async (baseURL, zip, apiKey) => {
		
		const url = baseURL + zip + apiKey;
		const request = await fetch(url); // The API Key variable is passed as a parameter to fetch()
		try {
			// Transform into JSON
			const allData = await request.json();
			if (allData.message) {
				alert(allData.message);
			} else {
				return allData;
			}
		} catch (error) {
			console.log("error", error);
			// appropriately handle the error
		}

    };

// Async POST
/* Function to POST data */
const postData = async (url = "", data = {}) => {
	console.log("POST weather data: ", data);
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});

	try {
		const newData = await response.json();
		return newData;
		console.log("post response: ", newData);
	} catch (error) {
		console.log("error", error);
	}
};

/* Function to update UI */
const updateUI = async () => {
	const request = await fetch("/all");
	try {
		const data = await request.json();
		console.log("updateUI: ", data);
		document.getElementById("date").innerHTML = `Date: ${data.date}`;
		document.getElementById("temp").innerHTML = `Temperature: ${data.temperature}`;
		document.getElementById("content").innerHTML = `Feelings: ${data.feel}`;
	//	document.getElementById("description").innerHTML = `Description: ${data.weather[0].description}`;
	//	document.getElementById("icon").innerHTML = `${data.weather[0].icon}`;
	//	document.getElementById("city").innerHTML = `City: ${data.name}`;
	} catch (error) {
		console.log("error", error);
	}
};
