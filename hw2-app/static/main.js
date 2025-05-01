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
    let curPage = 0;

    function fetchKey() {
        return new Promise((resolve) => {
            fetch("http://127.0.0.1:8000/api/key")
                .then(response => response.json())
                .then(data => {
                    resolve(data.apiKey);
                })
                .catch(error => {
                    console.error("error fetching key", error);
                });
        });
    }

    async function getSacStories(pageNumber) {
        const key = await fetchKey();
        return new Promise((resolve) => {
            fetch(SacUrl + key + "&page=" + pageNumber)
                .then(response => response.json())
                .then(data => {
                    resolve(data.response.docs);
                })
                .catch(error => {
                    console.error("error getting sacramento stories", error);
                });
        });
    }

    async function getDavisStories(pageNumber) {
        const key = await fetchKey();
        return new Promise((resolve) => {
            fetch(DavisUrl + key + "&page=" + pageNumber)
                .then(response => response.json())
                .then(data => {
                    resolve(data.response.docs);
                })
                .catch(error => {
                    console.error("error getting davis stories", error);
                });
        });
    }


    async function createDom(pageNumber) {
        await getSacStories(pageNumber)
            .then(sacStories => {
                for (let i = 0; i < 5; i++) {
                    let col = document.getElementsByClassName("row1col left-col")[0];

                    let gridElement = document.createElement("div");
                    gridElement.className = "grid-element";
                    col.appendChild(gridElement)

                    let link1= gridElement.appendChild(document.createElement("a"));
                    let img = link1.appendChild(document.createElement("img"));
                    let link2 = gridElement.appendChild(document.createElement("a"));
                    let header = link2.appendChild(document.createElement("h2"));
                    header.className = "articleHeader";
                    gridElement.appendChild(document.createElement("br"));
                    let snippet = gridElement.appendChild(document.createElement("p"));
                    snippet.className = "left-col1";
                    let hr = gridElement.appendChild(document.createElement("hr"));
                    hr.className = "hr-center";
                    populateStories(header, snippet, img, link1, link2, sacStories[i]);
                }
                for (let i = 5; i < 10; i++) {
                    let col = document.getElementsByClassName("row1col center-col")[0];

                    let gridElement = document.createElement("div");
                    gridElement.className = "grid-element";
                    col.appendChild(gridElement)

                    let link1= gridElement.appendChild(document.createElement("a"));
                    let img = link1.appendChild(document.createElement("img"));
                    let link2 = gridElement.appendChild(document.createElement("a"));
                    let header = link2.appendChild(document.createElement("h2"));
                    header.className = "articleHeader";
                    gridElement.appendChild(document.createElement("br"));
                    let snippet = gridElement.appendChild(document.createElement("p"));
                    snippet.className = "center-col";
                    let hr = gridElement.appendChild(document.createElement("hr"));
                    hr.className = "hr-center";
                    populateStories(header, snippet, img, link1, link2, sacStories[i]);
                }
            })
            .catch(error => {
                console.error("error populating dom with sacramento stories", error);
            });

        await getDavisStories(pageNumber)
            .then(davisStories => {
                for (let i = 0; i < 5; i++) {
                    let col = document.getElementsByClassName("row1col right-col")[0];

                    let gridElement = document.createElement("div");
                    gridElement.className = "grid-element";
                    col.appendChild(gridElement)

                    let link1= gridElement.appendChild(document.createElement("a"));
                    let img = link1.appendChild(document.createElement("img"));
                    let link2 = gridElement.appendChild(document.createElement("a"));
                    let header = link2.appendChild(document.createElement("h2"));
                    header.className = "articleHeader";
                    gridElement.appendChild(document.createElement("br"));
                    let snippet = gridElement.appendChild(document.createElement("p"));
                    snippet.className = "right-top";
                    let hr = gridElement.appendChild(document.createElement("hr"));
                    hr.className = "hr-center";
                    populateStories(header, snippet, img, link1, link2, davisStories[i]);
                }
            })
            .catch(error => {
                console.error("error populating dom with davis stories", error);
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

    const loadMorePagesOnScroll = debounce(() => {
        const endOfPage = window.innerHeight + window.pageYOffset + 2000 >= document.body.offsetHeight;
        if (endOfPage && curPage <= 3) {
            curPage++;
            createDom(curPage);
        }
    });

    function debounce(func, timeout = 200) {
        let timer;
        return function(...args) {
            const context = this;
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(context, args); }, timeout);
        };
    }

    createDom(curPage);
    window.addEventListener("scroll", loadMorePagesOnScroll);
})();