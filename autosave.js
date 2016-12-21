String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


var Autosave = {
	
	backup:{},
	unique:"",
	
	init:function(d){
		
		this.unique = window.location.href.hashCode();
		
		hash = JSON.stringify(d).hashCode();
		
		// Store
		as_saved = localStorage.getItem("autosave_current_"+this.unique);
		as_saved = $.parseJSON(as_saved);
		
		if(typeof as_saved !== 'undefined' && as_saved != null && as_saved.hash != hash){
			
			localStorage.setItem("autosave_story_"+this.unique, JSON.stringify(as_saved) );
		}else{
			localStorage.removeItem("autosave_story_"+this.unique);
		}
	},
	save:function(d){
		
		hash = JSON.stringify(d).hashCode();
		
		if (typeof(localStorage) !== "undefined") {
			
			// Store
			as_saved = localStorage.getItem("autosave_current_"+this.unique);
			as_saved = $.parseJSON(as_saved);
			
			if(typeof as_saved === 'undefined' || as_saved == null || as_saved.hash != hash){
			
				d = new Date();
				datetime = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
				
				obj = {
					hash: hash,
					data:Poll,
					datetime:datetime,
				};
				localStorage.setItem("autosave_current_"+this.unique, JSON.stringify(obj) );
			}
			
		} else {
			// Sorry! No Web Storage support..
			console.log("Sorry! No Web Storage support..");
		}
	},
	load:function(callback){
		
		if(typeof callback === 'undefined' ) return false;
		
		data = $.parseJSON(localStorage.getItem("autosave_story_"+this.unique) );
		callback(data.data);
	},
	undoLoad:function(backupToLoad, callback){
		callback($.parseJSON(this.backup[backupToLoad] ) );
		this.clear();
	},
	saveBackup:function(backupKey, data){
		this.backup[backupKey] = JSON.stringify(data);
	},
	isAvailable:function(){
		
		as = localStorage.getItem("autosave_story_"+this.unique);
		if(typeof as !== 'undefined' && as != null && as != "" && as != {} ){
			return true;
		}else{
			return false;
		}
	},
	clear:function(){
		localStorage.removeItem("autosave_story_"+this.unique);
		localStorage.removeItem("autosave_current_"+this.unique);
	},
};
