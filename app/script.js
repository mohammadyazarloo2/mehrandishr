if (document.readyState == "loading") {
  document.querySelector(".loading").style.opacity = "1";
  console.log("loging");
}

window.addEventListener("load", () => {
  document.querySelector(".loading").style.opacity = "0";
  console.log("complete");
});

// let x=[1,2,3,4,5,6]
// let t=document.querySelector('.details-text p').innerText

// let s=t.split(' ',24)
// let r=s.join(' ')

// document.querySelector('.details-text p').innerHTML=r+'...'

// document.querySelector('.btn_more').addEventListener('click',function(){
//     document.querySelector('.details-text p').innerHTML=t
//     this.style.display='none'
//     document.querySelector('.btn_less').style.display='block'
// })
// document.querySelector('.btn_less').addEventListener('click',function(){
//     document.querySelector('.details-text p').innerHTML=r+'...'
//     this.style.display='none'
//     document.querySelector('.btn_more').style.display='block'
// })

if (localStorage.getItem("mode") == "dark") {
  document.body.classList.add("dark");
  document.querySelector(".sun").classList.add("active");
  document.querySelector(".night").classList.remove("active");
}

if (document.querySelector(".sun")) {
  document.querySelector(".sun").addEventListener("click", function () {
    document.querySelector(".night").classList.add("active");
    document.querySelector(".sun").classList.remove("active");
    document.body.classList.add("dark");
    localStorage.setItem("mode", "dark");
  });

  document.querySelector(".night").addEventListener("click", function () {
    document.querySelector(".sun").classList.add("active");
    document.querySelector(".night").classList.remove("active");
    document.body.classList.remove("dark");
    localStorage.setItem("mode", "light");
  });
}

if (document.querySelector(".profile")) {
  document.querySelector(".profile").addEventListener("click", function () {
    if (document.querySelector(".profile-show").classList.contains("open")) {
      document.querySelector(".profile-show").classList.remove("open");
    } else {
      document.querySelector(".profile-show").classList.add("open");
    }
  });
  document.querySelector(".nav2-amir").addEventListener("click", function () {
    this.nextElementSibling.classList.add("open");
  });

  document
    .querySelector(".close-request")
    .addEventListener("click", function () {
      document.querySelector(".requests").classList.remove("open");
    });
}

if (document.querySelector(".dots")) {
  document.querySelector(".dots").addEventListener("click", function (e) {
    document.querySelector(".menu-mobile").classList.add("open");
    let check = e.composedPath().includes(document.querySelector("header"));
    if (check === false) {
      document.querySelector(".menu-mobile").classList.remove("open");
    }
  });
  document.querySelector(".close-menu").addEventListener("click", function (e) {
    let check = e.composedPath().includes(document.querySelector("header"));
    if (check === true) {
      document.querySelector(".menu-mobile").classList.remove("open");
    }
  });
}

document.addEventListener("click", function (e) {
  let check = e.composedPath().includes(document.querySelector("main"));
  if (check === true) {
    document.querySelector(".menu-mobile").classList.remove("open");
  }
});

let begin = window.scrollY;

window.addEventListener("scroll", function (events) {
  if (begin > window.scrollY) {
    document.querySelector(".nav").classList.add("fixed-nav");
    document.querySelector(".nav").classList.add("a-fixed-nav");
  } else {
    document.querySelector(".nav").classList.remove("fixed-nav");
  }
  if (this.window.scrollY === 0) {
    document.querySelector(".nav").classList.remove("fixed-nav");
  }

  begin = this.window.scrollY;
});

let username = document.getElementsByClassName("username");

for (let i = 0; i < username.length; i++) {
  username[i].addEventListener("keyup", function (e) {
    if (e.target.value.length < 4 && e.target.value.length > 0) {
      document.querySelector(".username-alert").innerHTML =
        "نام کاربری باید حداقل دارای 4 کاراکتر باشد";
    } else if (e.target.value.length > 12) {
      document.querySelector(".username-alert").innerHTML =
        "نام کاربری باید حداکثر  12 کاراکتر باشد";
    } else if (e.target.value == "") {
      document.querySelector(".username-alert").innerHTML =
        "نام کاربری نمی تواند خالی باشد";
    } else {
      document.querySelector(".username-alert").innerHTML = "     ";
    }
  });
}

