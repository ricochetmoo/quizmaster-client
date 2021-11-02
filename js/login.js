function loggedInCheck()
{
	let expiry = new Date(Cookies.get('quizmaster-expiryTime'));
	let date = new Date();
	if (Cookies.get('quizmaster-accessToken') && expiry > date)
	{
		window.location.href = "index.html";
	}
	else
	{
		Cookies.remove('quizmaster-accessToken');
		Cookies.remove('quizmaster-expiryTime');
	}
}

function handleResponse(data)
{
	Cookies.set('quizmaster-accessToken', data.token);
	let date = new Date();
	date = new Date(date.getTime() + data.expires_in * 1000)
	Cookies.set('quizmaster-expiryTime', date);
	window.location.href = "index.html";
}

function handleAuthError()
{
	$("#email").addClass("is-invalid");
	$("#password").addClass("is-invalid");
	$("#error").removeAttr("hidden");
	$("#password").val("");
}

function login()
{
	let email = $("#email").val();
	let password = $("#password").val();
	
	let ajax = $.post("http://localhost:8000/api/login", {"email": email, "password": password}, function(data){handleResponse(data)}).fail(function(){handleAuthError();});
}

$(document).ready(function()
{
	loggedInCheck();
	$("#loginForm").submit(function(){login();return false;});
});