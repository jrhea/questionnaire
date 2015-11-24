
 function generatePDF(session) {
  var result = "";
  var table = document.getElementById("summary");
  if(table.textContent.indexOf("{{session.type}}") === -1)
  {
    var pageWidth = 791.9; //11 inches in pt
  	var doc = new jsPDF('l', 'pt', 'letter');
  	var patientInfo = "Patient Name: " + session.firstName + " " + session.lastName;
  	var date =  "Date: " + session.date;
  	var header = function (data) {
  		doc.setFontSize(10);
  		doc.setTextColor(40);
  		doc.setFontStyle('bold');
  		doc.text(patientInfo, data.settings.margin.left, 20);
  		doc.text(date, pageWidth - data.settings.margin.left - doc.getTextWidth(date), 20);
    };
  	var res = doc.autoTableHtmlToJson(table);
  	doc.autoTable(res.columns, res.data,
  		{
  			styles:
  			{
  				cellPadding: 5,
  				fontSize: 8,
  				overflow: 'linebreak',
  				halign: 'left',
  				valign: 'middle',
  			},
  			headerStyles: {
  		    //fillColor: 245,
  		    //textColor: 80
        },
  			beforePageContent: header,
  			drawRow: function (row, data) {
  			            // Colspan
  			            doc.setFontStyle('bold');
  			            doc.setFontSize(10);
  			            if (row.index === 0) {
  			                // doc.setTextColor(200, 0, 0);
  											//
  			                // doc.autoTableText(type, data.settings.margin.left + data.table.width / 2, row.y + row.height / 2, {
  			                //     halign: 'center',
  			                //     valign: 'middle'
  			                // });
  			                // data.cursor.y += 20;
  			            }
  									else if (row.index === data.table.rows.length-1){
  										//
  										// 	doc.autoTableText("Score: ", data.settings.margin.left + data.settings.styles.cellPadding, row.y + row.height / 2, {
  										// 	halign: 'left',
  										// 	valign: 'middle'
  							      // });
  									  //
  										// doc.autoTableText("100", data.settings.margin.left + data.settings.styles.cellPadding + data.table.rows[0].cells[0].width+data.table.rows[0].cells[1].width, row.y + row.height / 2, {
  										// halign: 'left',
  										// valign: 'middle'
  										//   	});
  									  // data.cursor.y += 20;
  									}
  			        },
  							drawCell: function (cell, data) {
  								//skip a row by returning false
  										// if (data.row.index === data.table.rows.length-1) {
  										// 		return false;
  										// }

  						},
  			createdCell: function (cell,data) {
  				if(data.row.index == res.rows.length-1)
  				{
  					cell.styles.fontStyle = 'bolditalic';
  					cell.styles.textColor = [255, 100, 100];
  				}
  			},
  			startY: 30,
  			margin: 10,
  			theme: 'striped'//,
  			//tableWidth: 'auto'
  		});
      //	doc.save('foo.pdf');
      result = doc.output('datauristring');
      //var x = window.open();
      //x.document.open();
      //x.document.location=string;
      return result;
  }
  else {
    return result;
  }
}
