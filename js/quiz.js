function getQuizIdentifier()
{
	$.ajax
	({
		url: "http://localhost:8000/api/quizzes/" + Cookies.get('quizmaster-activeQuiz'),
		type: "GET",
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(data){$("#quizIdentifier").text(data.identifier);}
	});
}

function updateClock()
{
	let date = new Date();
	let string = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
	$("#clock").text(string);
}

function startClock()
{
	updateClock();
	let date = new Date();
	let milliseconds = date.getMilliseconds();
	window.setTimeout(function(){updateClock();window.setInterval(function(){updateClock();}, 1000);}, 1000 - milliseconds);
}

function resetTimer()
{
	$("#timer").text("0");
}

function updateTimer()
{
	$("#timer").text(parseInt($("#timer").text()) + 1);
}

function startTimer()
{
	window.setInterval(function(){updateTimer();}, 1000);
}

function populateQuestion(number, question, answer, fact, id)
{
	$("#questionNumber").text(number);
	$("#question").text(question);
	$("#answer").text(answer);
	$("#fact").text(fact);
	$("#question").data('questionId', id);
}

function getFirstQuestion()
{
	$.ajax
	({
		url: "http://localhost:8000/api/questions/byQuiz/" + Cookies.get('quizmaster-activeQuiz'),
		type: "GET",
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(data){populateQuestion(data[0].number, data[0].question, data[0].answer, data[0].fact, data[0].id);}
	});
}

function previousQuestion()
{
	resetTimer();
	$.ajax
	({
		url: "http://localhost:8000/api/questions/" + $("#question").data('questionId') + "/previous",
		type: "GET",
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(data){populateQuestion(data.number, data.question, data.answer, data.fact, data.id);}
	});
}

function nextQuestion()
{
	resetTimer();
	$.ajax
	({
		url: "http://localhost:8000/api/questions/" + $("#question").data('questionId') + "/next",
		type: "GET",
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(data){populateQuestion(data.number, data.question, data.answer, data.fact, data.id);}
	});
}

$(document).ready(function()
{
	startClock();
	startTimer();
	getQuizIdentifier();
	getFirstQuestion();

	$("#resetTimer").click(function(){resetTimer();});
	$("#nextQuestion").click(function(){nextQuestion();});
	$("#previousQuestion").click(function(){previousQuestion();});
});