function imgFunction() {
    let imgs=[
    "images/random/2.JPG",
    "images/random/3.JPG",
    "images/random/4.JPG",
    "images/random/5.JPG",
    "images/random/6.JPG"],
    image=document.getElementById("image"),
    button=document.getElementById("randomButton");
    image.src=imgs[Math.floor(Math.random()*imgs.length)];
}

