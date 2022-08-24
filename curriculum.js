const CURRICULUM_BCC_2011 = {
  1: ["CI068", "CI055", "CM046", "CM045", "CM201"],
  2: ["CI210", "CI056", "CI067", "CM005", "CM202"],
  3: ["CI212", "CI057", "CI064", "CI237", "CI166"],
  4: ["CI215", "CI062", "CE003", "CI058", "CI164"],
  5: ["CI162", "CI065", "CI059", "CI061", "SA214"],
  6: ["CI163", "CI165", "CI209", "CI218", "CI220"],
  7: ["CI221", "CI211", "OPT", "OPT", "TG I"],
  8: ["OPT", "OPT", "OPT", "OPT", "TG II"],
};

/**
 * Popula a table com as disciplinas da grade de 2011
 */
function buildCurriculumTable() {
  const curriculum = CURRICULUM_BCC_2011;
  for (const semester in curriculum) {
    classes = curriculum[semester];
    $("table > tbody > tr").each((id, tr) => {
      $(`<td>${classes[id]}</td>`).appendTo(tr);
    });
  }
}
