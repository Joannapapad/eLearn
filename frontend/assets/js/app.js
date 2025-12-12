document.addEventListener("DOMContentLoaded", () => {
    
    if(window.location.pathname.includes("index.html")) {
        const fadeSection = document.querySelector(".fade-section");
    
        if(fadeSection) {
            const observer = new IntersectionObserver((entries,obs) => {
                entries.forEach(entry=> {
                    if(entry.isIntersecting){
                        entry.target.classList.add("is-visible");
                    }else{
                        entry.target.classList.remove("is-visible");
    
                    }
                })
            }, {threshold:0.2});
            
            observer.observe(fadeSection);
        }

        //click in cateogiry boxes
        const categoryCards = document.querySelectorAll(".category");

        categoryCards.forEach(card => {
            card.style.cursor= "pointer";
            card.addEventListener("click" ,() =>{
                const categoryKey = card.dataset.category;
                window.location.href = `courses.html?category=${categoryKey}`;
            });
        });
    }

});
