var loginHtml='
    <h3>Login/Register to unlock awesome features</h3>
    <input type = "text" id ="username" placeholder ="username"/>
    <input type = "password" id ="password"/>
    <hr/><hr/>
    <input type = "submit" id ="login_btn" value ="Login"/>
    <input type = "submit" id ="register_btn" value ="Register"/>
    ';
    document.getElementById('login_area').innerHTML = loginHtml;

//Submit username/password to login
var submit = document.getElementById ('submit_btn');
submit.onclick = function() {
            //create a request object 
    var request = new XMLHttpRequest();
            //Capture the response and store it in a variable
    request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE){
         //Take some action
     if(request.status === 200){
        alert('Logged in successfully!');
    } else if (request.status === 403)  {
        alert('Username/password is incorrect');
    } else if(request.status === 500)  {
        alert('something went wrong on the server');
    }
}
};
//Make the request
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log('username');
console.log('password');
request.open('POST','http://pushparaj786.imad.hasura-app.io/login', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username: username, password: password}));
};