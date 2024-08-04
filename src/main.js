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


cardIdButton.onclick = async (event) => {
  event.preventDefault()

  try {
    const cardId = cardIdInput.value
    const cardData = await fetchClientById(cardId)
    console.log(cardData)
  } catch (error) {
    console.log(error)
  }
}