// MENU MOBILE
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const links = document.querySelectorAll('.menu a');
const body = document.body;

function toggleMenu() {
  menu.classList.toggle('ativo');
  menuToggle.setAttribute('aria-expanded', menu.classList.contains('ativo'));
  body.style.overflow = menu.classList.contains('ativo') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);

links.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('ativo');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  });
});

// Fechar menu ao clicar fora dele
document.addEventListener('click', (e) => {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnToggle = menuToggle.contains(e.target);
  
  if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('ativo')) {
    toggleMenu();
  }
});

// ANIMAÇÃO DE SCROLL PARA AS SEÇÕES
const sections = document.querySelectorAll('section');

function checkScroll() {
  const windowHeight = window.innerHeight;
  const triggerBottom = windowHeight * 0.85;
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
}

// Verificar ao carregar e ao rolar
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// CARROSSEL DE FOTOS MELHORADO
(function(d){
  let itemClassName = "carrosel-foto",
  items = d.getElementsByClassName(itemClassName),
  totalItems = items.length,
  slide = 0,
  moving = true,
  autoPlayInterval;

  function setInitialClasses(){
    if (totalItems > 0) {
      items[totalItems - 1].classList.add("prev");
      items[0].classList.add("active");
      if (totalItems > 1) {
        items[1].classList.add("next");
      }
    }
  }

  function setEventListeners(){
    let next = d.getElementsByClassName("carrosel-button--next")[0];
    let prev = d.getElementsByClassName("carrosel-button--prev")[0];
    
    if (next) {
      next.addEventListener("click", moveNext);
    }
    
    if (prev) {
      prev.addEventListener("click", movePrev);
    }
    
    // Navegação por teclado
    d.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        moveNext();
      } else if (e.key === 'ArrowLeft') {
        movePrev();
      }
    });
    
    // Pause no hover
    const carousel = d.querySelector('.grid-galeria');
    if (carousel) {
      carousel.addEventListener('mouseenter', pauseAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    }
  }

  function disableInteraction(){
    moving = true;
    setTimeout(function(){
      moving = false;
    }, 500);
  }

  function moveNext(){
    if(!moving && totalItems > 1){
      if(slide === (totalItems - 1)) {
        slide = 0;
      } else {
        slide++;
      }
      moveCarroselPara(slide);
    }
  }

  function movePrev(){
    if(!moving && totalItems > 1){
      if(slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }
      moveCarroselPara(slide);
    }
  }

  function moveCarroselPara(slide){
    if(!moving){
      disableInteraction();
      
      let newPrev = slide - 1,
          newNext = slide + 1,
          oldPrev = slide - 2,
          oldNext = slide + 2;

      if(totalItems > 3){
        if(newPrev <= 0) {
          oldPrev = (totalItems - 1) + newPrev;
        } else if(newPrev < 0) {
          newPrev = totalItems - 1;
        }

        if(newNext >= (totalItems - 1)){
          oldNext = newNext - totalItems;
        } else if(newNext >= totalItems) {
          newNext = 0;
        }

        if(oldPrev < 0) oldPrev = totalItems + oldPrev;
        if(oldNext >= totalItems) oldNext = oldNext - totalItems;

        // Reset todas as classes
        for(let i = 0; i < totalItems; i++){
          items[i].className = itemClassName;
        }

        if(totalItems > 3) {
          items[oldPrev].className = itemClassName;
          items[oldNext].className = itemClassName;
        }

        items[newPrev].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      } else {
        // Para menos de 4 itens, lógica simplificada
        for(let i = 0; i < totalItems; i++){
          items[i].className = itemClassName;
        }
        
        let prevIndex = (slide === 0) ? totalItems - 1 : slide - 1;
        let nextIndex = (slide === totalItems - 1) ? 0 : slide + 1;
        
        items[prevIndex].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[nextIndex].className = itemClassName + " next";
      }
    }
  }

  function startAutoPlay() {
    if (totalItems > 1) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(moveNext, 5000);
    }
  }

  function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function initCarrosel(){
    if (totalItems > 0) {
      setInitialClasses();
      setEventListeners();
      moving = false;
      startAutoPlay();
    }
  }

  // Inicializar quando o DOM estiver pronto
  if (d.readyState === 'loading') {
    d.addEventListener('DOMContentLoaded', initCarrosel);
  } else {
    initCarrosel();
  }
})(document);

// LAZY LOADING PARA IMAGENS
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores sem suporte a IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
});

// MELHORIAS DE ACESSIBILIDADE
document.addEventListener('keydown', function(e) {
  // Fechar menu com ESC
  if (e.key === 'Escape' && menu.classList.contains('ativo')) {
    toggleMenu();
  }
});

// FOCO NO MODAL DO MENU
menuToggle.setAttribute('aria-expanded', 'false');
menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');