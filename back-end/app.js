const safeHTML = DOMPurify.sanitize(etyContent);
document.getElementById("etymology").innerHTML = safeHTML;