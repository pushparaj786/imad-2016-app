function loadLoginForm () {
var loginHtml=` 
    <h3>Please Login/Register to see/comment my articles</h3>
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
     var username = document.getElementById('username').value;
    var password = document.getElementById('password').value; 
    if(username.length>3 && password.length>3){
    request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE){
         //Take some action
     if(request.status === 200){
        submit.value = 'Success!';
    } else if (request.status === 403)  {
       submit.value = 'Login';
    } else if(request.status === 500)  {
        alert('something went wrong on the server');
        submit.value = 'Login';
    }
      loadLogin();
    }
};

//Make the request
console.log('username');
console.log('password');
request.open('POST','/login', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username: username, password: password}));
submit.value = 'Logging in....';
}else
{
alert(' Please check your username/password'); 
  }
};


var register = document.getElementById ('register_btn');
    register.onclick = function(){
                           //create a request object 
    var request = new XMLHttpRequest();
                          //Capture the response and store it in a variable
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if(username.length>3 && password.length>3){
        request.onreadystatechange = function() {
        if(request.readyState===XMLHttpRequest.DONE) {
         //check the username for blank and also restrict the password length
        
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

request.open('POST','/create-user', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username: username, password: password}));
register.value = 'Registering....';
  } 
  else{
     alert(' Please use minimum 4 letters for username and password');
    
  }
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
             loadArticles();
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
  









