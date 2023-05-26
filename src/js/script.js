const hamburgerBtn = document.getElementById('hamburger-btn')
const navMenu = document.getElementById('nav-menu');
const toggleBtn = document.getElementById('toggle-button')


hamburgerBtn.addEventListener('click', function(){
  if(navMenu.classList.contains('hidden')){
    navMenu.classList.remove('hidden')
    toggleBtn.src="/img/close.png"
  }

  else{
    navMenu.classList.add('hidden')
    toggleBtn.src="/img/hamburger.png"
  }
})
