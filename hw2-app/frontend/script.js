// Date: Display current date
let todaysDate = new Date();
const format = {weekday : "long", month: "long", day: "numeric", year: "numeric"};
const formattedDate = todaysDate.toLocaleDateString('en-US', format);

document.getElementById("formattedDate").innerText = formattedDate;
console.log(formattedDate);
let apiKey = '';
let SacUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Sacramento fq=timesTag.subject:"Sacramento" AND timesTag.location:"California"&api-key=${apiKey}`;
let DavisUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q="UC Davis"&api-key=${apiKey}`;

async function getAPIKey(url) {
    await fetch("http://127.0.0.1:8000/api/key")
        .then(response => response.json())
        .then(data => {
            apiKey = data.apiKey;
            url = url.concat(String(apiKey));
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

getAPIKey(SacUrl);
getAPIKey(DavisUrl);