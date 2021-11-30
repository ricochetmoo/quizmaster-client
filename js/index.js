function getName()
{
	$.ajax
	({
		url: "http://localhost:8000/api/profile",
		type: "GET",
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(data){$("#name").text(data.user.name);}
	});
}

function sendToQuiz(quiz)
{
	Cookies.set('quizmaster-activeQuiz', quiz);
	window.location.href = "quiz.html";
}

function sendToEdit(quiz)
{
	Cookies.set('quizmaster-activeQuiz', quiz);
	window.location.href = "edit.html";
}

function createQuizCard(quiz)
{
	$("#quizzes").append('<div class="col-md-4 mb-4"><div class="card"><div class="card-body"><h5 class="card-title">' + quiz.identifier + '</h5><p class="card-text">' + quiz.date + '</p><button class="btn btn-primary startQuiz mb-1" data-quiz="' + quiz.id + '"><span class="fa fa-hourglass-start"></span>&nbsp;Start Quiz</button><button class="btn btn-secondary editQuiz mb-1" data-quiz="' + quiz.id + '"><span class="fa fa-pencil"></span>&nbsp;Edit</button></div></div></div>');
}

function getQuizzes()
{
	$.ajax
	({
		url: "http://localhost:8000/api/quizzes",
		type: "GET",
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(data){data.forEach(quiz => createQuizCard(quiz))}
	});
}

function createQuiz()
{
	const quizIdentifer = $("#quizIdentifier").val();
	const quizDate = $("#quizDate").val();
	
	$.ajax
	({
		url: "http://localhost:8000/api/quizzes",
		type: "POST",
		data: {"identifier": quizIdentifer, "date": quizDate},
		headers: {"Authorization": "Bearer " + Cookies.get('quizmaster-accessToken')},
		success: function(){location.reload()}
	})
}

$(document).ready(function()
{
	getName();
	getQuizzes();
	$("#quizzes").on('click', '.startQuiz', function(){sendToQuiz($(this).data('quiz'));});
	$("#quizzes").on('click', '.editQuiz', function(){sendToEdit($(this).data('quiz'));});
	$("#createQuizSubmit").on('click', function(){createQuiz();});
});