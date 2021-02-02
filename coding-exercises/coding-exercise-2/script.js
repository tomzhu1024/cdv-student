const data = [
    {
        "timestamp": "2021-01-29T02:28:45.836Z",
        "PlayGames": 2,
        "WatchFilms": 5,
        "Karaoke": 2,
        "GoShopping": 1,
        "ShortTrips": 5,
        "PlaySports": 4
    },
    {
        "timestamp": "2021-01-29T03:21:48.822Z",
        "PlayGames": 4,
        "WatchFilms": 5,
        "Karaoke": 4,
        "GoShopping": 4,
        "ShortTrips": 4,
        "PlaySports": 3
    },
    {
        "timestamp": "2021-01-29T03:32:31.030Z",
        "PlayGames": 2,
        "WatchFilms": 4,
        "Karaoke": 2,
        "GoShopping": 1,
        "ShortTrips": 5,
        "PlaySports": 5
    },
    {
        "timestamp": "2021-01-29T03:36:51.659Z",
        "PlayGames": 3,
        "WatchFilms": 5,
        "Karaoke": 3,
        "GoShopping": 4,
        "ShortTrips": 5,
        "PlaySports": 3
    },
    {
        "timestamp": "2021-01-29T04:15:42.462Z",
        "PlayGames": 2,
        "WatchFilms": 3,
        "Karaoke": 1,
        "GoShopping": 1,
        "ShortTrips": 3,
        "PlaySports": 1
    },
    {
        "timestamp": "2021-01-29T04:17:25.581Z",
        "PlayGames": 2,
        "WatchFilms": 5,
        "Karaoke": 3,
        "GoShopping": 5,
        "ShortTrips": 5,
        "PlaySports": 3
    },
    {
        "timestamp": "2021-01-29T05:34:58.293Z",
        "PlayGames": 5,
        "WatchFilms": 4,
        "Karaoke": 3,
        "GoShopping": 4,
        "ShortTrips": 4,
        "PlaySports": 3
    },
    {
        "timestamp": "2021-01-29T09:09:29.010Z",
        "PlayGames": 2,
        "WatchFilms": 4,
        "Karaoke": 5,
        "GoShopping": 5,
        "ShortTrips": 4,
        "PlaySports": 4
    },
    {
        "timestamp": "2021-01-29T11:36:25.983Z",
        "PlayGames": 2,
        "WatchFilms": 3,
        "Karaoke": 4,
        "GoShopping": 3,
        "ShortTrips": 5,
        "PlaySports": 3
    },
    {
        "timestamp": "2021-01-30T06:31:56.993Z",
        "PlayGames": 5,
        "WatchFilms": 5,
        "Karaoke": 4,
        "GoShopping": 5,
        "ShortTrips": 5,
        "PlaySports": 4
    },
    {
        "timestamp": "2021-01-30T18:42:01.591Z",
        "PlayGames": 5,
        "WatchFilms": 4,
        "Karaoke": 5,
        "GoShopping": 2,
        "ShortTrips": 4,
        "PlaySports": 3
    }
];

const colors = [
    "#ee3737",
    "#e29e31",
    "#7ae057",
    "#0eacac",
    "#0834db",
    "#bd0fe3",
];

function addBar(title, value, range, color, animDelay) {
    const container = document.getElementById("chart-container");
    const bar = document.createElement("div");
    bar.classList.add("chart-container__bar");
    const barBar = document.createElement("div");
    barBar.classList.add("chart-container__bar__bar");
    barBar.style.backgroundColor = color;
    bar.appendChild(barBar);
    const barTitle = document.createElement("div");
    barTitle.classList.add("chart-container__bar__title");
    barTitle.innerHTML = title;
    bar.appendChild(barTitle);
    const barValue = document.createElement("div");
    barValue.classList.add("chart-container__bar__value");
    barValue.innerHTML = value.toString().slice(0, 4);
    bar.appendChild(barValue);
    container.appendChild(bar);
    setTimeout(() => {
        barBar.style.height = `${(value / range * 100).toString()}%`;
        barValue.style.bottom = `${(value / range * 100).toString()}%`;
    }, animDelay);
}

Object.keys(data[0]).filter(x => x !== "timestamp").map((keyName, index) => {
    addBar(
        keyName,
        data.map(x => x[keyName]).reduce((a, b) => a + b) / data.map(x => x[keyName]).length,
        5,
        colors[index],
        250 * index + 150,
    );
});
