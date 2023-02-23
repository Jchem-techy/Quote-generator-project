const input = document.querySelector(`input`);
const form = document.querySelector(`form`);
let quote = document.querySelector(`#quote`);
let blockquote = document.querySelector(`blockquote`);
// this is the function that makes the request to the api endpoint
async function getApi() {
  const response = await fetch(`https://type.fit/api/quotes`);
  const datas = await response.json();
  // console.log(datas);
  return datas;
}

form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const name = input.value.trim();
  localStorage.setItem(`author`, name);
  console.log(name);
  console.log(typeof name);
  getApi()
    .then((datas) => {
      console.log(datas);
      const filtered = datas.filter((data) => {
        return data.author === name;
      });
      // console.log(filtered);
      updateUI(filtered);
    })
    .catch();
  form.reset();
});

function updateUI(filtered) {
  console.log(filtered);
  const length = filtered.length;
  const random = Math.round(Math.random() * length);
  console.log(random);
  console.log(filtered[random].text);
  quote.innerHTML = filtered[random].text;
  blockquote.style.display = `block`;
}
// an event listener is not needed to render this into the dom just call the dom rendering function on the local storage
if (localStorage.getItem(`author`)) {
  getApi()
    .then((datas) => {
      console.log(datas);
      const filtered = datas.filter((data) => {
        return data.author === localStorage.getItem(`author`);
      });
      updateUI(filtered);
    })
    .catch();
}
