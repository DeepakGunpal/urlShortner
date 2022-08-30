const urlModel = require("../model/urlModel");
const shortid = require("shortid");
const { promisify } = require("util");
const { redisClient } = require("../server");

const {
  isValidData,
  isValidRequestBody,
  validUrl,
} = require("../utils/validator");

//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const urlShorten = async function (req, res) {
  try {
    let requestBody = req.body;
    let { longUrl } = requestBody;


    const shorIdCharacters = shortid.characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    );

    let urlCode = shortid.generate(shorIdCharacters);

    let baseUrl = "https://urlshortnerdg.herokuapp.com/url";

    let shortUrl = baseUrl + "/" + urlCode;

    // http://localhost:4000/fsdoierlksdfo

    //validation
    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "No data provided" });
    }

    if (!validUrl.test(baseUrl)) {
      return res
        .status(400)
        .send({ status: false, message: "base url invalid" });
    }

    if (!isValidData(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: "Long url is required" });
    }

    if (!validUrl.test(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid URL" });
    }

    longUrl = longUrl.toLowerCase().trim();

    let cachesUrlData = await GET_ASYNC(`${longUrl}`);
    if (cachesUrlData) {
      console.log("Hit");
      return res
        .status(200)
        .send({ status: true, data: JSON.parse(cachesUrlData) });
    } else {
      console.log("Miss");
      let dbLongUrl = await urlModel
        .findOne({ longUrl })
        .select({ __v: 0, _id: 0, createdAt: 0, updatedAt: 0 });
      if (dbLongUrl) {
        return res.status(201).send({
          status: true,
          data: dbLongUrl,
        });
      }

      let url = { longUrl, shortUrl, urlCode };

      //create doc
      await urlModel.create(url);

      //fetch doc
      let newLongUrl = await urlModel
        .findOne({ longUrl })
        .select({ __v: 0, _id: 0, createdAt: 0, updatedAt: 0 });

      //save in cache
      await SET_ASYNC(`${longUrl}`, JSON.stringify(newLongUrl));

      res.status(201).send({ status: true, data: newLongUrl });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

let getUrlCode = async function (req, res) {
  try {
    let requestParams = req.params.urlCode;

    let cachesUrlData = await GET_ASYNC(`${requestParams}`);

    //convert to object
    const urlData = JSON.parse(cachesUrlData);
    if (cachesUrlData) {
      return res.status(302).send(urlData);
    } else {
      let findUrlCode = await urlModel
        .findOne({ urlCode: requestParams })
        .select({ urlCode: 1, longUrl: 1, shortUrl: 1 });

      if (!findUrlCode) {
        return res
          .status(404)
          .send({ status: false, message: "Not found this url code." });
      }

      await SET_ASYNC(`${requestParams}`, JSON.stringify(findUrlCode));
      res.status(302).send(findUrlCode);
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};


module.exports = { urlShorten, getUrlCode };
