var STUDENTS = {};
var SELECTED_STUDENT = null;

$(document).ready(function () {
  // ------------------ INICIALIZA -----------------
  buildCurriculumTable();
  loadDataAsJSON(STUDENTS).then(() => {
    fillSelect();
  });

  // ---------------------- EVENT REGISTRATION ---------------------------------
  $("#selectGRR").change(loadGRR);

  $("td").mousedown(function (event) {
    closePopup();
    let code = event.currentTarget.innerText;
    if (event.which == 1) openLastMatricula(code);
    else openHistorico(code);
  });

  $(".close").click(() => closePopup());
  $(document).keyup(function (e) {
    if (e.key === "Escape") closePopup();
  });
  $(document).contextmenu(function () {
    return false;
  });
  // ===========================================================================

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
    painTable();
    listOtherClasses();
  }

  function painTable() {
    const courses = SELECTED_STUDENT.grade;
    cleanSituationClassFromElement("td");
    $("td").each(function () {
      const code = $(this).text();
      if (courses[code]) {
        $(this).addClass("td_clicavel");
        if (!is_opt_or_tg(code)) {
          let c = getClassBySituation(courses[code].ultima_matricula.SITUACAO);
          $(this).addClass(c);
        }
      }
    });
  }

  function openLastMatricula(code) {
    let course = SELECTED_STUDENT.grade[code];
    if (course) {
      if (is_opt_or_tg(code)) {
        $("#code_name").text(`Última matrícula em ${course.DESCR_ESTRUTURA}`);
      } else {
        $("#code_name").text(
          `${course.COD_ATIV_CURRIC} - ${course.NOME_ATIV_CURRIC}`
        );
      }
      let block = getMatriculaBlock(course.ultima_matricula);
      $("#popup-content").append(block);
      $("#summary-popup").addClass("active popup_small");
    }
  }

  function openHistorico(code) {
    let course = SELECTED_STUDENT.grade[code];
    if (course) {
      if (is_opt_or_tg(code)) {
        $("#code_name").text(`Matrículas em ${course.DESCR_ESTRUTURA}`);
      } else {
        $("#code_name").text(
          `${course.COD_ATIV_CURRIC} - ${course.NOME_ATIV_CURRIC}`
        );
      }
      course.matriculas.forEach((matr) => {
        let block = getMatriculaBlock(matr);
        $("#popup-content").append(block);
      });
      $("#summary-popup").addClass("active popup_big");
    }
  }

  function closePopup() {
    $(".popup").removeClass("active popup_big popup_small");
    $("#popup-content").empty();
  }

  function listOtherClasses() {
    let all_classes_2011 = [];
    all_classes_2011 = all_classes_2011.concat(
      ...Object.values(CURRICULUM_BCC_2011)
    );
    for (const code in SELECTED_STUDENT.grade) {
      if (!all_classes_2011.includes(code)) {
        let course = SELECTED_STUDENT.grade[code];
        course.matriculas.forEach((matr) => {
          let block = getMatriculaBlock(matr);
          $("#other-courses").append(block);
        });
      }
    }
  }

  // -------------------------------- HELPERS ----------------------------------
  function getClassBySituation(situation) {
    switch (situation) {
      case "Aprovado":
      case "Dispensa de Disciplinas (com nota)":
        return "aprovado";

      case "Reprovado por Frequência":
      case "Reprovado por nota":
        return "reprovado";

      case "Matrícula":
        return "matriculado";

      default: // Cancelado, Trancamento Total
        return "outro";
    }
  }

  function cleanSituationClassFromElement(element) {
    $(element).each(function () {
      $(this).removeClass("aprovado");
      $(this).removeClass("reprovado");
      $(this).removeClass("matriculado");
      $(this).removeClass("equivalencia");
      $(this).removeClass("td_clicavel");
      $(this).removeClass("outro");
    });
  }

  function getMatriculaBlock(matr) {
    let situation_class = getClassBySituation(matr.SITUACAO);
    return `<p class="status_tag ${situation_class}">
          <span>${matr.SITUACAO}</span>
          <span>${matr.ANO} / ${matr.PERIODO}</span>
        </p>
        <p class="info">
          <span>
            <span>${matr.NOME_ATIV_CURRIC} (${matr.COD_ATIV_CURRIC})</span>
          </span>
          <span>
            <strong>Nota: </strong>
            <span>${matr.MEDIA_FINAL}</span>
          </span>
          <span>
            <strong>Frequência: </strong>
            <span>${matr.FREQUENCIA}</span>
          </span>
        </p>`;
  }

  function is_opt_or_tg(code) {
    return code == "OPT" || code == "TG I" || code == "TG II";
  }
  // ===========================================================================
});
