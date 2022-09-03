const loadCategory = async () => {
	const url = `https://openapi.programming-hero.com/api/news/categories`;
	const res = await fetch(url);
	const categoryData = await res.json().catch((error) => console.log(error));
	displayCategory(categoryData.data.news_category);
};

const displayCategory = (categories) => {
	console.log(categories);
	const categoryItem = document.getElementById('categoryItem');
	categories.forEach((category) => {
		console.log(category);

		const div = document.createElement('div');
		// div.classList.add("col")
		div.innerHTML = `
     <div onclick ="loadNews('${category.category_id}')" style="cursor: pointer;">${category.category_name}</div>
    
    `;
		categoryItem.appendChild(div);
    

	});
};


const loadNews = async (category_id) => {
  
	console.log(category_id);
	const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
	const res = await fetch(url);
	const categoryNews = await res.json().catch((error) => console.log(error));
	displaynews(categoryNews.data);
};

const displaynews = (Allnews) => {

	if (Allnews.length === 0) {
		const foundContainer = document.getElementById('foundContainer');
		foundContainer.classList.remove('d-none');
	} else {
		foundContainer.classList.add('d-none');
	}
	console.log(Allnews);
	const newsCount = document.getElementById('newsCount');
	newsCount.innerText = Allnews.length;
	const cardContainer = document.getElementById('card-container');
	cardContainer.innerText = ' ';
	Allnews.forEach((news) => {
		console.log(news.author.img);
		const div = document.createElement('div');
		div.classList.add('row', 'g-5', 'mb-5', 'border');
		div.innerHTML = `
              <div class="col-md-4 ">
            <img src="${
							news.image_url
						}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${
								news.details
									? news.details.slice(0, 200) + '...'
									: 'not found details'
							}</p>
              <div class="card-text d-flex justify-content-between">
                  <div  class="d-flex justify-content-start align-item-start">
                  <div>
                   <img src ="${
											news.author.img
										}" style = "height: 60px; width : 60px; border-radius : 50%">
                 </div>
                  <div class = "ms-3 mb-0">
                  
                  <p class = "">${news.author.name}</p>
                  <p>${
										news.author.published_date
											? news.author.published_date
											: 'No date Available'
									}</p>
                  </div>
                  
                  </div>
                  <div class= "d-flex justify-content-center align-item-center text-center">

                  </div>
                  <button type="button" class="btn btn-primary" style ="height: 60px">See More</button>
              
              </div>
            </div>
          </div>
    
    `;
		cardContainer.appendChild(div);
	});
};
loadCategory();
