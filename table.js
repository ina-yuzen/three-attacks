console.log("aaaaaaaa");

var IdTable = Class.create({
	callback: function(response){
          if (response.isError()) {
            alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
          }

        var data = response.getDataTable();
	this.table = data;
        },
	initialize: function(){ var query = new google.visualization.Query("https://spreadsheets.google.com/a/google.com/tq?key=0AprwHw_VarWwdHc4QmpBNnBCdThpUERGVk1DQnVVYkE");
		query.setQuery('select C where C IS NOT NULL ORDER BY A DESC LIMIT 1000');
		query.send(this.callback);
	}
});
