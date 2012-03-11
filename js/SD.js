var BrowserDetect = {
	BD: function () {
		this.browser = this.searchString(this.dataBrowser) || "null";
		return this.browser;
		
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},

	dataBrowser: [
		
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		
	],


};
if(BrowserDetect.BD()=='Safari'){
 document.write("<script src='js/prototype.js'></script>");
}
