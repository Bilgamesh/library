const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreads-service');
const util = require('util');

const parser = xml2js.Parser({ explicitArray: false });

const goodreadsService = () => {
  const getBookById = (id) => new Promise( async (resolve, reject) => {
      try {
        const response = await axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=IHJHCtP7eQOVWvN0R8QMjg`);
        const result = await util.promisify(parser.parseString.bind(parser))(response.data);
        debug(result);
        resolve(result.GoodreadsResponse.book);
      } catch (err) {
        debug(err);
      }
  });
  return { getBookById };
};
module.exports = goodreadsService();
