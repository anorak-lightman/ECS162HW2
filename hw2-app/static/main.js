"use strict";
(function() {
    // Date: Display current date
    let todaysDate = new Date();
    const format = {weekday : "long", month: "long", day: "numeric", year: "numeric"};
    const formattedDate = todaysDate.toLocaleDateString('en-US', format);

    document.getElementById("formattedDate").innerText = formattedDate;
    console.log(formattedDate);
    let SacUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Sacramento fq=timesTag.subject:"Sacramento" AND timesTag.location:"California"&api-key=';
    let DavisUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q="UC Davis"&api-key=';

    async function getSacStories(url) {
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let sacStories = data.response.docs;
                populateStories("center-col1-header", "center-col1", "center-col-image", ".center-col-link", sacStories[0]);
                populateStories("center-bottom-header", "center-bottom", "center-bottom-image", ".center-bottom-link", sacStories[1]);
                populateStories("right-top-header", "right-top", "right-top-image", ".right-top-link", sacStories[2]);
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }

    async function getDavisStories(url) {
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let davisStories = data.response.docs;
                console.log(davisStories)
                populateStories("left-col1-header", "left-col1", "left-col-image", ".left-col-link", davisStories[0]);
                populateStories("left-bottom-header", "left-bottom", "left-bottom-image", ".left-bottom-link", davisStories[1]);
                populateStories("right-bottom-header", "right-bottom", "right-bottom-image", ".right-bottom-link", davisStories[2]);
            })
    }

    fetch("http://127.0.0.1:8000/api/key")
        .then(response => response.json())
        .then(data => {
            getSacStories(SacUrl += data.apiKey);
        })
        .catch(error => {
            console.error('Error fetching key', error);
        });

    fetch("http://127.0.0.1:8000/api/key")
        .then(response => response.json())
        .then(data => {
            getDavisStories(DavisUrl += data.apiKey);
        })
        .catch(error => {
            console.error('Error fetching key', error);
        });

    function populateStories(header, snippet, image, link, story) {
        document.getElementById(header).innerText = story.headline.main;
        document.getElementById(snippet).innerText = story.snippet;
        document.getElementById(image).src = story.multimedia.default.url;
        document.getElementById(image).width = story.multimedia.default.width;
        document.getElementById(image).height = story.multimedia.default.height;
        const nodeList = document.querySelectorAll(link);
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].href = story.web_url;
        }
    }
})();