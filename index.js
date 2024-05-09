const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const handleClick = (str) => {
    const data = document.getElementById(str).innerText;
    const textArea = document.createElement('textarea');
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textArea.value);
    document.body.removeChild(textArea);
    document.querySelector(`.cpy-${str}`).classList.add('fa-check');
    document.getElementById(`cpytxt-${str}`).innerText = "Copied!";
    setTimeout(() => {
        document.querySelector(`.cpy-${str}`).classList.remove('fa-check');
    }, 1500)
}
