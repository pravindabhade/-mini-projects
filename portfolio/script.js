/*====================================
    TYPING EFFECT
====================================*/

const typing = document.getElementById("typing");

const words = [
    "Frontend Developer",
    "JavaScript Developer",
    "UI/UX Designer",
    "AI Engineer",
    "Full Stack Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){

        typing.textContent =
        currentWord.substring(0,charIndex++);

        if(charIndex > currentWord.length){

            deleting = true;

            setTimeout(typeEffect,1200);

            return;
        }

    }else{

        typing.textContent =
        currentWord.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex === words.length){
                wordIndex = 0;
            }

        }

    }

    setTimeout(typeEffect,deleting ? 60 : 120);

}

typeEffect();


/*====================================
        MOBILE MENU
====================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("show");

});


/*====================================
        STICKY NAVBAR
====================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){

        navbar.style.background =
        "rgba(15,23,42,.75)";

        navbar.style.backdropFilter =
        "blur(20px)";

        navbar.style.borderRadius =
        "15px";

    }

    else{

        navbar.style.background="transparent";

    }

});


/*====================================
        ACTIVE NAVIGATION
====================================*/

const sections =
document.querySelectorAll("section");

const links =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top = section.offsetTop-150;

        if(pageYOffset >= top){

            current = section.getAttribute("id");

        }

    });

    links.forEach(link=>{

        link.classList.remove("active");

        if(
        link.getAttribute("href") === "#"+current
        ){

            link.classList.add("active");

        }

    });

});


/*====================================
        SCROLL REVEAL
====================================*/

const revealElements =
document.querySelectorAll(".hero");

function reveal(){

    revealElements.forEach(el=>{

        const top =
        el.getBoundingClientRect().top;

        if(top < window.innerHeight-100){

            el.style.opacity="1";
            el.style.transform="translateY(0)";

        }

    });

}

reveal();

window.addEventListener("scroll",reveal);


/*====================================
        INITIAL STYLE
====================================*/

revealElements.forEach(el=>{

    el.style.opacity="0";

    el.style.transform="translateY(60px)";

    el.style.transition=".8s";

});


/*====================================
    SCROLL TO TOP BUTTON
====================================*/

const topBtn = document.createElement("button");

topBtn.innerHTML="↑";

topBtn.className="top-btn";

document.body.appendChild(topBtn);

topBtn.style.cssText=`
position:fixed;
right:25px;
bottom:25px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#2563eb;
color:#fff;
font-size:22px;
cursor:pointer;
display:none;
box-shadow:0 10px 20px rgba(0,0,0,.3);
z-index:999;
`;

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};
/*====================================
    SKILL BAR ANIMATION
====================================*/

const skillSection = document.querySelector(".skills");
const progressBars = document.querySelectorAll(".progress-bar");

let skillAnimated = false;

function animateSkills() {

    const sectionTop = skillSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 150;

    if (sectionTop < triggerPoint && !skillAnimated) {

        progressBars.forEach(bar => {

            const width = bar.classList.contains("html") ? "95%" :
                          bar.classList.contains("css") ? "90%" :
                          bar.classList.contains("js") ? "88%" :
                          bar.classList.contains("react") ? "80%" :
                          bar.classList.contains("python") ? "92%" :
                          bar.classList.contains("ai") ? "85%" :
                          bar.classList.contains("sql") ? "90%" :
                          bar.classList.contains("git") ? "92%" : "0%";

            bar.style.width = width;

        });

        skillAnimated = true;

    }

}

window.addEventListener("scroll", animateSkills);

animateSkills();

/*====================================
        PROJECT FILTER
====================================*/

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        // Remove Active Class
        filterBtns.forEach(button => {
            button.classList.remove("active");
        });

        // Add Active Class
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 100);

            } else {

                card.style.opacity = "0";
                card.style.transform = "scale(.8)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 300);

            }

        });

    });

});

/*====================================
        PROJECT CARD ANIMATION
====================================*/

const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

cards.forEach(card => {

    card.classList.add("hidden");

    observer.observe(card);

});

/*====================================
        PROJECT SEARCH
====================================*/

// Create Search Box

const projectSection = document.querySelector(".projects");

const search = document.createElement("input");

search.type = "text";

search.placeholder = "🔍 Search Projects...";

search.className = "project-search";

const filter = document.querySelector(".project-filter");

projectSection.insertBefore(search, filter);

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    projectCards.forEach(card => {

        const title = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (title.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});