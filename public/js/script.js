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
		var counter = 0;
		for (var i = 0; i < data.test.length; i++){
			counter++;
			var slotContent = [];
			var totalVal = 0;
			var slotStart;
			for (var x = 0; x < data.test[i].answers.length; x++) {
				if (data.test[i].type == 'single') {
					// Radio Type
					slotContent.push('<div class="form-check"><input class="form-check-input" id="' + data.test[i].answers[x].text + '" type="radio" name="' + data.test[i].question + '" data-correct="' + data.test[i].answers[x].correct + '"><label class="form-check-label" for="' + data.test[i].answers[x].text + '">' + data.test[i].answers[x].text + '</label></div>');
					slotStart = ('<div class="form-group"><h6>#' + counter + ' ' + data.test[i].question + '</h6>');
				} else if (data.test[i].type == 'multiple') {
					// Checkbox Type
					if (data.test[i].answers[x].correct == true) {
						totalVal++;
					}
					slotContent.push('<div class="form-check" data-length="' + data.test[i].answers.length + '"><input class="form-check-input checker" id="' + data.test[i].answers[x].text + '" type="checkbox" data-correct="' + data.test[i].answers[x].correct + '"><label class="form-check-label" for="' + data.test[i].answers[x].text + '">' + data.test[i].answers[x].text + '</label></div>');
					slotStart = ('<div class="form-group" data-total="' + totalVal + '"><h6>#' + counter + '. ' + data.test[i].question + ' (Select ' + totalVal + ')</h6>');
				}
			};
			var slotEnd = ('</div><br>');
			var slotContent = slotContent.join(' ');
			var slotLine = slotStart + slotContent + slotEnd;
			$('#test-text').append(slotLine);
		}
		var slotButton = ('<input type="button" class="btn" value="Submit" />')
		$('#test-text').append(slotButton);
		// Selecting multiple answers
		$('.form-check > .checker').on('change', function() {
			var limit = $(this).closest('.form-group').attr('data-total');
			if($(this).closest('.form-group').find('.checker:checked').length > limit) {
				this.checked = false;
			}
		});
		// Submit score
		$('#test-text .btn').on('click', function(){
			$('[data-correct=true]').closest('.form-check').css('color','green');
			$('[data-correct=false]').closest('.form-check').css('color','red');
			var grandTotal = 0;
			var highestScore = 0;
			$('.form-check-input').each(function(){
				if ($(this).attr('data-correct') == 'true' && $(this).is(':checked')) {
					grandTotal++
				}
				if ($(this).attr('data-correct') == 'true') {
					highestScore++
				}
			});
			grandTotal = grandTotal * 100 / highestScore;
			grandTotal = grandTotal.toFixed(0);
			$('#final-score h2').html('Your final score is: ' + grandTotal + '%');
			$('#reset').html('<br><button class="btn">Try Again?</button>');
			$('#reset button').on('click', function(){
				window.location.reload();
			});
		});
	}
});