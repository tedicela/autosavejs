# AutosaveJs
Javascript library for autosave data in browser LocalStorage

### Usage:

You should include the js library in the end of the html page:
```html
<script type="text/javascript" src="/js/autosave.js"></script>
```

To clear autosaved data(you can but it inside events for example):
```javascript
//To delete autosaved data:
Autosave.clear();
```

To initialize AutosaveJs:
```javascript
//Autosave:
Autosave.init(dataObj);
checkAutosave();
setInterval( function(){  Autosave.save( dataObj ) }, 20*1000 ) //save our data every 20 sec 
//END: Autosave
```
`dataObj` is the object with the data to save. 


##Example usage:

Place this html piece where you want to display Autosave alerts(es: You have an autosave do you want to restore click here)
```html
<div id="autosave-alert"></div>
```

```javascript
function loadData_autosave(data){
	
	Autosave.saveBackup( "backup_identifier_key", dataObj);
	
	Autosave.load(function(data){
		/*Here we can implement what we want to do with saved data*/
	});
	
	html = '<div class="alert alert-info"> '
				+'<button type="button" class="close" data-dismiss="alert">×</button>'
				+'<i class="fa fa-info-sign"></i>'
				+'Click <a class="pointer" onclick="undoAutoSave();">here</a> to undo' 
			+'</div>';
	$("#autosave-alert").html(html);
	
}

function undoAutoSave(){
	Autosave.undoLoad("backup_identifier_key",function(data){
		//This is used to load data from a backup and not latest autosave
		/*Here we can implement what we want to do with saved data*/
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
					+'There is an <strong>autosave</strong> available. To restore from the autosave click <a class="pointer" onclick="loadData_autosave();">here</a>' 
				+'</div>';
		$("#autosave-alert").html(html);
	}
}
```
