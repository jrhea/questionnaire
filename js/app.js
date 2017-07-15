
$.material.init();

Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
Survey.Survey.cssType = "bootstrapmaterial";

var survey = {
  model: new Survey.Model(_questions),
  onComplete: save
};
$("#surveyElement").Survey(survey);

function save(result) {
    _questions.pages = [_questions.pages[1]];
    var survey = new Survey.Model(_questions);
    survey.mode="display";
    survey.data=result.data;
    $("#surveyElement").css('background', '#fff')
    $("#surveyElement").Survey({model:survey});
    var date = new Date().toLocaleDateString("en-US", {
      "year": "numeric",
      "month": "numeric",
      "day": "numeric"
    }).replace("/","-");
    var filename = result.data.patientInfoFirstName + "_" + result.data.patientInfoLastName + "_" + result.data.patientInfoSSN + "_" + date;
    convertHTML2Canvas(filename);
}

function convertHTML2Canvas(filename){
      var element = $("#surveyElement");
      html2canvas(element,{
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            var doc = new jsPDF("l", "pt",[canvas.width,canvas.height]);
            var image = canvas.toDataURL("image/png");
            doc.addImage(image,'png',0,0,canvas.width,canvas.height);
            doc.save(filename+'.pdf');
        }
    });
}


