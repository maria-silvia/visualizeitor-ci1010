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
    cleanTable();
    painTable();
  }

  function painTable() {
    const courses = SELECTED_STUDENT.grade;
    $("td").each(function () {
      const code = $(this).text();
      if (courses[code]) {
        console.log(courses[code].ultima_matricula.SITUACAO);
        switch (courses[code].ultima_matricula.SITUACAO) {
          case "Aprovado":
          case "Dispensa de Disciplinas (com nota)":
            $(this).addClass("aprovado");
            break;

          case "Reprovado por Frequência":
          case "Reprovado por nota":
            $(this).addClass("reprovado");
            break;

          case "Matrícula":
            $(this).addClass("matriculado");
            break;

          default: // Cancelado, Trancamento Total
            $(this).addClass("outro");
            break;
        }
      }
    });
  }

  function cleanTable() {
    $("td").each(function () {
      $(this).removeClass("aprovado");
      $(this).removeClass("reprovado");
      $(this).removeClass("matriculado");
      $(this).removeClass("equivalencia");
      $(this).removeClass("outro");
    });
  }
});
