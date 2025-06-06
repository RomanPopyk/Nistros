const safeHTML = DOMPurify.sanitize(etyContent);
document.getElementById("etymology").innerHTML = safeHTML;

var URL = "https://en.wiktionary.org/w/api.php?action=parse&page=apple&format=json&origin=*"
const data = await fetch(URL).then(response => response.json());
const htmlString = data.parse.text["*"];

const parser = new DOMParser();
const doc = parser.parseFromString(htmlString, "text/html");

document.getElementById("IPA").innerHTML = content;