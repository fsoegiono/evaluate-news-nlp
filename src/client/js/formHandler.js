function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value
  Client.checkForName(formText)

  console.log("::: Form Submitted :::")
  fetch('/sentiment', {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: formText
    })
  })
  .then(res => res.json())
  .then(function(res) {
    let result = document.getElementById('results')
    result.display = 'none'
    result.innerHTML = `
      <div>Text: ${res.text} </div>
      <div>Polarity: ${res.polarity}</div>
      <div>Subjectivity: ${res.subjectivity}</div>
    `
    result.display = 'block'
  })
}

export { handleSubmit }
