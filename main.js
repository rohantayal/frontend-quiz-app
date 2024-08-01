document.addEventListener("DOMContentLoaded", () => {

    const htmlElements = {
        r: document.querySelector(":root"),
        range: document.getElementById("quiz-progress"),
        slider: document.getElementById("light-dark-checkbox"),
        radios: document.querySelectorAll(".subject"),
        articles: document.querySelectorAll("article"),

        currSubWrap: document.querySelector("header"),
        curr: document.querySelectorAll(".curr-subject"),
        icons: document.querySelectorAll(".subject-wrap"),

        choices: document.querySelectorAll(".choice"),
        submitAnswer: document.querySelector(".submit-answer"),
        nextQuestion: document.querySelector(".next-question"),
        resetbtn: document.getElementById("reset"),
    }

    const texts = {
        select: "please select an answer",
    }

    const currSubject = {
        html: htmlElements.icons[0].innerHTML,
        css: htmlElements.icons[1].innerHTML,
        js: htmlElements.icons[2].innerHTML,
        accessibility: htmlElements.icons[3].innerHTML,
    }

    let selectedAns = "";
    let score = 0;

    htmlElements.radios.forEach(radio => {
        radio.addEventListener("change", () => {

            if (radio.checked) {
                htmlElements.articles.forEach(article => {
                    article.classList.remove("active");
                });

                htmlElements.articles[1].classList.add("active");
                let subjectChosen = radio.value;

                if (subjectChosen == "html") {
                    htmlElements.curr[0].innerHTML = currSubject.html;
                    htmlElements.curr[1].innerHTML = currSubject.html;
                }
                else if (subjectChosen == "css") {
                    htmlElements.curr[0].innerHTML = currSubject.css;
                    htmlElements.curr[1].innerHTML = currSubject.css;
                }
                else if (subjectChosen == "js") {
                    htmlElements.curr[0].innerHTML = currSubject.js;
                    htmlElements.curr[1].innerHTML = currSubject.js;
                }
                else if (subjectChosen == "accessibility") {
                    htmlElements.curr[0].innerHTML = currSubject.accessibility;
                    htmlElements.curr[1].innerHTML = currSubject.accessibility;
                }
            }
            radio.checked = false;
        })
    })

    htmlElements.range.addEventListener("input", () => {
        let value = (htmlElements.range.value / htmlElements.range.max) * 100;
        let color = "linear-gradient(to right, var(--purple) 0%, var(--purple) " + value + "%, var(--container-bgr) " + value + "%, var(--container-bgr) 100%)";
        htmlElements.range.style.background = color;
    });

    htmlElements.slider.addEventListener("click", () => {
        if (htmlElements.slider.checked) {
            htmlElements.r.style.setProperty("--light-dark-text", "hsl(0, 0%, 100%)");
            htmlElements.r.style.setProperty("--light-dark-bgr", "hsl(216, 25%, 25%)");
            htmlElements.r.style.setProperty("--container-bgr", "hsl(215, 27%, 32%)");
            htmlElements.r.style.setProperty("--light-dark-text-p", "hsl(216, 47%, 78%)");
            document.body.className = "dark";
        } else {
            htmlElements.r.style.setProperty("--light-dark-text", "hsl(216, 25%, 25%)");
            htmlElements.r.style.setProperty("--light-dark-bgr", "hsl(220, 38%, 97%");
            htmlElements.r.style.setProperty("--container-bgr", "hsl(0, 0%, 100%)");
            htmlElements.r.style.setProperty("--light-dark-text-p", "hsl(219, 13%, 44%)");
            document.body.className = "light";
        }
    });

    htmlElements.choices.forEach(choice => {
        choice.addEventListener("change", () => {
            selectedAns = choice.value;
            console.log(selectedAns);
        })
    })


    htmlElements.submitAnswer.addEventListener("click", (e) => {
        e.preventDefault();   
        e.target.classList.remove("active");
        htmlElements.nextQuestion.classList.add("active");

    })

    htmlElements.nextQuestion.addEventListener("click",(e)=>{
        e.preventDefault(); 
        htmlElements.articles.forEach(article => {
            article.classList.remove("active");
        });

        htmlElements.articles[2].classList.add("active");
        e.target.classList.remove("active");
        htmlElements.submitAnswer.classList.add("active");

    })

    htmlElements.resetbtn.addEventListener("click", () => {

        htmlElements.curr[0].innerHTML = "";
        htmlElements.curr[1].innerHTML = "";

        htmlElements.articles.forEach(article => {
            article.classList.remove("active");
        });

        htmlElements.radios.forEach(radio => {
            radio.checked = false;
        })

        htmlElements.choices.forEach(choice => {
            choice.checked = false;
        })

        htmlElements.articles[0].classList.add("active");

        selectedAns = "";
        score = 0;

    })

    async function requestData(){
        const response = await fetch("https://api.jsonsilo.com/public/7b534a2c-bfcd-4c92-9f9f-330d2aa5d63d");
        const data = await response.json();
        console.log(data.quizzes);

    }

    requestData();

})
