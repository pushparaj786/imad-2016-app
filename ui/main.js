function loadLoginForm () {
var loginHtml=` 
    <h3>Login/Register to unlock awesome features</h3>
    <input type = "text" id ="username" placeholder ="username"/>
    <input type = "password" id ="password"/>
    <br/><br/>
    <input type = "submit" id ="login_btn" value ="Login"/>
    <input type = "submit" id ="register_btn" value ="Register"/>
    `;
    document.getElementById('login_area').innerHTML = loginHtml;

//Submit username/password to login
var submit = document.getElementById ('login_btn');
    submit.onclick = function() {
            //create a request object 
    var request = new XMLHttpRequest();
            //Capture the response and store it in a variable
    request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE){
         //Take some action
     if(request.status === 200){
        submit.value = 'Success!';
    } else if (request.status === 403)  {
        submit.value = 'Invalid credentials,Try again?';
    } else if(request.status === 500)  {
        alert('something went wrong on the server');
        submit.value = 'Login';
    }
      loadLogin();
    }
};


//Make the request
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log('username');
console.log('password');
request.open('POST','/login', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username: username, password: password}));
submit.value = 'Logging in....';
};

var register = document.getElementById ('register_btn');
    register.onclick = function(){
                           //create a request object 
    var request = new XMLHttpRequest();
                          //Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if(request.readyState===XMLHttpRequest.DONE) {
         //check the username for blank and also restrict the password length
         var username = document.getElementById('username').value;
         var password = document.getElementById('password').value;
         if (username.trim().length<4 && password.trim().length<4 && username!== /^[0-9a-zA-Z]+$/){
             alert('Please enter minimum 4 alphanumeric text for username and password minimum is 4');
             register.value = 'Register';
         }
         if(request.status === 200){
             alert('User created successfully');
             register.value = 'Registered!';
    } else  {
        alert('Could not register the user');
        register.value = 'Register';
    }
   }
 };
//Make the request
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST','/create-user', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username: username, password: password}));
register.value = 'Registering....';
  };
}

function loadLoggedInUser(username){
 var loginArea = document.getElementById('login_area');
    loginArea.innerHTML=`
    <h3> Hi <i>${username}</i></h3>
    <a href = "/logout">Logout</a>
    `;
}

function loadLogin(){
  //check if the user is already logged in
 var request = new XMLHttpRequest();
                          //Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if(request.readyState===XMLHttpRequest.DONE) {
         //Take some action
         if(request.status === 200){
             loadLoggedInUser(this.responseText);
        } else  {
        loadLoginForm();
    }
   }
 };
    request.open('GET','/check-login',true);
    request.send(null);
}

function loadArticles(){
   //check if the user is already logged in
 var request = new XMLHttpRequest();
                          //Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if(request.readyState===XMLHttpRequest.DONE) {
         var articles = document.getElementById('articles');
         if(request.status === 200){
            var content = '<ul>';
            var articleData = JSON.parse(this.responseText);
            for (var i=0; i<articleData.length; i++){
                content += `<li> 
                <a href = "/articles/${articleData[i].title}">${articleData[i].heading}</a>
                (${articleData[i].date.split('T')[0]}),</li>`;
            }
            content += "</ul>";
            articles.innerHTML = content;
            } else  {
        articles.innerHTML('Oops!Could not load all articles!');
    }
   }
 };
    request.open('GET','/get-articles',true);
    request.send(null);
} 
  //The first thing to do is to check if the user is logged in!
  loadLogin();
  //Now this is something that we could have directly done on the server side using templating too!
  loadArticles();









