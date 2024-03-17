const addButton = $("#add-button");
const createButton = $("#create-button");
const cancelButton = $("#cancel-button");

const titleInput = $("#title-input");
const contentInput = $("#content-input");
const authorInput = $("#author-input");

const popup = $("#add-popup");
const container = $("#container");




const loadNews = () => {
    fetch('http://localhost/News-Website/Backend/news.php', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        displayNews(data);
    }).catch((error) => {
        console.error(error);
    })
};

const displayNews = (data) => {
    container.html('');

    data.news?.forEach((newsItem) => {
        generateNewsItem(newsItem);
    });
};

const generateNewsItem = (newsItem) => {
    const { title, content, author, publish_date } = newsItem;
    const newsItemHtml = $(`<div class="news-item flex column">
                                <h2>${title}</h2>
                                <p>${content}</p>
                                <div class="author-date flex row">
                                    <p>${author}</p>
                                    <p>${publish_date}</p>
                                </div>
                            </div>`);
    container.append(newsItemHtml);
};





createButton.click(() => {
    addNews();
});

addButton.click(() => {
    popup.removeClass('hidden');
});

cancelButton.click(() => {
    $("input[type='text']").val("");
    popup.addClass('hidden');
});

loadNews();