let params = new URLSearchParams(window.location.search)
let userId = params.get('id')
// console.log(userId)
let searchQuery = ""

// window.onload = async () => {

    getUserList(searchQuery)
// }



async function getUserList(searchQuery) {
    console.log(searchQuery)
    let res = await fetch(`/user?keyword=${searchQuery}`)
    let users = await res.json()

    // console.log(users)


    let userArea = document.querySelector('#userArea')
    userArea.innerHTML = ''
    for (let i = 0; i < users.result.length; i++) {
        userArea.innerHTML += /*HTML */
            `<tr>

            <td class="user" scope="row" data-id=${users.result[i].id}>
            ${users.result[i].username}
            </td>

            <td class="userCreatedAt">
            ${users.result[i].created_at}
            </td>

            <td class="userStatus">
            ${users.result[i].status}
            </td>

            <td class="userEmail">
            ${users.result[i].email}
            </td>

            <td class="userDelete">
            <button data-id=${users.result[i].id}>Layoff</button>

            </td>

            </tr>`
    }

    inactiveUser()
}

async function inactiveUser() {

    let delButtonElems = document.querySelectorAll('.userDelete button')
    for (let delButtonElem of delButtonElems) {
        // console.log(delButtonElem)
        delButtonElem.addEventListener('click', async () => {

            let userId = delButtonElem.dataset.id
            console.log(userId)

            const res = await fetch(`/user/${userId}`, {
                method: 'PATCH',

            })


            getUserList("")
        })
    }
}

document.querySelector('.search').addEventListener('keydown', async (event) => {
    searchQuery = document.querySelector('.search').value
    // console.log(searchQuery)

    getUserList(searchQuery);

})
