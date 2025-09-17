// MENU MOBILE
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

// CARROSSEL DE FOTOS
!function(d){
  let itemClassName = "carrosel-foto",
  items = d.getElementsByClassName(itemClassName),
  totalItems = items.length,
  slide = 0,
  moving = true;

  function setInitialClasses(){
    // marca último como prev, primeiro como active e segundo como next
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  function setEventListeners(){
    let next = d.getElementsByClassName("carrosel-button--next")[0];
    let prev = d.getElementsByClassName("carrosel-button--prev")[0];
    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);
  }

  function disableInteraction(){
    moving = true;
    setTimeout(()=>{moving=false},500);
  }

  function moveNext(){
    if(!moving){
      if(slide === (totalItems - 1)) slide=0; else slide++;
      moveCarroselPara(slide);
    }
  }

  function movePrev(){
    if(!moving){
      if(slide === 0) slide=(totalItems - 1); else slide--;
      moveCarroselPara(slide);
    }
  }

  function moveCarroselPara(slide){
    if(!moving){
      disableInteraction();
      let newPrev=slide-1, newNext=slide+1, oldPrev=slide-2, oldNext=slide+2;

      if(newPrev<0)newPrev=totalItems-1;
      if(newNext>=totalItems)newNext=0;
      if(oldPrev<0)oldPrev=totalItems+oldPrev;
      if(oldNext>=totalItems)oldNext=oldNext-totalItems;

      items[oldPrev].className=itemClassName;
      items[oldNext].className=itemClassName;
      items[newPrev].className=itemClassName+" prev";
      items[slide].className=itemClassName+" active";
      items[newNext].className=itemClassName+" next";
    }
  }

  function initCarrosel(){
    setInitialClasses();
    setEventListeners();
    moving=false;
  }

  initCarrosel();
}(document);
