
Home Page "/"
	Toggle Button (List Answered/UnAnswered polls) (UnAnswered) Default Selection
	Sorting by Creation Date (Recent top)

Question Page "question/:id"
	Text
	User Image (Big One)
	two Options

	Each Option (Only For Answered Questions)
		Text
		Number of People how voed
		Percentage

404 Page
	
Add
	Form to post a Question
		label: Would You Rather
		two textboxd for two answers
	Redirect to home page

Leaderboard
	* Users should be ordered in descending order based on the sum of the number of questions they’ve asked and the number of questions they’ve answered. The more questions you ask and answer, the higher up you move.
/////////////////////////
Pages
	* Login
	* Register
	* Home
	* Question Details
	* 404
	* Add Question
	* Leaderboard

Components
	* Breadcrumb
	* Header
		* Nav
		* User Avatar
    		* With Context Menu (Logout)
    	* Logo 
  	* Card

Routes
	* /
	* /login
	* /register
	* /questions/add
	* /questions/:id
	* /404
	* /leaderboard

Logic
	* If user try to access (leaderboard, question details, create question) via URL and not logged in user, system shall redirect him to Login, then back him to this page
    	* Append url to login page url.
	* User cannot change his answer for answered questions.
	* User can create question, once user click on create, system shall redirect hom to home and question will be listed under unanswered questions on top.
