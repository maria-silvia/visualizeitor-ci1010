var SELECTED_STUDENT = null;
var STUDENTS = {};
loadDataAsJSON(STUDENTS);

$(document).ready(function () {
  fillSelect();
  $("#selectGRR").change(loadGRR);

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
    $("#nome_aluno").text(SELECTED_STUDENT["NOME_ALUNO"]);
    painTable();
  }

  function painTable(params) {}
});
