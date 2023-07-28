const books =[];
const BOOKS_PER_PAGE = 12;
let page = 1;

if (!books || !Array.isArray(books)) throw new Error('Source required') 
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers')

const css = {
day : {
    dark: '10, 10, 20',
    light: '255, 255, 255',
},

night : {
    dark: '255, 255, 255',
    light: '10, 10, 20',
},
};


for (let i = 0; i < extracted.length; i++) {
    const { author, image, title, id } = extracted[i];
    const preview = createPreview({
        author,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

dataListItems.appendChild(fragment)
const initial = matches.lenth - page * BOOKS_PER_PAGE;
const remaining = hasRemaining ? initial : 0;


const genres = document.createDocumentFragment()
const element = document.createElement('option');
element.value = 'any';
element = 'All Genres';
genres.appendChild(element);

for ([id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id;
    element.innerText = name;
    genres.appendChild(element);
}

dataSearchGenres.appendChild(genres)

const authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for ([id, name]of Object.entries(authors)) {
    document.createElement('option')
    element.value = value
    element = text
    authors.appendChild(element)
}

const authorsElement = document.querySelector('[dataSearchAuthors]');
authorsElement.appendChild(authors);

const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

documentElement.style.setProperty('--color-dark', css[v].dark);
documentElement.style.setProperty('--color-light', css[v].light);
const dataListButton = document.querySelector('[dataListButton]');
dataListButton.textContent = `Show more (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})`;

dataListButton.disabled = !(matches.length - page * BOOKS_PER_PAGE > 0);

dataListButton.innerHTML = /* html */ [
    '<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
]

data-search-cancel.addEventListener('click', () => { dataSearchOverlay.open = false; });
data-settings-cancel.addEventListener('click', () => { querySelect(dataSettingsOverlay).open = false; });
data-settings-form.addEventListener('submit', (event) => { actions.settings.submit(event); });
data-list-close.addEventListener('click', () => { dataListActive.open = false; });

dataListButton.addEventListener('click', () => {
  const dataListItems = document.querySelector('[data-list-items]');
  const startIndex = page * BOOKS_PER_PAGE;
  const endIndex = (page + 1) * BOOKS_PER_PAGE;

  dataListItems.appendChild(createPreviewsFragment(matches, startIndex, endIndex));
  actions.list.updateRemaining();
  page = page + 1;
});

dataHeaderSearch.addEventListener('click' , function() {
    dataSearchOverlay.open === true ;
    dataSearchTitle.focus();
});

dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    let result = [];

    for (const book of booksList) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        let genreMatch = false

        if (filters.genre === 'any'){
            for (const genre of book.genres) { 
                if (genre === filters.genre) { 
                    genreMatch = true;
                    break; }
                }
            }
        }

        if (titleMatch && authorMatch && genreMatch) {
             result.push(book);
        }
    

    if (result.length < 1) {
        dataListMessage.classList.add('list__message_show');
    } else {
        dataListMessage.classList.remove('list__message_show');
    }
    

    dataListItems.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const extracted = source.slice(range[0], range[1]);

    for (const { author, image, title, id } of extracted) {

        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element);
    }
    
    dataListItems.appendChild(fragments);
    const initial = matches.length - [page * BOOKS_PER_PAGE];
    const remaining = hasRemaining ? initial : 0;
    dataListButton.disabled = initial > 0;

    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.open = false;
},

dataSettingsOverlay.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    dataSettingsOverlay.open = false
}),

data-list-items.addEventListener('click' , (event) => {
    let active = null;
    const pathArray = Array.from(event.path || event.composedPath());
    

    for (const node of pathArray) {
        if (active) break;
        const previewId = node?.dataset?.preview;
    
        for (const singleBook of books) {
            if (singleBook.id === previewId) {
            active = singleBook;
            break;
            } 
        }
    }
    
    if (!active) return;
    dataListActive.open = true;
    dataListBlur.src = active.image;
    dataListTitle.innerText = active.title;
    
    dataListSubtitle.innerText = '${authors[active.author]} (${Date(active.published).getFullYear()})';
    dataListDescription = active.description;
}))