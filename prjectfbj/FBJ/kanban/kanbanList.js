const btnAdd = document.querySelector('.add_button')
const btnAddList = document.querySelector('.title')
var inputText = document.querySelector('#textBox')
const projectBox = document.getElementById('bigBox')

let params = new URLSearchParams(window.location.search)
let kanbanId = params.get('id')

window.onload = async () => {
	getKanbanitem()
	savelist()
	addMember()
}

async function savelist() {
	document.querySelector('#mainLT').addEventListener('submit', async (e) => {
		e.preventDefault()

		const form = e.target
		const formMainList = {}
		formMainList['item_name'] = form.itembox.value
		const res = await fetch(`/kanbanItem/${kanbanId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formMainList)
		})
		const result = await res.json()
		if (result) {
			getKanbanitem()
		}
	})
}

async function getKanbanitem() {
	const res = await fetch(`/kanbanItem/${kanbanId}`)
	const kanbanItems = await res.json()

	let kanbanArea = document.querySelector('#bigBox')
	kanbanArea.innerHTML = ''
	for (let kanbanItem of kanbanItems) {
		kanbanArea.innerHTML += `
		
		<form class="modal" id="todo_form${kanbanItem.id}">
        <div class="header">
          <div class="title">Add To do</div>
          <button type="button" class="btn close-modal">&times;</button>
        </div>
        <div class="body">
          <div>Topic</div>
          <input name="topic" class="addCul" type="text" id="topic">
          <div>Content</div>
          <input name="content" class="addCul" type="text" id="content" />
          <div>DeadLine</div>
<input name="time" type="datetime-local" id="time"name="meeting-time" value="2018-06-12T19:30">
          <input type="submit" value="submit" id="todo_submit" data-id=${kanbanItem.id} />
        </div>
      </form>
  
  <div class="pj" data-id=${kanbanItem.id}><p class="textB">${kanbanItem.item_name}</p><button class="del" data-id=${kanbanItem.id} title="Delete element">X</button><div class="bigBoxShadow list${kanbanItem.id}" title="Add" id="List" ></div><button title="Add Item" id="addCul" data-target-modal="#todo_form${kanbanItem.id}" >Add Item</button></div>`
	}
	inactiveKanbanItem()
	modal()
	addDragEvents()
	getTodo()

	// create to do

	const todo_submits = document.querySelectorAll('#todo_submit')
	for (let todo_submit of todo_submits) {
		// console.log(todo_submit)
		todo_submit.addEventListener('click', (e) => {
			e.preventDefault()
			let itemId = todo_submit.dataset.id
			createTodo(itemId)
		})
	}
}
async function inactiveKanbanItem() {
	let delButtonElems = document.querySelectorAll('.del')
	// console.log(delButtonElems);
	for (let delButtonElem of delButtonElems) {
		// console.log(delButtonElem)
		delButtonElem.addEventListener('click', async () => {
			// console.log(delButtonElem)
			let delItemId = delButtonElem.dataset.id

			const res = await fetch(`/kanbanItem/${delItemId}`, {
				method: 'PATCH'
			})
			if (res) {
				getKanbanitem()
			}
		})
	}
}


function addMember() {
	let addUserButton = document.querySelector('#addUserButton')

	addUserButton.addEventListener('click', async (e) => {
		let addEmail = document.querySelector('#userBox').value
		const res = await fetch(
			`/kanbanMember?email=${addEmail}&&id=${kanbanId}`,
			{
				method: 'POST'
			}
		)
		const result = await res.json()
		if (res) {
			document.querySelector('#userBox').value = ''
		}
	})
}
//<-------------------------------------->//

// function AddNewDiv(txt, isCrossed) {
// 	var newDiv = document.createElement('div')
// 	newDiv.classList.add('pj')
// 	if (isCrossed) newDiv.classList.add('crossed')
// 	projectBox.appendChild(newDiv)

// 	var newDivTxt = document.createElement('p')
// 	newDivTxt.classList.add('textB')
// 	newDivTxt.innerText = txt
// 	newDivTxt.title = txt
// 	newDiv.appendChild(newDivTxt)

// 	var divDel = document.createElement('span')
// 	divDel.classList.add('del')
// 	divDel.innerText = 'X'
// 	divDel.title = 'Delete element'
// 	divDel.addEventListener('click', deleteTodo)
// 	newDiv.appendChild(divDel)

// 	var newDivBackground = document.createElement('div')
// 	newDivBackground.classList.add('bigBoxShadow')
// 	newDivBackground.title = 'Add'
// 	newDivBackground.id = 'List'
// 	newDivBackground.setAttribute('draggable', 'true')
// 	newDiv.appendChild(newDivBackground)

// 	//   var newDivBack = document.createElement("text");
// 	//   newDivBack.classList.add("bigBoxShadow");
// 	//   newDivBack.title = "Add";
// 	//   newDivBack.id = "List";
// 	//   newDivBack.setAttribute("draggable", "true");
// 	//   newDiv.appendChild(newDivBackground);

// 	var addTodoList = document.createElement('button')
// 	addTodoList.classList.add('item')
// 	addTodoList.innerText = 'Add Item'
// 	addTodoList.title = 'Add Item'
// 	addTodoList.id = 'addCul'
// 	addTodoList.setAttribute('data-target-modal', '#todo_form')
// 	addTodoList.addEventListener('click', modal)
// 	newDiv.appendChild(addTodoList)
// 	addDragEvents()
// }

// //add div//
// const newListDiv = document.createElement('item')
// const divStatus = document.getElementsByClassName('bigBoxShadow')

// function ListDiv() {
// 	const listDiva = document.createElement('div')
// 	listDiva.classList.add('square')
// 	document.getElementById('List').appendChild(listDiva)
// }

//----------//
// add list//

function modal() {
	const btns = document.querySelectorAll('[data-target-modal]')
	const close_modals = document.querySelectorAll('.close-modal')
	const overlay = document.getElementById('overlay')

	btns.forEach((btn) => {
		btn.addEventListener('click', () => {
			document
				.querySelector(btn.dataset.targetModal)
				.classList.add('active')
			overlay.classList.add('active')
		})
	})

	close_modals.forEach((btn) => {
		btn.addEventListener('click', () => {
			console.log('click close')
			const modal = btn.closest('.modal')
			modal.classList.remove('active')
			overlay.classList.remove('active')
		})
	})

	window.onclick = (event) => {
		if (event.target == overlay) {
			const modals = document.querySelectorAll('.modal')
			modals.forEach((modal) => modal.classList.remove('active'))
			overlay.classList.remove('active')
		}
	}
}

async function createTodo(item_id) {
	let formElm = document.querySelector(`#todo_form${item_id}`)

	const input_topic = formElm.topic.value
	const input_content = formElm.content.value
	const input_time = formElm.time.value
	let bodyObj = {}
	bodyObj['topic'] = input_topic
	bodyObj['content'] = input_content
	bodyObj['time'] = input_time
	bodyObj['itemid'] = item_id
	console.log('submit to do obj:', bodyObj)
	const res = await fetch(`/kanbanContent`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bodyObj)
	})
	const result = await res.json()
	if (res) {
		formElm.reset()
		getTodo()
	}
}

async function getTodo() {
	const resContent = await fetch(`/kanbanContent/${kanbanId}`)
	const kanbanContents = await resContent.json()
	let bigboxs = document.querySelectorAll('.bigBoxShadow')
	for (let bigbox of bigboxs) {
		// console.log(bigbox);
		bigbox.innerHTML = ''
	}
console.log(kanbanContents);
	if(kanbanContents!==null){
		for (let kanbanContent of kanbanContents) {
			console.log('kanbanContent :',kanbanContent );
			const itemArea = document.querySelector(
				`.list${kanbanContent.kanban_item_id}`
			)
			console.log(itemArea);
			itemArea.innerHTML += `<div class="todo" data-id=${kanbanContent.listid} draggable="true" ><button class="close" data-id=${kanbanContent.listid}>×</button><div>${kanbanContent.kanban_topic}</div><br><div>${kanbanContent.kanban_content}</div><br><div>${kanbanContent.kanban_deadline}</div></div>`
	
		}
		let todos = document.querySelectorAll('.todo')
		for (let todo of todos) {
			todo.addEventListener('dragstart', dragStart)
			todo.addEventListener('dragend', dragEnd)
	
			document.getElementById('topic').value = ''
			document.getElementById('content').value = ''
			document.getElementById('time').value = ''
			// todo_form.classList.remove('active')
			overlay.classList.remove('active')
		}
		inactiveKanbanItemList()
	}

	

	/* create span */
	// const span = document.createElement("span");
	// const span_txt = document.createTextNode("\u00D7");
	// span.classList.add("close");
	// span.appendChild(span_txt);

	// no_status.appendChild(todo_div);

	// 	const closeButtons = document.querySelectorAll('.close')
	// 	for (let closeButton of closeButtons) {
	// 		closeButton.addEventListener('click', () => {
	// 			closeButton.parentElement.style.display = 'none'
	// 		})
	// 	}

	// 	//   console.log(todo_div);
	
}

async function inactiveKanbanItemList() {
	let delItemButtonElems = document.querySelectorAll('.close')
	for (let delItemButtonElem of delItemButtonElems) {
		delItemButtonElem.addEventListener('click', async () => {
			// console.log(delItemButtonElem)
			let delkanbanItemId = delItemButtonElem.dataset.id
			// console.log(delkanbanItemId)
			const res = await fetch(`/kanbanContent/${delkanbanItemId}`, {
				method: 'PATCH'
			})
			if (res) {
				getTodo()
				window.location.reload()
			}
		})
	}
}

// const close_btns = document.querySelectorAll('.close')

// close_btns.forEach((btn) => {
// 	btn.addEventListener('click', () => {
// 		console.log('clicked')
// 		btn.parentElement.style.display = 'none'
// 	})
// })

function dragStart() {
	console.log('dragStart')
	draggableTodo = this
	setTimeout(() => {
		this.style.display = 'none'
	}, 0)
	// console.log('dragStart')
}

async function dragEnd() {
	draggableTodo = null
	setTimeout(() => {
		this.style.display = 'block'
	}, 0)
	let newItemId=this.parentNode.dataset.id
	let itemContentId=this.dataset.id
	console.log({newItemId,itemContentId});
	const res = await fetch(`/kanbanItem_id/${itemContentId}?id=${newItemId}`, {
		method: 'PATCH'
	})
	if(res){
	getKanbanitem()
	}
}

function addDragEvents() {
	let all_status = document.querySelectorAll('.pj')
	// console.log(all_status);

	all_status.forEach((status) => {
		// console.log(status)
		status.addEventListener('dragover', dragOver)
		status.addEventListener('dragenter', dragEnter)
		status.addEventListener('dragleave', dragLeave)
		status.addEventListener('drop', dragDrop)
	})
	
}

function dragOver(e) {
	e.preventDefault()
	//   console.log("dragOver");
}

function dragEnter() {
	this.style.border = '1px dashed #ccc'
	// console.log('dragEnter')
}

function dragLeave() {
	this.style.border = 'none'
	// console.log('dragLeave')
}

function dragDrop() {
	this.style.border = 'none'
	this.appendChild(draggableTodo)
	// console.log('dropped')
}

document.querySelector('.todo')
