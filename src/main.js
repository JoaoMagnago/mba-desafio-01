const baseUrl = "http://localhost:3000";

const clientsUrl = `${baseUrl}/clients/`;

async function fetchClientById(id) {
  try {
    const res = await fetch(`${clientsUrl}${id}`)
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

const cardIdButton = document.getElementById("search-card");
const cardIdInput = document.getElementsByTagName("input")[0];
const history = document.getElementById("history")

const loadHistory = (appointmentHistory) => {
  const historyCountSpan = document.getElementById("history-count")

  historyCountSpan.textContent = `${appointmentHistory.length} cortes`

  history.innerHTML = ""

  appointmentHistory.map((haircut) => {
    const item = document.createElement("li")
    const dateTimeDiv = document.createElement("div")
    const date = document.createElement("span")
    const time = document.createElement("span")

    date.textContent = haircut.date
    time.textContent = haircut.time

    const checkIcon = document.createElement("img")
    checkIcon.classList.add("check-icon")
    checkIcon.setAttribute("src", "./src/assets/icons/SealCheckGreen.svg")
    checkIcon.setAttribute("alt", "Ícone de confirmação do corte")

    dateTimeDiv.append(date, time)

    item.append(dateTimeDiv, checkIcon)

    item.classList.add("history-item")

    history.appendChild(item)
  })
}

cardIdButton.onclick = async (event) => {
  event.preventDefault()

  try {
    const cardId = cardIdInput.value
    const cardData = await fetchClientById(cardId)

    const { appointmentHistory } = cardData

    loadHistory(appointmentHistory)
  } catch (error) {
    console.log(error)
  }
}

