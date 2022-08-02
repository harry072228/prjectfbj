const btnAdd = document.querySelector('.add_button')
const btnAddList = document.querySelector('.title')
var inputText = document.querySelector('#textBox')
const projectBox = document.getElementById('bigBox')

window.onload = () => {
	getKanban()
	saveTopic()
}

//backend過資料//

function saveTopic() {
	document.querySelector('#mainTp').addEventListener('submit', async (e) => {
		e.preventDefault()

		const form = e.target
		const formMainTopic = {}
		formMainTopic['kanban_name'] = form.kanban_name.value
		const res = await fetch('/kanban', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formMainTopic)
		})
		const result = await res.json()
		if (result) {
			getKanban()
		}
	})
}

async function getKanban() {
	const topicTitle = await fetch('/kanban')
	const kanbans = await topicTitle.json()

	let kanbanArea = document.querySelector('#kanbanArea')
	kanbanArea.innerHTML = ''
	for (let kanban of kanbans) {
		kanbanArea.innerHTML += `  <button class="del" data-id=${kanban.kanban_id}>x</button><a href="/kanbanList.html?id=${kanban.kanban_id}"> <div class="area"><span class="titleName">${kanban.kanban_name}</span></div></a>`
	}
	inactiveKanban()
}


async function inactiveKanban() {
	let delButtonElems = document.querySelectorAll('.del')
	console.log(delButtonElems);
	for (let delButtonElem of delButtonElems) {
		console.log(delButtonElem)
		delButtonElem.addEventListener('click', async () => {
			// console.log(delButtonElem)
			let delItemId = delButtonElem.dataset.id
console.log(delItemId);
			const res = await fetch(`/kanban/${delItemId}`, {
				method: 'PATCH'
			})
			if (res) {
				getKanban()
			}
		})
	}
}
