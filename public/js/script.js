$(document).ready(function(){
	// Parse through JSON data
	var location = "/js/test.json";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
			var res = JSON.parse(this.responseText);
            testParse(res);
  		}
	};
	xmlhttp.open("GET",location,true);
	xmlhttp.send();
	function testParse(data){
		for (var i = 0; i < data.test.length; i++){
			var slotStart = ('<div class="form-group"><h6>' + data.test[i].question + '</h6>');
			var slotContent = [];
			for (var x = 0; x < data.test[i].answers.length; x++) {
				slotContent.push('<div class="form-check"><input class="form-check-input" type="checkbox" data-correct="' + data.test[i].answers[x].correct + '"><label class="form-check-label">' + data.test[i].answers[x].text + '</label></div>')
			};
			var slotEnd = ('</div>');
			var slotContent = slotContent.join(' ');
			var slotLine = slotStart + slotContent + slotEnd;
			console.log(slotLine);
			$('#test-text').append(slotLine);
		}
	}
});