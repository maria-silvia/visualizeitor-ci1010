var SELECTED_STUDENT = null;
var STUDENTS = {};
loadDataAsJSON(STUDENTS);

$(document).ready(function () {
  console.log("students", STUDENTS);

  $("button").click(loadGRR);
  function loadGRR() {
    let ra = $("input").val();
    var SELECTED_STUDENT = searchGRR(ra);
    if (SELECTED_STUDENT) {
      $("#nome_aluno").text(ra);
      paintTable();
    } else {
      $("#nome_aluno").text("GRR não encontrado");
    }
  }

  function searchGRR(params) {
    return null;
  }

  function painTable(params) {}
});
