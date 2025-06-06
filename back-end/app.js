/* 
const safeHTML = DOMPurify.sanitize(etyContent);
document.getElementById("etymology").innerHTML = safeHTML;
*/
function fetchFromInput() {
    const word = document.getElementById("search-button").value.trim();
    fetchIPA(word);
}

async function fetchIPA(word) {
    /* if (!word) {
        console.error("No word provided for IPA lookup.");
        return;
    } */
    const URL = `https://en.wiktionary.org/w/api.php?action=parse&page=${word}&format=json&origin=*`;
    const data = await fetch(URL).then(response => response.json());
    const htmlString = data.parse.text["*"];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    console.log(data.parse.text["*"])

    const ipaElements = doc.querySelector(".mw-heading");

    document.getElementById("etymonline-results").innerText = JSON.stringify(data, null, 2);


}
     
     /*
    var URL = "https://en.wiktionary.org/w/api.php?action=parse&page=apple&format=json&origin=*"
    const data = await fetch(URL).then(response => response.json());
    const htmlString = data.parse.text["*"];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html"); */

/* document.getElementById("IPA").innerHTML = content || "No IPA found."; */

/* async function fetchIPA() {
  // 1. Fetch from Wiktionary API
  const URL = "https://en.wiktionary.org/w/api.php?action=parse&page=apple&format=json&origin=*";
  const data = await fetch(URL).then(response => response.json());

  // 2. Get raw HTML content as string
  const htmlString = data.parse.text["*"];

  // 3. Parse HTML string into a DOM object
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 4. Find the IPA section
  // Look for the <span class="IPA"> elements
  const ipaElements = doc.querySelectorAll(".IPA");

  // 5. Combine all IPA elements into one string
  let content = "";
  ipaElements.forEach(el => {
    content += `<p>${el.textContent}</p>`;
  });

  // 6. Inject into your website
  document.getElementById("IPA").innerHTML = content || "No IPA found.";
} */