var STUDENTS = {};
var SELECTED_STUDENT = null;

$(document).ready(function () {
  // ============= EVENT REGISTRATION ===============================
  $("#selectGRR").change(loadGRR);

  $("td").mousedown(function (event) {
    if (event.which == 1) openLastMatricula(event);
    else openHistorico();
  });

  $("#closePopup").click(() => $(".popup-right-click").removeClass("active"));

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $(".popup-right-click").removeClass("active");
    }
  });
  // ================================================================

  loadDataAsJSON(STUDENTS).then(() => fillSelect()); // -- INICIALIZA

  function fillSelect() {
    let GRRs = Object.keys(STUDENTS);
    $.each(GRRs, function (key, value) {
      $("#selectGRR").append(
        $("<option></option>").attr("value", value).text(value)
      );
    });
    // já inicia com o primeiro carregado
    SELECTED_STUDENT = GRRs[0];
    loadGRR();
  }

  function loadGRR() {
    let ra = $("#selectGRR").val();
    SELECTED_STUDENT = STUDENTS[ra];
    $("#nome_aluno").text(`Grade 2011 - ${SELECTED_STUDENT["NOME_ALUNO"]}`);
    cleanTable();
    painTable();
  }

  function painTable() {
    const courses = SELECTED_STUDENT.grade;
    $("td").each(function () {
      const code = $(this).text();
      if (courses[code]) {
        $(this).addClass("td_clicavel");
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
      $(this).removeClass("td_clicavel");
      $(this).removeClass("outro");
    });
  }

  function openLastMatricula(event) {
    let code = event.currentTarget.innerText;
    if (SELECTED_STUDENT.grade[code]) {
      let name = SELECTED_STUDENT.grade[code].NOME_ATIV_CURRIC;
      $("#code_name").text(`${code} - ${name}`);
      let matr = SELECTED_STUDENT.grade[code].ultima_matricula;
      $("#date").text(`${matr.ANO} / ${matr.PERIODO}`);
      $("#grade").text(matr.MEDIA_FINAL);
      $("#freq").text(matr.FREQUENCIA);
      $("#situation").text(matr.SITUACAO);
      $(".popup-right-click").addClass("active");
    }
  }
});
