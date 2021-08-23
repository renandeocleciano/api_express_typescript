var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name:			{ type: String, required: true },
	dateEntry:  	{ type: Date, default: Date.now },
	titulos: [
		{
			status:         { type: Number, default: 0 },
			dateEntry:  	{ type: Date, default: Date.now },
			dateOverdue:  	{ type: Date, default: Date.now },
			amount: 		{ type: Number, default: 0, get : val => val/1000, set: val => val*1000},
		}
	]
},
{
    toObject: { virtuals: true},
	toJSON  : { getters: true }
});


schema.virtual('details').get(function () {
	var tam = this.titulos.length;
	var amount = 0;
	for(var i = 0; i < tam; i++) {
		if(this.titulos[i].status == 1) {
			amount += this.titulos[i].amount;
		}
	}
	return {
		"overdue" : (amount > 0) ? true : false,
		"total" : amount
	}
});

module.exports = mongoose.model('Cliente', schema, 'Cliente');