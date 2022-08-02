let params = new URLSearchParams(window.location.search)
let userId = params.get('id')

window.onload = async () => {
    getIcon()

    getBackground()

    getUser()
}

async function getIcon() {
    let res = await fetch(`/getIcon`)
    let result = await res.json()

    document.querySelector('.profileIcon').innerHTML = /*HTML */
        `<img src='/${result.photoResult.profile_pic}' class="rounded-circle" width="80">`

}

async function getBackground() {
    let res = await fetch(`/getBackground`)
    let result = await res.json()

    document.querySelector('.profileBackground').innerHTML = /*HTML */
        `<img src='/${result.photoResult.profile_background}'>`

}

async function getUser(){
    let res = await fetch(`/getUsername`)
    let result = await res.json()

    document.querySelector('.mb-0').innerHTML = /*HTML */
        ` <h4 class="mb-0">${result.userResult.username}</h4>`

}



if (document.querySelector('.profileForm') != null) {
    document.querySelector(".profileForm").addEventListener('submit', async (event) => {
        event.preventDefault()


        const formData = new FormData(document.querySelector(".profileForm"));
        let res = await fetch('/profileUpdate', {
            method: 'POST',
            body: formData
        })


        let result = await res.json();


        if (result.result) {
            alert("update success")

            window.location.href = '/profile.html'
        } else if (result.msg == 'Username already exists') {
            alert("Username already exists")
        }
    })
}

if (document.querySelector('.profilePictureForm') != null) {
    document.querySelector(".profilePictureForm").addEventListener('change', async (event) => {
        event.preventDefault()


        const formData = new FormData(document.querySelector(".profilePictureForm"));
        let res = await fetch('/profileUpdateIcon', {
            method: 'POST',
            body: formData
        })


        let result = await res.json();


        if (result.result) {
            getIcon()
        } else {
            console.log(result.error)
        }
    })
}

if (document.querySelector('.profileBackgroundFrom') != null) {
    document.querySelector(".profileBackgroundFrom").addEventListener('change', async (event) => {
        event.preventDefault()


        const formData = new FormData(document.querySelector(".profileBackgroundFrom"));
        let res = await fetch('/profileUpdateBackground', {
            method: 'POST',
            body: formData
        })


        let result = await res.json();


        if (result.result) {
            getBackground()
        } else {
            console.log(result.error)
        }
    })
}



// async function getUserList() {
//     let res = await fetch(`/getUser`)
//     let users = await res.json()

//     console.log(users)


//     // let usersList = document.querySelector('.usersList')
//  let userArea = document.querySelector('#userArea')
//     userArea.innerHTML = ''
//     for (let i = 0; i < users.result.length; i++) {
//         userArea.innerHTML += /*HTML */
//             `<div id="b" class="user" data-id=${users.result[i].id}>
//             <div class="userIcon">
//                 <img src='/${users.result[i].profile_pic}' class="rounded-circle" width="80">
//             </div>
//             <div id="b" class="userName">
//                 <p>${users.result[i].username}</p>
//             </div>
//             <div id="b" class="userEmail">
//                 <p>${users.result[i].email}</p>
//             </div>
//             <div id="b" class="userDelete">
//                 <button data-id=${users.result[i].id}>X</button>
//             </div>
//         </div>`
//     }
//     inactiveUser()
// }

// async function inactiveUser() {

//     let delButtonElems = document.querySelectorAll('.userDelete button')
//     for (let delButtonElem of delButtonElems) {
//         // console.log(delButtonElem)
//         delButtonElem.addEventListener('click', async () => {

//             let userId = delButtonElem.dataset.id
//             console.log(userId)

//             const res = await fetch(`/patchUser`, {
//                 method: 'PATCH',
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     "delUserId": userId,
//                     "isActive": false
//                 })
//             })
//             document.querySelector('#b').innerHTML = ''
//             if (res) {
//                 getUserList()
//             }
//         })

//     }
// }
