const form = document.querySelector('form');
const logout = document.getElementById("logout")
form.addEventListener('click', (e) => {
    e.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const authenticated = authentication(name,email, password);
    if (authenticated) {
        window.location.href = "food.html"
    } else {
      //   alert("Invalid Username or Password")
    }
})
 const authentication = (name, email, password) => {
    if (name === "mahamed" && email === "mahamed@gmail.com" && password === "abdullahi") {
        return true
    } else {
        return false;
    }
}
// outh2
// logout.addEventListener('click',() => {
//     if (!window.location.replace("./login.html")) {
//         window.confirm("Are you sure you want to log out?");
//     } return })