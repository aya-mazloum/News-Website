const addButton = $("#add-button");
const createButton = $("#create-button");
const cancelButton = $("#cancel-button");

const titleInput = $("#title-input");
const contentInput = $("#content-input");
const authorInput = $("#author-input");

const popup = $("#add-popup");
const container = $("#container");

const requiredNote = $("#required-note");
const addFailNote = $("#add-fail-note");



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

const addNews = async () => {
    try {
        requiredNote.addClass('hidden');
        addFailNote.addClass('hidden');

        if (!titleInput.val() || !contentInput.val() || !authorInput.val()) { note.removeClass('hidden'); }

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const formattedDatetime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

        const formData = new FormData();

        formData.append('title', titleInput.val());
        formData.append('content', contentInput.val());
        formData.append('author', authorInput.val());
        formData.append('publish_date', formattedDatetime);
        console.log(formattedDatetime);

        const response = await axios.post('http://localhost/News-Website/Backend/news.php', formData);

        if (response.data.status === 'Failed') {
            addFailNote.removeClass('hidden');
            return;
        }
        
        $("input[type='text']").val("");
        popup.addClass('hidden');

        loadNews();

    } catch (e) {
        console.error(e);
    }
};




createButton.click(() => {
    addNews();
});

addButton.click(() => {
    popup.removeClass('hidden');
});

cancelButton.click(() => {
    $("input[type='text']").val("");
    requiredNote.addClass('hidden');
    addFailNote.addClass('hidden');
    popup.addClass('hidden');
});

loadNews();