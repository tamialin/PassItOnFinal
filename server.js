const express = require('express');
const app = express();


const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 5005;

const APIRouter = express.Router();
app.use("/api", APIRouter);

APIRouter.get('/quotes/random', (req, res, next) => {
    const quoteinfo = getRandomElement(quotes)
    const quote = quoteinfo.quote
    const person = quoteinfo.person
    if (quote){
        res.send({quote: {quote, person: person}})
    } else {
        res.status(404).send()
    }
});

APIRouter.get('/quotes', (req, res, next)=> {
    const quotename = req.query.person
    if (quotename){
        personquotes = []
        quotes.forEach((quote) => {
            if (quote.person == quotename){
                personquotes.push(quote)
            }
        })
        res.send({quotes: personquotes})
    }else{
        res.send({quotes})
    }
});

APIRouter.post("/quotes", (req, res, next) => {
    const quote = req.query.quote
    const person = req.query.person
    if (quote && person){
        quotes.push({quote: quote, person: person})
        res.send({quote: {quote, person: person}})
    }else{
        res.status(400).send()
    }
});




app.listen(PORT)

app.use(express.static('public'));

