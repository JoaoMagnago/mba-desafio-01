const baseUrl = "http://localhost:3000";

const clientsUrl = `${baseUrl}/clients/`;

async function fetchClientById(id) {
  try {
    const res = await fetch(`${clientsUrl}${id}`)
    const data = await res.json()

    return data
  } catch (error) {
    alert(`Não foi possível carregar o cliente com o id: "${id}"`)
    console.log(error)
  }
}

const cardIdButton = document.getElementById("search-card");
const cardIdInput = document.getElementsByTagName("input")[0];

cardIdInput.addEventListener('input', () => {
  const hasCharactersRegex = /[^\d-]/g;
  cardIdInput.value = cardIdInput.value.replace(hasCharactersRegex, '');
});

const userNameSpan = document.getElementById("user-name")
const userAvatar = document.querySelector("#user-avatar")
const clientSinceSpan = document.getElementById("client-since")

const loadUserData = ({ name, avatar, clientSince }) => {
  userNameSpan.textContent = name
  clientSinceSpan.textContent = `Cliente desde ${clientSince}`

  userAvatar.setAttribute("src", avatar)
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

  if (totalCuts < 10) {
    const defaultGiftIcon = document.createElement("img")
    defaultGiftIcon.setAttribute("src", "./src/assets/icons/gift.svg")
    defaultGiftIcon.classList.add("gift")

    cardItems[9].appendChild(defaultGiftIcon)
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
      avatar,
      clientSince,
      appointmentHistory,
      loyaltyCard
    } = cardData

    const { cutsRemaining, totalCuts } = loyaltyCard

    loadUserData({ name, avatar, clientSince })
    loadLoyaltyCardData({ id, totalCuts })
    loadHistory(appointmentHistory)
    loadRemainingCutsData({ cutsRemaining, totalCuts })

    if (totalCuts === 10) {
      setTimeout(() => alert('Parabéns! Seu próximo corte é gratuito!'), 50)
    }
  } catch (error) {
    console.log(error)
  }
}

