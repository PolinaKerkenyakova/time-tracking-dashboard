import { html, render } from '../node_modules/lit-html/lit-html.js';
let data = [];

const fetchData = async (time = 'daily') => {

    const response = await fetch('https://time-tracking-dashboard-a98c9-default-rtdb.europe-west1.firebasedatabase.app/.json');
    const result = await response.json();

    return result.map(({ title, timeframes }) => {
        return { title, current: timeframes[time].current, previous: timeframes[time].previous };
    });
}

data = await fetchData();

const getCardColor = (title) => {
    const colors = {
        'Work': 'light-orange',
        'Play': 'soft-blue',
        'Study': 'light-red',
        'Exercise': 'line-green',
        'Social': 'violet',
        'Self Care': 'soft-orange'
    }

    return `report-card--${colors[title]}`;
}

const cards = (data) => html`
${data.map(x => html`
<div class="report-card ${getCardColor(x.title)}">
    <img src="./images/icon-${x.title.toLowerCase().split(' ').join('-')}.svg" alt="${x.title} representing icon"
        class="report-card__icon">
    <div class="report-card__stat">
        <div class="report-card__info">
            <h2 class="report-card__title">${x.title}</h2>
            <svg class="report-card__elipsis-icon" width="21" height="5">
                <path
                    d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                    fill-rule="evenodd" />
            </svg>
        </div>
        <div class="report-card__hours">
            <p class="report-card__hours-now">${x.current}hrs</p>
            <p class="report-card__hours-before">Last week - ${x.previous}hrs</p>
        </div>
    </div>
</div>
`)}
`
const renderData = () => render(cards(data), document.getElementById('stats'));

renderData();

document.getElementById('daily').addEventListener('click', async (e) => {
    data = await fetchData();
    renderData();
    document.querySelectorAll('.stats__link').forEach(i => i.classList.remove('active-link'));
    e.target.classList.add('active-link');
});

document.getElementById('weekly').addEventListener('click', async (e) => {
    data = await fetchData('weekly');
    renderData();
    document.querySelectorAll('.stats__link').forEach(i => i.classList.remove('active-link'));
    e.target.classList.add('active-link');
});

document.getElementById('monthly').addEventListener('click', async (e) => {
    data = await fetchData('monthly');
    renderData();
    document.querySelectorAll('.stats__link').forEach(i => i.classList.remove('active-link'));
    e.target.classList.add('active-link');
});