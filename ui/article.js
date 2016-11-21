//eg: pushparaj786.imad.hasura-app.io/articles/article-one will result in aticlename
var currentArticleTitle = window.location.pathname.split('/')[2];
function loadCommentForm(){
    var commentFormHtml = `
    <h5>Submit a comment</h5>
    <textarea id ="comment_text" rows="5" cols = "100" placeholder = "Enter your comment here ....."></textarea>
    <br/>
    <input type = "submit" id="submit" value = "Submit"/>
    <br/>
    `}
