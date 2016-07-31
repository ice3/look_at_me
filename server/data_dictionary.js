var dict = {};
var staging_dict = {};
var newDataAvaillable = false;

module.exports = {
	"addData" : function (name, data) {
		if (dict[name] == undefined)
			dict[name] = [];

		if (staging_dict[name] == undefined)
			staging_dict[name] = [];

		dict[name].push(data);
		staging_dict[name].push(data);

		this.newDataAvaillable = true;
	},

	"getData" : function (name, size) {
		if (dict[name] == undefined)
			return [];

		var len = dict[name].length;
		if (size == undefined || len < size)
			return dict[name];

		return dict[name].slice(len-size,len);
	},

	"getNewData": function () {
		// return and flush the new data dict
		newDataAvaillable = false;
		result = staging_dict;
		staging_dict = {};
		return result;
	},

	"getNames" : function () {
		return Object.keys(dict);
	},
};
