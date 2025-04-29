// Date: Display current date
let todaysDate = new Date();
const format = {weekday : "long", month: "long", day: "numeric", year: "numeric"};
const formattedDate = todaysDate.toLocaleDateString('en-US', format);

document.getElementById("formattedDate").innerText = formattedDate;
console.log(formattedDate);
let apiKey = '';
let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${apiKey}`;

async function getAPIKey() {
    await fetch("http://127.0.0.1:8000/api/key")
        .then(response => response.json())
        .then(data => {
            apiKey = data.apiKey;
            // console.log(apiKey);
            url = url.concat(String(apiKey));
            console.log(url.concat(String(apiKey)));
            // console.log(url);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching key', error);
        });
}

api = getAPIKey();