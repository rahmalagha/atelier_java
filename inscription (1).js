let loginForm = document.querySelector("form.login")
let signupForm = document.querySelector("form.signup")
let mainContainer = document.querySelector("main")
let inputs = document.querySelectorAll("input")
let labels = document.querySelectorAll("label")
let attributeToggles = document.querySelectorAll("span.material-symbols-outlined")
let passwordInputs = document.querySelectorAll("input[type='password']")
inputs.forEach((item,index)=>{
    item.addEventListener("blur",function(){
        if(item.value==null || item.value.trim() == ""){
            labels[index].style.opacity = 1;
        }else{
            labels[index].style.opacity = 0;
        }
    })
})
attributeToggles.forEach((item,index)=>{
    item.addEventListener("click",function(){
        if(passwordInputs[index].getAttribute("type")=="password"){
            passwordInputs[index].setAttribute("type","text");
            item.textContent = "visibility_off";
        }else{
            passwordInputs[index].setAttribute("type","password");
            item.textContent = "visibility";
        }
    })
})
loginForm.addEventListener("submit",function(e){
    e.preventDefault();
    let email= localStorage.getItem("signupEmail");
    let password= localStorage.getItem("password");
    let inputEmail = loginForm.email.value;
    let inputPassword = loginForm.loginPassword.value;
    if(!email && !password){
        alert("your credentials are not found please sign up");
    }else if(email===inputEmail){
        if(password===inputPassword){
            alert("your are verified");
            let dataContainer = document.createElement("div");
            let emailContainer = document.createElement("div");
            let nameContainer = document.createElement("div");
            let button = document.createElement("button");
            mainContainer.style.display = "none";
            emailContainer.textContent = localStorage.getItem("signupEmail")
            nameContainer.textContent = `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`
            button.textContent = "logout";
            button.addEventListener("click",function(){
                console.log("button clicked");
                mainContainer.style.display = "flex";
                localStorage.clear();
                dataContainer.remove();
            })
            dataContainer.appendChild(emailContainer);
            dataContainer.appendChild(nameContainer);
            dataContainer.appendChild(button);
            document.body.appendChild(dataContainer);
        }else{
            alert("please check your password");
        }
    }
    loginForm.reset();
})
signupForm.addEventListener("submit",function(e){
    e.preventDefault();
    let {firstName,lastName,phoneNumber,signupEmail,signupPassword,confirmPassword,address,date} = signupForm;
    if(signupPassword.value !==confirmPassword.value){
        alert("please verify your password");
        signupPassword.value="";
        confirmPassword.value="";
    }else{
        let credentials = [firstName,lastName,phoneNumber,signupEmail,signupPassword,confirmPassword,address,date];
        let storedEmail = localStorage.getItem("signupEmail");
        if(storedEmail && (signupEmail == storedEmail)){
            alert("you are already signed up");
        }else{
            credentials.forEach((item,index)=>{
                localStorage.setItem(item.name,item.value);
            })
            let dataContainer = document.createElement("div");
            let emailContainer = document.createElement("div");
            let nameContainer = document.createElement("div");
            let button = document.createElement("button");
            mainContainer.style.display = "none";
            emailContainer.textContent = localStorage.getItem("signupEmail")
            nameContainer.textContent = `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`
            button.textContent = "logout";
            button.addEventListener("click",function(){
                console.log("button clicked");
                mainContainer.style.display = "flex";
                localStorage.clear();
                dataContainer.remove();
            })
            dataContainer.appendChild(emailContainer);
            dataContainer.appendChild(nameContainer);
            dataContainer.appendChild(button);
            document.body.appendChild(dataContainer);
        }
        signupForm.reset();
    }
})