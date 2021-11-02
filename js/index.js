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

function createQuizCard(quiz)
{
	$("#quizzes").append('<div class="col-md-4 mb-4"><div class="card"><div class="card-body"><h5 class="card-title">' + quiz.identifier + '</h5><p class="card-text">' + quiz.date + '</p><button class="btn btn-primary startQuiz" data-quiz="' + quiz.id + '">Start Quiz</button></div></div></div>');
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

$(document).ready(function()
{
	getName();
	getQuizzes();
	$("#quizzes").on('click', '.startQuiz', function(){sendToQuiz($(this).data('quiz'));});
});