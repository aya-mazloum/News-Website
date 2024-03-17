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
    $.ajax({
        url: 'http://localhost/News-Website/Backend/news.php',
        success: (data) => { displayNews(data); },
        error: (error) => { console.error("Error fetching data:", error); }
    });
};

const displayNews = (data) => {
    container.html('');
    data.news?.forEach((newsItem) => { generateNewsItem(newsItem); });
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

const addNews = () => {
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

    $.ajax({
        url: 'http://localhost/News-Website/Backend/news.php',
        type: "POST",
        data: {
            title: titleInput.val(),
            content: contentInput.val(),
            author: authorInput.val(),
            publish_date: formattedDatetime,
        },
        dataType: "json", 
        success: (data) => {
            $("input[type='text']").val("");
            popup.addClass('hidden');

            loadNews();
        },
        error: (error) => {
            addFailNote.removeClass('hidden');
            console.error("Error fetching data:", error);
            return;
        }
    });
};



createButton.click(() => { addNews(); });

addButton.click(() => { popup.removeClass('hidden'); });

cancelButton.click(() => {
    $("input[type='text']").val("");
    requiredNote.addClass('hidden');
    addFailNote.addClass('hidden');
    popup.addClass('hidden');
});

loadNews();