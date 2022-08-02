document.querySelector("#forgot-form").addEventListener('submit', async (event) => {
    event.preventDefault()

    let res = await fetch('/forgot', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": document.querySelector("#username").value,
            "email": document.querySelector("#email").value,
            
        }) 
    })

    let result = await res.json();

    if (result.msg == "username not found") 
    {
        alert("username not found")
    }
    else if (result.msg == "email miss-match")
    {
        alert("email not match")
    }


        window.location.href = '/index.html'

})