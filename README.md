# Portal

Functionalities Working:

- Users will be able to see and search datasets of retail Stores.
- User will be able to add new retail store information. 

For Ubuntu 14.04

```
First, there are a few essentials for installing node
	Needed for Node:
	$sudo apt-get install node
	$sudo apt-get install npm
	Needed for Grunt
	$sudo npm install -g grunt-cli
	Needed for Bower
	$npm install -g bower
```
```
Cloning into the code
	$git clone https://github.com/gouravjeet/Portal.git
	cd SGIS-2.0/
	grunt serve 
```
Now, you need to install the project dependencies
```
Needed for Bower Packages:
	$bower install --save
```
```
Needed for Grunt Packages:
	$sudo npm install --save
	The --save option instructs NPM to include the package inside of the dependencies section of your package.json automatically, thus saving you an additional step.
```
Technolgies Used
-----------

Portal uses a number of open source projects to work properly:

* bower	- Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you’re looking for.

* grunt - Jabascript task zRunner
* yeoman - Yeoman helps you kickstart new projects, prescribing best practices and tools to help you stay productive.
* [Ace Editor] - awesome web-based text editor
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [jQuery] - Javascript library

[gis_csdt]:https://github.com/kathleentully/gis_csdt



