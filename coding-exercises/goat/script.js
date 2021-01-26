document.getElementById("number-input").addEventListener("input", event => {
    document.getElementById("images-container").innerHTML="";
    for (let i=0;i<event.target.value;i++){
        let ele=document.createElement("img");
        ele.classList.add("images-container__image");
        ele.src=`./assets/goat-${(i%3+1).toString()}.png`;
        ele.alt="";
        document.getElementById("images-container").appendChild(ele);
    }
});