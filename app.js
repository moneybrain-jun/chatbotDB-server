var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/bot-dev', function () {

});


var ReservationSchema = new Schema({
    "order_name": "String",
    "order_mobile": "String",
    "order_itemname": "String",
    "order_itemcode": "String",
    "order_date": "String",
    "order_hour": "String",
    "order_receivername":"String",
    "order_receivermobile": "String",
    "order_receiveraddress": "String",
    "order_deliverydate": "String",
    "order_deliveryhour": "String",
    "order_greeting":"String",
    "order_sendername":"String",
    "order_status":"String",
    "order_time" : "String",
    "order_price" : "Number",
    "order_itemimage" : "String",
    "order_itemnumber" : "Number",
    "order_email" : "String",
    "order_bride" : "String",
    "order_showtime" : "String",
    "order_deliveryway" : "String",
    "order_decorateway" : "String",
    "order_bill" : "String",
    "order_payway" : "String",
    "order_allprice" :"Number",
    "order_deliverytime" : "String",
    "order_otherrequire" : "String"
});

var categorySchema = new Schema({
    "category" : "String",
    "name" : "String",
    "price" : "Number",
    "picture" : "String",
    "description" : "String",
    "code" : "String",
    "sale_price" : "Number",
    "delivery" : "String",
    "VIP" : "String",
    "status":"String"
});

var faqSchema = new Schema({
    "category" : "String",
    "question" :"String",
    "answer" : "String"
});


var Order = mongoose.model('flower-reservations', ReservationSchema);
var category = mongoose.model('flower-categories', categorySchema);
var faq = mongoose.model('flower-faqs', faqSchema);





app.listen(8443, function (err) {
    if(err)
    {
        console.log(err);
    }
    console.log('server connected');
});


app.post('/api/:model/create', function (req, res) {
    var Model;
    if(mongoose.models[req.params.model])
        Model =  mongoose.model(req.params.model);
    else
        Model = mongoose.model(req.params.model, req.params.model + 'Schema');

    console.log(req);
	
    var model = new Model(req.body);


    model.save(function (err, doc) {
        if(err)
        {
            console.log(err);
        }
        console.log(doc);
        res.json(doc);
    });
});

app.get('/api/:model/read', function (req, res) {
    var Model;
    if(mongoose.models[req.params.model])
    {
        Model =  mongoose.model(req.params.model);
    }
    else
    {
        Model = mongoose.model(req.params.model, req.params.model + 'Schema');
    }

    Model.find(req.json.query).lean().exec(function(err,docs){
        if(err)
        {
            console.log(err);
        }
        console.log(docs);
        res.json(docs);
    });

});

app.post('/api/:model/update', function (req, res) {
    var Model;
    if(mongoose.models[req.params.model])
    {
        Model =  mongoose.model(req.params.model);
    }
    else
    {
        Model = mongoose.model(req.params.model, req.params.model + 'Schema');
    }

    Model.find(req.body).exec(function(err,docs){
        if(err)
        {
            console.log(err);
        }

        console.log(docs);
        res.json(docs);
    });


});

app.post('/api/:model/delete', function (req, res) {
    var Model;
    if(mongoose.models[req.params.model])
    {
        Model =  mongoose.model(req.params.model);
    }
    else
    {
        Model = mongoose.model(req.params.model, req.params.model + 'Schema');
    }

    Model.remove(req.body).exec(function(err,docs){
        if(err)
        {
            console.log(err);
        }
        console.log(docs);
        res.json(docs);
    });
});
