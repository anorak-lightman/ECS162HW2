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
    let sacStories = [];
    let davisStories = [];
    let curPage = 0;

    async function createDom(pageNumber) {
        await fetch("http://127.0.0.1:8000/api/key")
            .then(response => response.json())
            .then(api => fetch(SacUrl + api.apiKey + "&page=" + pageNumber))
            .then(response => response.json())
            .then(data => sacStories = data.response.docs)
            .then(sacStories => {
                for (let i = 0; i < 5; i++) {
                    let col = document.getElementsByClassName("row1col left-col")[0];
                    let link1= col.appendChild(document.createElement("a"));
                    let img = link1.appendChild(document.createElement("img"));
                    let link2 = col.appendChild(document.createElement("a"));
                    let header = link2.appendChild(document.createElement("h2"));
                    header.className = "articleHeader";
                    col.appendChild(document.createElement("br"));
                    let snippet = col.appendChild(document.createElement("p"));
                    snippet.className = "left-col1";
                    let hr = col.appendChild(document.createElement("hr"));
                    hr.className = "hr-center";
                    populateStories(header, snippet, img, link1, link2, sacStories[i]);
                }
                for (let i = 5; i < 10; i++) {
                    let col = document.getElementsByClassName("row1col center-col")[0];
                    let link1= col.appendChild(document.createElement("a"));
                    let img = link1.appendChild(document.createElement("img"));
                    let link2 = col.appendChild(document.createElement("a"));
                    let header = link2.appendChild(document.createElement("h2"));
                    header.className = "articleHeader";
                    col.appendChild(document.createElement("br"));
                    let snippet = col.appendChild(document.createElement("p"));
                    snippet.className = "center-col";
                    let hr = col.appendChild(document.createElement("hr"));
                    hr.className = "hr-center";
                    populateStories(header, snippet, img, link1, link2, sacStories[i]);
                }
            })
            .catch(error => {
                console.error('Error fetching key', error);
            });
        await fetch("http://127.0.0.1:8000/api/key")
            .then(response => response.json())
            .then(api => fetch(DavisUrl + api.apiKey + "&page=" + pageNumber))
            .then(response => response.json())
            .then(data => davisStories = data.response.docs)
            .then(davisStories => {
                for (let i = 0; i < 5; i++) {
                    let col = document.getElementsByClassName("row1col right-col")[0];
                    let link1= col.appendChild(document.createElement("a"));
                    let img = link1.appendChild(document.createElement("img"));
                    let link2 = col.appendChild(document.createElement("a"));
                    let header = link2.appendChild(document.createElement("h2"));
                    header.className = "articleHeader";
                    col.appendChild(document.createElement("br"));
                    let snippet = col.appendChild(document.createElement("p"));
                    snippet.className = "right-top";
                    let hr = col.appendChild(document.createElement("hr"));
                    hr.className = "hr-center";
                    populateStories(header, snippet, img, link1, link2, davisStories[i]);
                }
            })
            .catch(error => {
                console.error('Error fetching key', error);
            });
    }

    function populateStories(header, snippet, image, link1, link2, story) {
        header.innerText = story.headline.main;
        snippet.innerText = story.snippet;
        image.src = story.multimedia.default.url;
        image.width = story.multimedia.default.width;
        image.height = story.multimedia.default.height;
        link1.href = story.web_url;
        link2.href = story.web_url;
    }

    createDom(curPage);

    const loadMorePagesOnScroll = debounce(() => {
        const endOfPage = window.innerHeight + window.pageYOffset + 1000 >= document.body.offsetHeight;
        if (endOfPage && curPage <= 3) {
            // console.log("end of page");
            curPage++;
            createDom(curPage);
        }
    });

    function debounce(func, timeout = 100) {
        let timer;
        return function(...args) {
            const context = this;
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(context, args); }, timeout);
        };
    }
    window.addEventListener("scroll", loadMorePagesOnScroll);
})();