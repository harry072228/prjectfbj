
var isAdmin = true
const body = document.querySelector("body"),
    sidebar = body.querySelector("nav"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");
    

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";
    }
});


document.querySelector("#logout-btn").addEventListener('click', async (event) => {
    event.preventDefault()
    let res = await fetch('/logout', {
        method: 'POST',
        body: {
            values: 1


        } 
    })

    let result = await res.json();
    console.log(result)
    if (result.result) {
        window.location.href = '/'
    }
})