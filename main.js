const clientsUrl = "http://localhost:3000/clients/";

async function fetchClientById(id) {
  const res = await fetch(`${clientsUrl}${id}`)
  const data = await res.json()
  console.log(data)
}

fetchClientById('124-537-835-230')