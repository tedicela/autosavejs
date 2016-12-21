# autosavejs
Javascript library for autosave data in browser LocalStorage

### Usage example:

You should include the js library in the end of the html page:
```html
<script type="text/javascript" src="/js/autosave.js"></script>
```

Place this html piece where you want to display Autosave alerts(es: You have an autosave do you want to restore click here)
```html
<div id="autosave-alert"></div>
```

To clear autosaved data(you can but it inside events for example):
```javascript
//To delete autosaved data:
Autosave.clear();
```

To initialize AutosaveJs:
```javascript
//Autosave:
Autosave.init(Poll);
checkAutosave();
setInterval( function(){  Autosave.save( Poll ) }, 20*1000 )
//END: Autosave
```
```javascript
function loadPoll_autosave(data){
	
	Autosave.saveBackup( "poll", Poll);
	
	Autosave.load(function(data){
		Poll.pollForm = data.pollForm;
		Poll.id = data.id;
		Poll.layout = data.layout;
		Poll.theme = data.theme;
		Poll.polltype = data.polltype;
		
		Poll.qcount = data.qcount;
		Poll.startquestion = data.startquestion;
		Poll.percorso = data.percorso;
		
		Poll.questions = data.questions;
		Poll.groups = data.groups;
		
		Poll.renderView();
	});
	
	html = '<div class="alert alert-info"> '
				+'<button type="button" class="close" data-dismiss="alert">×</button>'
				+'<i class="fa fa-info-sign"></i>'
				+'Clicca <a class="pointer" onclick="undoAutoSave();">qui</a> per disfare' 
			+'</div>';
	$("#autosave-alert").html(html);
	
}

function undoAutoSave(){
	Autosave.undoLoad("poll",function(data){
		Poll.pollForm = data.pollForm;
		Poll.id = data.id;
		Poll.layout = data.layout;
		Poll.theme = data.theme;
		Poll.polltype = data.polltype;
		
		Poll.qcount = data.qcount;
		Poll.startquestion = data.startquestion;
		Poll.percorso = data.percorso;
		
		Poll.questions = data.questions;
		Poll.groups = data.groups;
		
		Poll.renderView();
	});
	
	$("#autosave-alert").html("");
}

function checkAutosave(){
	check = Autosave.isAvailable();
	console.log("Check autosave");
	console.log(check);
	if(check){
		html = '<div class="alert alert-info"> '
					+'<button type="button" class="close" data-dismiss="alert">×</button>'
					+'<i class="fa fa-info-sign"></i>'
					+'Ce un <strong>autosave</strong> disponibile. Per ripristinare l\'autosave clicca <a class="pointer" onclick="loadPoll_autosave();">qui</a>' 
				+'</div>';
		$("#autosave-alert").html(html);
	}
}
```
