//ABOUT SECTION

$(function (){
    /////////////////////////////////////////

    //executes  when the about link is clicked
    $("#aboutLink").on("click", aboutLink)
    $("#aboutLinkFooter").on("click", aboutLink)

    /////////////////////////////////////////
})


//HELPER FUNCTION FOR SECTION

//function for about link click
function aboutLink() {
    clearValues()
    hideAll();
    makeVisible("#about");
}