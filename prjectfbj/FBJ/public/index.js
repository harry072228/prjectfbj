document.querySelector("#login-form").addEventListener('submit', async (event) => {
    event.preventDefault()

    let res = await fetch('/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": document.querySelector("#username").value,
            "password": document.querySelector("#password").value,
            // "isAdmin": isAdmin
        }) // FormData 會自動幫你加 headers 的, 所以不用再加
    })

    

    let result = await res.json();
    // console.log(result)

    if (result.msg == "username not found") 
    {
        alert("username not found")
    }
    else if (result.msg == "password miss-match")
    {
        alert("password not match")
    }else if (result.result)
    {
        window.location.href = "/main.html"
    }

    // if (
        
    //     result.msg !== "incorrect login credentials"
    //     ) 
    // {
    //     window.location.href = "/main.html"
    // } else {
    //     alert("incorrect login credentials")
    // }


})