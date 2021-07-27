function wordByChar (str){
    for (let i = 0; i < str.length; i++) {
        const letter = str.charAt(i);
        // console.log(letter)

        const newDiv = document.createElement("div");
        const newContent = document.createTextNode(letter);
        newDiv.appendChild(newContent);
        
        const currentDiv = document.getElementById("letter");
        document.body.insertBefore(newDiv, currentDiv);
    }
}

wordByChar("title word");