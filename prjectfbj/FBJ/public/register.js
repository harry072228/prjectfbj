
if (document.querySelector('.registerForm') != null) {
    document.querySelector(".registerForm").addEventListener('submit', async (event) => {
        event.preventDefault()
        
    
        const formData = new FormData(document.querySelector(".registerForm"));
        let res = await fetch('/register', {
            method: 'POST',
            body: formData // FormData 會自動幫你加 headers 的, 所以不用再加
        })
    
        let result = await res.json();

        console.log(result)


        if (result.msg == "username already exists") 
        {
            alert("username already exist")
        }
        else if (result.msg == "email already exists")
        {
            alert("email already exist")
        }
        else if (result.msg == 'missing username, password or email')
        {
            alert("missing username, password or email")
        }
        else if (result)
        {
            window.location.href = '/index.html'
        }

   
    })
    }