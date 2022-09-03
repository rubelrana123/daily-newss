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
                   <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                   <span>${news.total_view}</span>
                </p>
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
