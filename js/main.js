class selectInput {
    constructor(input, min, max) {
        this.input = input;
        this.value;
        this.min = min;
        this.max = max;
        this.list = this.createList();
        this.input.after(this.list);
        this.input.addEventListener("click", () => {
            this.list.classList.toggle("select-block_hidden");
        })
        this.list.addEventListener("click", (e) => {
            this.value = e.target.dataset.value;
            this.input.textContent = this.value;
            this.list.classList.toggle("select-block_hidden");

        })
    }
    createList() {
        const selectBlock = document.createElement("div");
        selectBlock.classList.add("select-block");
        selectBlock.classList.add("select-block_hidden");
        for (let i = this.max; i >= this.min; i--) {
            selectBlock.appendChild(this.createElement(i))
        }
        return selectBlock;
    }
    createElement(value) {
        const el = document.createElement("span");
        el.classList.add("select-element");
        el.textContent = value;
        el.setAttribute('data-value', value);
        return el;
    }
    validator() {
        this.input.classList.remove("input-error");
        if (this.value === undefined) {
            this.input.classList.add("input-error")
            return false;
        }
        return true;
    }
    getValue() {
        return this.value;
    }
}
const day = new selectInput(document.querySelector("._day"), 1, 31);
const month = new selectInput(document.querySelector("._month"), 1, 12);
const year = new selectInput(document.querySelector("._year"), 1940, 2003);



const progressBar = document.querySelector(".progress-bar-fill");
const progressText = document.querySelector(".progress-bar-value");
const commentText = document.querySelector(".comment__value");
let data;

document.addEventListener("click", async(e) => {
    if (e.target.classList.contains("_btn1")) {
        showBlock("._q1", "._q2")
    }
    if (e.target.classList.contains("_btn2")) {
        showBlock("._q2", "._q3")
    }
    if (e.target.classList.contains("_btn3")) {
        if (day.validator() && month.validator() && year.validator()) {
            showBlock("._q3", "._q4")
            setTimeout(() => {
                showBlock("._q4", "._q5")
            }, 3000)
        }
    }
    if (e.target.classList.contains("_btn4")) {
        let age = new Date().getFullYear() - year.getValue();
        if (age > 17 && age <= 35) {
            commentText.textContent = "По вам скучает очень близкий человек, которого больше нет в мире живых."
        } else if (age > 35 && age <= 45) {
            commentText.textContent = "По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это дедушка или бабушка."
        } else {
            commentText.textContent = "По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это кто-то из Ваших родителей."
        }

        showBlock("._q5", "._q6")
    }
    if (e.target.classList.contains("_btn5")) {
        startProgress()
    }
    if (e.target.classList.contains("btn-call")) {
        if (data === undefined) {
            data = await getData();
            const dataBlock = document.createElement("div")
            dataBlock.classList.add("data-block");
            for (key in data) {
                const dataElement = document.createElement("div")
                dataElement.classList.add("data-element");
                const dataTitle = document.createElement("span")
                dataTitle.classList.add("data-element__title");
                const dataValue = document.createElement("span")
                dataValue.classList.add("data-element__value");

                dataTitle.textContent = key;
                dataValue.textContent = data[key];
                dataElement.appendChild(dataTitle);
                dataElement.appendChild(dataValue);
                dataBlock.appendChild(dataElement);
            }
            e.target.after(dataBlock);
        }
    }
    if (e.target.classList.contains("footer__text")) {
        e.target.classList.toggle("footer__text_overflow")
    }
})

function startProgress() {
    showBlock("._q6", "._q7")
    let i = 0;
    let interval = setInterval(() => {
        if (i == 100) {
            clearInterval(interval);
            showBlock("._q7", "._q8")
        }
        progressBar.style.width = `${i}%`;
        progressText.textContent = `${i}%`;
        i++;

    }, 50)
}
async function getData() {
    let response = await fetch("https://swapi.dev/api/people/1/");
    let json = response.ok ? response.json() : "Ошибка HTTP: " + response.status;
    return json;
}

function showBlock(block1, block2) {
    document.querySelector(block1).classList.toggle("display-none");
    document.querySelector(block2).classList.toggle("display-none");
}