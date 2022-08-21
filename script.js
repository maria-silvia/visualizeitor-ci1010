var SELECTED_STUDENT = null;
var STUDENTS = {};
loadDataAsJSON(STUDENTS);

$(document).ready(function () {
  fillSelect();
  $("button").click(loadGRR);

  function fillSelect() {
    let GRRs = Object.keys(STUDENTS);
    $.each(GRRs, function (key, value) {
      $("#selectGRR").append(
        $("<option></option>").attr("value", value).text(value)
      );
    });
  }

  function loadGRR() {
    let ra = $("#selectGRR").val();
    SELECTED_STUDENT = STUDENTS[ra];
    console.log(SELECTED_STUDENT);
  }

  function painTable(params) {}
});
