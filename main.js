var myProject = function (el) {
    console.log(el);
};
var myOtherProject = function (mop) {
    console.log(mop);
};


$(function() {
    $('.btn').click(function() {
      $(this).toggleClass('is-clicked');
    });
  });


  const openOrCloseMenu = () => {
    const menu = document.getElementById("navBarMenu");
    const menuState = window.getComputedStyle(menu).display;
    const firstNavBarButtonBar = document.getElementById("firstNavBarButtonBar");
    const firstNavBarButtonBarState = window.getComputedStyle(firstNavBarButtonBar).display;

    menu.style.display = menuState === 'flex' ? 'none' : 'flex';
    firstNavBarButtonBar.style.display = firstNavBarButtonBarState === 'flex' ? 'none' : 'flex';

  }


  const launchWork = () => {
       
     setInterval(() => {
       //logic   
     }, 1000);
   
  }

 
 // login
 

  const login = async () => {

    const user = document.getElementById("user").value;

    const userLogged = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user})
  });

    console.log(userLogged);

  }