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

const userNameSpan = document.getElementById("user-name")
const clientSinceSpan = document.getElementById("client-since")

const loadUserData = ({ name, clientSince }) => {
  userNameSpan.textContent = name
  clientSinceSpan.textContent = `Cliente desde ${clientSince}`
}

const idHandle = document.getElementById("user-id")
const cardList = document.getElementsByClassName("card-list")[0]

const loadLoyaltyCardData = ({ id, totalCuts }) => {
  idHandle.textContent = `ID: ${id}`

  const cardItems = Array.from(cardList.children)

  for (i = 0; i < 10; i++) {
    cardItems[i].innerHTML = ""
  }

  for (i = 0; i < totalCuts; i++) {
    const checkIcon = document.createElement("img")
    checkIcon.setAttribute("src", "./src/assets/PinCheck.png")

    cardItems[i].appendChild(checkIcon)
  }
}

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

const numberOfRemainingCuts = document.getElementById("cuts-remaining")
const cutsProgress = document.getElementById("cuts-progress")
const progressBar = document.getElementsByClassName("progress-bar-track")[0]

const loadRemainingCutsData = ({ cutsRemaining, totalCuts }) => {
  numberOfRemainingCuts.textContent = cutsRemaining
  cutsProgress.textContent = `${totalCuts} de 10`

  progressBar.classList = ""
  progressBar.classList.add("progress-bar-track", "progress-bar-track::before")

  const style = document.createElement('style')

  const totalCutsInPercentage = totalCuts * 10

  const rule = `.progress-bar-track::before { width: ${totalCutsInPercentage}% !important; }`
  style.innerHTML = rule

  document.head.appendChild(style)
}

cardIdButton.onclick = async (event) => {
  event.preventDefault()

  try {
    const cardId = cardIdInput.value
    const cardData = await fetchClientById(cardId)

    const {
      id,
      name,
      clientSince,
      appointmentHistory,
      loyaltyCard
    } = cardData

    const { cutsRemaining, totalCuts } = loyaltyCard

    loadUserData({ name, clientSince })
    loadLoyaltyCardData({ id, totalCuts })
    loadHistory(appointmentHistory)
    loadRemainingCutsData({ cutsRemaining, totalCuts })
  } catch (error) {
    console.log(error)
  }
}

