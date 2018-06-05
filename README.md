
PROJET WEB 3 - Florian Sanchez

Welcome to my angular app SeekPlayers

Read this instructions for installing the project on your computer

1/ git clone https://github.com/PassNum-Promo4/projetwebs3-FlorianSanchez.git

2/ In root folder open a console in seekplayers folder and server folder and run npm install

3/ For import a json database let's open a console and paste

    mongoimport -h ds137600.mlab.com:37600 -d seekplayersdb -c <collection> -u <user> -p <password> --file <input file>

    collection must be named: infoplayers, users
    user: your username
    password: your password
    input file: infoplayers.json, users.json

4/ Now let's run the application, run ng serve -o on seekplayers folder, then run node server on server folder

5/ On your webbrowser you can see the project at localhost:4200



