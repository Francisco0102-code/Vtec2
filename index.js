    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const links = document.querySelectorAll('.menu a');

    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('ativo');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('ativo');
      });
    });

!function(d){
    let itemClassName = "carrosel-foto",
    items = d.getElementsByClassName(itemClassName),
    totalItems = items.length,
    slide = 0,
    moving = true;

    function setInitialClasses(){
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active")
        items[1].classList.add("next");
    }

    function setEventListeners(){
        let next = d.getElementsByClassName("carrosel-button--next")[0];
        let prev = d.getElementsByClassName("carrosel-button--prev")[0];

        next.addEventListener("click", moveNext);
        prev.addEventListener("click", movePrev);
    }

    function moveNext(){
        console.log("funcionando")
        if(!moving){
            if(slide === (totalItems - 1)){
                slide = 0
            } else {
                slide++;
            }

            moveCarroselPara(slide)
        }
    }

    function movePrev(){
        console.log("funcionando prev")
        if(!moving){
            if(slide === 0){
                slide = (totalItems - 1);
            } else {
                slide--;
            }
        }

        moveCarroselPara(slide);
    }

    function disableInteraction(){
        moving = true;

        setTimeout(() => {
            moving = false;
        }, 500)
    }

    function moveCarroselPara(slide){
        if(!moving){
            disableInteraction();

            let newPrev = slide - 1, newNext = slide + 1, oldPrev = slide - 2, oldNext = slide + 2;

            if((totalItems - 1) > 3){
                if(newPrev <= 0){
                    oldPrev = (totalItems - 1);
                } else if(newNext >= (totalItems - 1)){
                    oldNext = 0;
                }

                if(slide === 0){
                    newPrev = (totalItems - 1);
                    oldPrev = (totalItems - 2);
                    oldNext = (slide + 1);
                } else if(slide === (totalItems - 1)){
                    newPrev = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }

                items[oldPrev].className = itemClassName;
                items[oldNext].className = itemClassName;

                items[newPrev].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active"
                items[newNext].className = itemClassName + " next";
            }
        }
    }

    function initCarrosel(){
        setInitialClasses();
        setEventListeners();

        moving = false;
    }

    initCarrosel();
}(document)