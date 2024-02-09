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

  const login = async () => {

    const user = document.getElementById("user").value;

    const userLoginRequest = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user})
  });


    if(userLoginRequest.status === 200){

       localStorage.setItem('user', JSON.stringify({ user }));
       window.location.href = "http://localhost:3001";

    }

  }

  const logout = async () => {
    localStorage.removeItem('user');
    window.location.href = "http://localhost:3001/login";
  }
