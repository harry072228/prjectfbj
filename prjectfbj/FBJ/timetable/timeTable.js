let nav = 0 //有效追蹤月份
let clicked = null
var events = []

// let events = localStorage.getItem('events')
// 	? JSON.parse(localStorage.getItem('events'))
// 	: []
const calendar = document.getElementById('calendar')
const newEventModal = document.getElementById('newEventModal')
const deleteEventModal = document.getElementById('deleteEventModal')
const backDrop = document.getElementById('modalBackDrop')
const eventTitleInput = document.getElementById('eventTitleInput')
const timeTitleInput = document.getElementById('timeTitleInput')
const departmentTitleInput = document.getElementById('departmentTitleInput')
const weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]

function openModal(date) {
	clicked = date
	// events=await getSchedule()
	// console.log('line 27:', events)
	const eventForDay = events.find((e) => e.date === clicked)

	if (eventForDay) {
		document.getElementById('eventText').innerText =
			eventForDay.topic +
			'\n' +
			eventForDay.clock +
			'\n' +
			eventForDay.department
		deleteEventModal.style.display = 'block'
	} else {
		newEventModal.style.display = 'block'
	}

	backDrop.style.display = 'block'
}

async function load() {
	const dt = new Date()

	if (nav !== 0) {
		dt.setMonth(new Date().getMonth() + nav)
	}

	const day = dt.getDate()
	const month = dt.getMonth()
	const year = dt.getFullYear()

	const firstDayOfMonth = new Date(year, month, 1)
	const daysInMonth = new Date(year, month + 1, 0).getDate()

	const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	})
	const paddingDays = weekdays.indexOf(dateString.split(', ')[0])

	document.getElementById(
		'monthDisplay'
	).innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`

	calendar.innerHTML = ''
	events = await getSchedule()
	for (let i = 1; i <= paddingDays + daysInMonth; i++) {
		const daySquare = document.createElement('div')
		daySquare.classList.add('day')

		const dayString = `${month + 1}/${i - paddingDays}/${year}`

		if (i > paddingDays) {
			daySquare.innerText = i - paddingDays

			const eventForDay = events.find((e) => e.date === dayString)

			if (i - paddingDays === day && nav === 0) {
				daySquare.id = 'currentDay'
			}

			if (eventForDay) {
				const eventDiv = document.createElement('div')
				eventDiv.setAttribute('data-eventId', eventForDay.id)
				eventDiv.classList.add('event')
				eventDiv.innerText =
					eventForDay.topic +
					'\n' +
					eventForDay.clock +
					'\n' +
					eventForDay.department
				daySquare.appendChild(eventDiv)
			}

			daySquare.addEventListener('click', () => openModal(dayString))
		} else {
			daySquare.classList.add('padding')
		}

		calendar.appendChild(daySquare)
	}
}

function closeModal() {
	console.log('closeModal')
	eventTitleInput.classList.remove('error')
	newEventModal.style.display = 'none'
	deleteEventModal.style.display = 'none'
	backDrop.style.display = 'none'
	eventTitleInput.value = ''
	timeTitleInput.value = ''
	departmentTitleInput.value = ''
	clicked = null
	load()
}

function saveEvent() {
	document
		.querySelector('#timetable')
		.addEventListener('submit', async (e) => {
			e.preventDefault()
			const form = e.target
			const formObject = {}
			formObject['date'] = clicked
			formObject['topic'] = form.meetingTopic.value
			formObject['clock'] = form.timesObject.value
			formObject['department'] = form.departmentObject.value
			console.log(
				form.meetingTopic.value,
				form.timesObject.value,
				form.departmentObject.value
			)
			const res = await fetch('/timetable', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formObject)
			})
			const result = await res.json()
			if (result) {
				closeModal()
				window.location.reload()
			}
		})
}

async function getSchedule() {
	const result = await fetch('/timetable')
	const timetable = await result.json()

	events = timetable

	return events
}

//   if (eventTitleInput.value) {
//     eventTitleInput.classList.remove('error');

//     events.push({
//       date: clicked,
//       title: eventTitleInput.value,
//       time : timeTitleInput.value,
//       department : departmentTitleInput.value,
//     });

//     localStorage.setItem('events', JSON.stringify(events));
//     closeModal();
//   } else {
//     eventTitleInput.classList.add('error');
//   }
// 	)
// }

async function deleteEvent() {
	console.log(clicked)
	await fetch(`/timetable?date=${clicked}`, { method: 'DELETE' })
	// await fetch(`/timetable?date=${clicked}`,{method:"DELETE"})

	// events = events.filter((e) => e.date !== clicked)
	// localStorage.setItem('events', JSON.stringify(events))
	closeModal()
}

function initButtons() {
	document.getElementById('nextButton').addEventListener('click', () => {
		nav++
		load()
	})

	document.getElementById('backButton').addEventListener('click', () => {
		nav--
		load()
	})

	document.getElementById('saveButton').addEventListener('click', saveEvent)
	document
		.getElementById('cancelButton')
		.addEventListener('click', closeModal)
	document
		.getElementById('deleteButton')
		.addEventListener('click', deleteEvent)
	document.getElementById('closeButton').addEventListener('click', closeModal)
}

initButtons()
load()
