# Well, there are 3 steps to run my app:
1) Run the command ```nmp install (npm i)``` in the terminal
 2) If you don't have the json-server package:
     ```npm install -g json-server```
 If you have this package, then the second step can be skipped.
 3) Run the command ```json-server --watch server.json```
 4) Run the ```npm start``` command

You can add, mark, delete and edit todos with my app. I also added a check for names:
You will not be able to add a todo whose text will be empty, i.e. empty (todo.text.length !== 0).
Also, I generate id using UUID.
