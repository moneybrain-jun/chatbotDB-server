'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride());

var models = {};

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
models.flower_testSchema = new Schema({
    "botId" : "String",
    "name": "String",
    "age": "String",
    "sex": "String"
});

models.flower_faqSchema = new Schema({
    "botId" : "String",
    "category": "String",
    "question": "String",
    "answer": "String"
});


models.flower_categorySchema = new Schema({
    "botId" : "String",
    "category": "String",
    "name": "String",
    "price": "String",//old:"Number"
    "picture": "String",
    "description": "String",
    "code": "String",
    "sale_price": "String",//old:"Number"
    "delivery": "String",
    "VIP": "String",
    "status": "String"
});


models.flower_reservationSchema = new Schema({
    "botId" : "String",
    "name": "String",
    "mobile": "String",
    "itemname": "String",
    "itemcode": "String",
    "date": "String",
    "hour": "String",
    "time": "String",
    "receivername": "String",
    "receivermobile": "String",
    "receiveraddress": "String",
    "deliverydate": "String",
    "deliveryhour": "String",
    "deliverytime": "String",
    "greeting": "String",
    "sendername": "String",
    "status": "String",
    "price": "String", //old:"Number"
    "itemimage": "String",
    "itemnumber": "Number",
    "email": "String",
    "bride": "String",
    "showtime": "String",
    "deliveryway": "String",
    "decorateway": "String",
    "bill": "String",
    "payway": "String",
    "allprice": "String",//old:"Number"
    "otherrequire": "String"
});


models.flower_basicSchema = new Schema({
    "botId":"String",
    "flowername" : "String",
    "phone" : "String",
    "mobile" : "String",
    "address" : "String",
    "startTime" : "String",
    "endTime" : "String",
    "holiday" : "String",
    "image" : "String",
    "description" : "String"
});


models.flower_eventSchema = new Schema({
    "botId":"String",
    "name": "String",
    "context": "String",
    "description": "String",
    "picture": "String",
    "status":"String"
});


models.flower_serviceSchema = new Schema({
    "botId":"String",
    "topic": "String",
    "name": "String",
    "description": "String",
    "picture": "String",
    "status":"String"
});

// var faq = mongo.model('flower_faq', flower_faqSchema);
// var category = mongo.model('flower_category', flower_categorySchema);
// var order = mongo.model('flower_reservation', flower_reservationSchema);
// var basic = mongo.model('flower_basic', flower_basicSchema);
// var event = mongo.model('flower_event', flower_eventSchema);
// var service = mongo.model('flower_service', flower_serviceSchema);

var getModel = function(modelName)
{
    if(mongoose.models[modelName])
    {
        return mongoose.model(modelName);
    }
    else
    {
        return mongoose.model(modelName, models[modelName + 'Schema']);
    }
};


app.route('/api/:model')//create
    .post(function (req, res)
    {
        var Model = getModel(req.params.model);

        var model = new Model(req.body);
        model.save(function (err, doc)
        {
            if(err)
            {
                console.log(err);
                return res.status(500).send({ error: err });
            }

            console.log(doc);
            res.json(doc);
        });
    })
    .get(function (req, res)//read
    {
        var Model = getModel(req.params.model);

        var query = {};
        for(var key in req.query)
        {
            query[key] = req.query[key];
        }

        Model.find(query).lean().exec(function(err, docs)
        {
            if(err)
            {
                console.log(err);
                return res.status(500).send({ error: err });
            }

            console.log(docs);
            res.json(docs);
        });
    })
    .put(function (req, res)//update
    {
        var Model = getModel(req.params.model);

        Model.find(req.body).exec(function(err, docs)
        {
            if(err)
            {
                console.log(err);
                return res.status(500).send({ error: err });
            }

            console.log(docs);
            res.json(docs);
        });


    })
    .delete(function (req, res)//delete
    {
        var Model = getModel(req.params.model);
        Model.remove(req.body).exec(function(err, docs)
        {
            if(err)
            {
                console.log(err);
                return res.status(500).send({ error: err });
            }

            console.log(docs);
            res.json(docs);
        });
    });


mongoose.connect('mongodb://localhost:27017/bot-dev', function ()
{
    console.log('mongoose connected');
    app.listen(8443, function (err)
    {
        if(err)
        {
            console.log(err);
        }
        console.log('server connected');
    });
});