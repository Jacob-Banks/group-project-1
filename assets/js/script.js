$(document).ready(function () {
  $("ul.tabs a").click(function () {
    $(".pane div").hide();
    $($(this).attr("href")).show();
  });
});
