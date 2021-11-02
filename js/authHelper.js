function loggedInCheck()
{
	let expiry = new Date(Cookies.get('quizmaster-expiryTime'));
	let date = new Date();
	
	if (!Cookies.get('quizmaster-accessToken') || expiry < date)
	{
		Cookies.remove('quizmaster-accessToken');
		Cookies.remove('quizmaster-expiryTime');
		window.location.href = "login.html";
	}
}

function logOut()
{
	Cookies.remove('quizmaster-accessToken');
	Cookies.remove('quizmaster-expiryTime');
	window.location.href = "login.html";
}

$(document).ready(function()
{
	loggedInCheck();
	$("#logOut").click(function(){logOut();})
});