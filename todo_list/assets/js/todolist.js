$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut(300, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type=text]").keypress(function(event) {
    if(event.which === 13) {
        var new_todo = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-minus-circle' aria-hidden='true'></i></span>"+ new_todo + "</li>");

    }
});

$(".fa-plus-circle").click(function() {
    $("input[type=text]").fadeToggle(0.1);
})