let email = document.getElementsByClassName("email");
for (let i = 0; i < email.length; i++) {
  email[i].addEventListener("keyup", function (e) {
    let reg = e.target.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    console.log(reg);
    if (reg === null) {
      document.querySelector(".email-alert").innerHTML =
        "  ایمیل شما نادرست می باشد ";
      document.querySelector(".email-alert").classList.add("incorrect-email");
      this.classList.add("failed");
      if (this.classList.contains("success")) {
        this.classList.remove("success");
      }
    } else {
      document.querySelector(".email-alert").classList.add("correct-email");
      document.querySelector(".email-alert").innerHTML = "     درسته  ";
      if (this.classList.contains("failed")) {
        this.classList.remove("failed");
      }
      this.classList.add("success");
    }
  });
}

// let h=100;
// let sub;
// setInterval(function(){

//   if(h>0 && h<=100){
//     h=h-1;
//   }
//   console.log(h)
// },1000)

// let x=0
// let m=0
// let h=0
// let start=setInterval(function(){
//   if(x>=0){
//     x=x+1
//     document.querySelector('.seconds').innerHTML=x
//   }
//   if(x>60){
//     m=m+1
//     document.querySelector('.minutes').innerHTML=m
//     x=0
//   }
//   if(m>60){
//     h=h+1
//     document.querySelector('.hours').innerHTML=h
//     m=0
//   }
//   console.log(x)
// },1)

// let stop

// document.querySelector('.stop').addEventListener('click',function(){stop=clearInterval(start)})

// function displayDate(){
//   let date=new Date()
//   let h=date.getHours()
//   let m=date.getMinutes()
//   let s=date.getSeconds()

//   if(h < 10){
//     h='0'+h
//   }

//   if(m < 10){
//     m='0'+m
//   }

//   if(s < 10){
//     s='0'+s
//   }
//   if(h >= 12){
//     document.querySelector('.zone').innerHTML='PM'
//   }else{
//     document.querySelector('.zone').innerHTML='AM'
//   }

//   if(h >= 12){
//     h=h-12
//   }else{
//     h=h
//   }

//   document.querySelector('.hours').innerHTML=h
//   document.querySelector('.minutes').innerHTML=m
//   document.querySelector('.seconds').innerHTML=s

// }

// setInterval(displayDate,1000)

localStorage.setItem("mode", "light");
let lcs = localStorage.getItem("item");

if (lcs && lcs.length > 0) {
  let arr = JSON.parse(lcs);
  document.querySelector(".cart-quantity").innerHTML = JSON.parse(lcs).length;
  console.log(arr);

  arr.forEach(function (val) {
    let items = document.querySelector(".basket-items");
    let item = document.createElement("div");
    item.classList.add("basket-item");
    let title = document.createElement("div");
    title.classList.add("basket-title");
    title.innerHTML = val[0];
    let price = document.createElement("div");
    price.classList.add("basket-price");
    price.textContent = val[1];


    items.appendChild(item);
    item.appendChild(title);
    item.appendChild(price);
  });
}

let arr = JSON.parse(lcs);

document.querySelectorAll(".addbasket").forEach(function (item) {
  /**
   * Adds a product to the shopping cart and updates the cart quantity display.
   *
   * This event listener is attached to all elements with the "addbasket" class.
   * When clicked, it retrieves the title and price of the product, adds it to the
   * cart array, and stores the updated cart in localStorage. If the product is
   * already in the cart, an alert is shown. The cart quantity displayed on the
   * page is then updated to reflect the new cart contents.
   */
  item.addEventListener("click", function () {
    let title = this.parentNode.querySelector(
      ".flex-box-back-body-title"
    ).textContent;
    let price = this.parentNode.querySelector(
      ".flex-box-back-body-price"
    ).textContent;

    if (arr) {
      if (arr.some((item) => item[0] === title)) {
        alert("محصول مورد نظر در سبد خرید موجود می باشد");
      } else {
        arr.push([title, price]);
        localStorage.setItem("item", JSON.stringify(arr));
      }
    } else {
      let arr = [];
      arr.push([title, price]);
      localStorage.setItem("item", JSON.stringify(arr));
    }
    let bsquantity = localStorage.getItem("item");
    // let items=localStorage.getItem('item');

    document.querySelector(".cart-quantity").innerHTML =
      JSON.parse(bsquantity).length;
  });
});




document.querySelector('.showbasket').addEventListener("click",function(){
  document.querySelector('.basketdrop').classList.toggle('show')
})
