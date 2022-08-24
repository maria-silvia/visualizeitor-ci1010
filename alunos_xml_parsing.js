var data_json = [];

function loadDataAsJSON(STUDENTS) {
  return $.ajax({
    url: "alunos.xml",
    dataType: "xml",
    success: function (data) {
      // Extract relevant data from XML
      alunos_xml = $("ALUNOS_CURSO", data)[0].children;
      for (let aluno of alunos_xml) {
        let aluno_json = {};
        for (let tag of aluno.children) {
          aluno_json[tag.tagName] = tag.textContent;
        }
        data_json.push(aluno_json);
      }
      buildStudentsObject(STUDENTS);
    },
    error: function (data) {
      console.log("Error loading XML data");
    },
  });
}

/**
 * Transforma o XML na estrutura comentada no final deste arquivo
 * @param {*} students
 * @returns
 */
function buildStudentsObject(students) {
  data_json.forEach((data) => {
    let grr = data["MATR_ALUNO"];
    let grade;
    if (!students[grr]) {
      // novo aluno
      students[grr] = {
        NOME_ALUNO: data["NOME_ALUNO"],
      };
      grade = {};
    } else grade = students[grr].grade; // pega grade que ja existe

    let code = data["COD_ATIV_CURRIC"];
    switch (data["DESCR_ESTRUTURA"]) {
      case "Trabalho de Graduação I":
        code = "TG I";
        break;

      case "Trabalho de Graduação II":
        code = "TG II";
        break;

      case "Optativas":
        code = "OPT";
        break;

      default:
        break;
    }

    if (!grade[code]) {
      // nova materia na grade
      grade[code] = {
        NOME_ATIV_CURRIC: data["NOME_ATIV_CURRIC"],
        COD_ATIV_CURRIC: data["COD_ATIV_CURRIC"],
        DESCR_ESTRUTURA: data["DESCR_ESTRUTURA"],
        matriculas: [],
      };
    }
    let matricula = {
      NOME_ATIV_CURRIC: data["NOME_ATIV_CURRIC"],
      COD_ATIV_CURRIC: data["COD_ATIV_CURRIC"],
      MEDIA_FINAL: data["MEDIA_FINAL"],
      FREQUENCIA: data["FREQUENCIA"],
      SITUACAO: data["SITUACAO"],
      ANO: data["ANO"],
      PERIODO: data["PERIODO"],
    };

    // add matricula em matriculas da disciplina
    grade[code].matriculas.push(matricula);

    // update matricula mais recente
    grade[code].ultima_matricula = getMaiorAnoSem(
      grade[code].ultima_matricula,
      matricula
    );

    // assign grade atualizada no grr
    students[grr].grade = grade;
  });
  return students;
}

function getMaiorAnoSem(a, b) {
  if (!a) return b;
  if (a["ANO"] == b["ANO"]) return a["PERIODO"][0] == "2" ? a : b;
  else return a["ANO"] > b["ANO"] ? a : b;
}

/* 
FORMATO DE DADOS QUE CONSTROI:
{
    "GRR00000000": {
        "NOME_ALUNO": "ALUNO 0",
        NOME_ATIV_CURRIC: 'Estatística II', 
        DESCR_ESTRUTURA: 'Obrigatorias'

        "grade": {
          
          CE003: {  
            NOME_ATIV_CURRIC: 'Estatística II', 
            DESCR_ESTRUTURA: 'Obrigatorias'
            COD_ATIV_CURRIC: 'CE003',
            matriculas: Array(1), 
            ultima_matricula: {…}
          }
          CI055: {NOME_ATIV_CURRIC: 'ALGORITMOS E ESTRUTURAS DE DADOS I', matriculas: Array(1), ultima_matricula: {…}}
          CI056: {NOME_ATIV_CURRIC: 'ALGORITMOS E ESTRUTURAS DE DADOS II', matriculas: Array(1), ultima_matricula: {…}}
          ...
        }
    },
    ...
}
*/
