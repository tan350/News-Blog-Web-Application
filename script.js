const apiKey ="720cd34b29a24f30bf8c8d7fd12f782c";

const blogContainer=document.getElementById("blog-container");

const searchField = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiUrl = 'http://localhost:3000/news';
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    }
    catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

// Event listener for search button click
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();

    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news by query", error);
        }
    }
});

// Function to fetch news articles based on query
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `http://localhost:3000/query?search=${query}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML=""; // Clear the existing content
    if (articles && articles.length > 0) { // Check if articles is defined and not empty
        articles.forEach(article => {
            const blogCard=document.createElement("div");
            blogCard.classList.add("blog-card");
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;
            const title = document.createElement("h2");
            const truncatedTitle = article.title.length > 30? article.title.slice(0,30) + "...." : article.title;
            title.textContent= truncatedTitle; 
            // title.textContent = article.title;
            const description = document.createElement("p");
            const truncatedDes= article.description.length > 120? article.description.slice(0,120)+ "...." : article.description;
            description.textContent=truncatedDes;
            // description.textContent = article.description;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);

            blogCard.addEventListener('click',()=>{
                window.open(article.url, "_blank")
            })

            blogContainer.appendChild(blogCard);
        });
    } else {
        // Handle the case where no articles are available
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "No articles available.";
        blogContainer.appendChild(errorMessage);
    }
}


(async()=>{
    try{
        const articles = await fetchRandomNews()
        displayBlogs(articles);
    }
    catch(error){
        console.error("Error fetching random news", error);
    }
})();