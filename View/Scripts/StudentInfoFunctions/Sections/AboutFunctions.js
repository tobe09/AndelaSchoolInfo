//ABOUT SECTION

$(function (){
    /////////////////////////////////////////

    //executes  when the about link is clicked
    $("#aboutLink").on("click", aboutLinkClick)
    $("#aboutLinkFooter").on("click", aboutLinkClick)

    /////////////////////////////////////////
})


//function for about link click
function aboutLinkClick() {
    clearValues()
    hideAll();
    makeVisible("#about");
}