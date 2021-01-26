document.getElementById("confirm-button").addEventListener("click", () => {
    document.getElementById("squares-container").innerHTML = "";
    let value = document.getElementById("number-input").value;
    if (value) {
        for (let i = 0; i < value; i++) {
            let ele = document.createElement('div');
            ele.classList.add("squares-container__square");
            document.getElementById("squares-container").appendChild(ele);
            setTimeout(() => {
                ele.style.opacity = "100%";
            }, 20 * i);
        }
    }
});