$('.zm input[type=text],.zm input[type=password]').focusin(function () {
    $(this).parent().attr('style', 'border:1px solid #06ba9d; box-shadow:0 0 2px rgba(6,186,157,0.5);');
});
$('.zm input[type=text],.zm input[type=password]').focusout(function () {
    $(this).parent().removeAttr('style');
});