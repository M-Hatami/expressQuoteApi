const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

const createElement = (queryArguments) => {
  if (
    queryArguments.hasOwnProperty("quote") &&
    queryArguments.hasOwnProperty("person")
  ) {
    return {
      quote: queryArguments.quote,
      person: queryArguments.person,
    };
  } else {
    return false;
  }
};

app.get("/api/quotes/random/", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.send({ quote: quote });
});

app.get("/api/quotes", (req, res, next) => {
  const person = req.query.person;
  if (!person) {
    res.send({ quotes });
  } else {
    const qByPersonArr = quotes.filter((quote) => quote.person === person);
    res.send({ quotes: qByPersonArr });
  }
});

app.post("/api/quotes", (req, res, next) => {
  if (req.query.quote && req.query.person) {
    const newQuote = { quote: req.query.quote, person: req.query.person };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
