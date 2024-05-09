
let actualData = [];

const faqData = async () => {
    try {
        const res = await fetch('./data.json');
        const data = await res.json();
        actualData = data.data;
    }
    catch (error) {
        console.log(error);
    }
}
// faqData();

function htmlencode(str) {
    return str.replace(/[&<>"'\t\n]/g, function ($0) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", '\t': "&ensp;", '\n': "<br>" }[$0];
    });
}


setTimeout(() => {
    actualData.forEach(element => {
        let divTag = document.createElement('div');
        divTag.classList.add('mt-3');
        divTag.innerHTML = `<div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${element.id}" aria-expanded="true" aria-controls="collapse${element.id}">
               ${element.id}. ${element.description}
            </button>
        </h2>
        <div id="collapse${element.id}" class="accordion-collapse collapse"
            data-bs-parent="#accordion-struct">
            <div class="accordion-body">
                ${htmlencode(element.implementation)}
            </div>
        </div>
    </div>`
        document.querySelector('#accordion-struct').appendChild(divTag)
    });
}, 500)


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
