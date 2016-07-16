var dict = {};

module.exports = {
	"addData" : function (name, data) {
		if (dict[name] == undefined)
			dict[name] = [];
		dict[name].push(data);
	},

	"getData" : function (name, size) {
		if (dict[name] == undefined)
			return [];

		var len = dict[name].length;
		if (size == undefined || len < size)
			return dict[name];

		return dict[name].slice(len-size,len);
	},

	"getNames" : function () {
		return Object.keys(dict);
	}
};
