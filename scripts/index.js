const swiper = new Swiper('.swiper', {  
  pagination: {  
   el: '.swiper-pagination',  
   type: 'bullets',  
   clickable: true,  
   
  },  
  navigation: {  
   nextEl: '.swiper-button-next',  
   prevEl: '.swiper-button-prev',  
  },  
  on: {  
   slideChange: function () {  
    if (this.activeIndex === 2) {  
      document.getElementById('next-button').style.display = 'none';  
      document.getElementById('get-started-button').style.display = 'block';  
    } else {  
      document.getElementById('next-button').style.display = 'block';  
      document.getElementById('get-started-button').style.display = 'none';  
    }  
   },  
  },  
}); 

