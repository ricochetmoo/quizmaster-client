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

function createQuestion(question)
{
	$("#questions").append('<div class="row mb-4" id="question"><div class="col-md-2 col-xs-3"><h1 class="display-3 text-center">' + question.number + '</h1></div><div class="col-md-8 col-xs-9"><h4>' + question.question + '</h4><p class="mb-0">' + question.answer + '</p><p>' + question.fact + '</p></div><div class="col-md-2 text-center"><h5>' + question.time + '</h5><button class="btn btn-primary mb-1" disabled><span class="fa fa-pencil"></span>&nbsp;Edit</button><button class="btn btn-danger" disabled><span class="fa fa-trash-alt"></span>&nbsp;Delete</button></div></div>');
}

function getQuestions()
{
	$.ajax
	({
		url: "http://localhost:8000/api/questions/byQuiz/" + Cookies.get('quizmaster-activeQuiz'),
		type: "GET",
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(data){data.forEach(question => createQuestion(question))}
	});
}

function addQuestion()
{
	const question = $("#newQuestion-question").val();
	const answer = $("#newQuestion-answer").val();
	const fact = $("#newQuestion-fact").val();
	const time = $("#newQuestion-time").val();

	$.ajax
	({
		url: "http://localhost:8000/api/questions",
		type: "POST",
		data: {"question": question, "answer": answer, "fact": fact, "time": time, "quiz": Cookies.get('quizmaster-activeQuiz')},
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(data){createQuestion(data);$("#newQuestionForm").trigger("reset");}
	});
}

$(document).ready(function()
{
	getQuizIdentifier();
	getQuestions();
	$("#newQuestionButton").click(function(){$("#newQuestionForm").removeClass("d-none");});
	$("#newQuestion-save").click(function(){addQuestion();});
});