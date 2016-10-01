//counter code
var button = document.getElementById('counter'); 

button.onclick=function(){
//create a request object

var request= new XMLHttpRequest();

request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
         //Take some action
    if(request.Status===200){
        var counter=request.responseText;
        var span=document.getElementById('count');
        span.innerHTML=counter.toString();
    }
  }
};
//Make the request
request.open('GET','http://pushparaj786.imad.hasura-app.io/counter',true);
request.send(null);
};