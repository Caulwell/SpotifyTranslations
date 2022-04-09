const axios = require("axios");
const cheerio = require('cheerio');
const url = "https://dictionary.cambridge.org/dictionary/spanish-english/";


const getDefinitions = async (word) => {

    // HANDLE WORD NOT BEING THERE AND SELECT FIRST OPTION

    const { data } = await axios.get(url + word);
    const $ = cheerio.load(data);

    const returning = {
        wordType: $(".pos.dpos").first().text(),
        gender: $(".gc.dgc").first().text(),
        pronounciation: $(".ipa.dipa").first().text(),
        definitions: [],
    };

    $(".pos-body").first().children(".sense-block.pr.dsense.dsense-noh").each((i, elem) => {

        let obj = {};

        const c = cheerio.load(elem);

        obj.domain = c(".domain.ddomain").first().text();
        obj.usage = c(".usage.dusage").first().text();
        obj.spanishDef = c(".def.ddef_d.db").first().text();

        const parentDiv = c(".def-body.ddef_b.ddef_b-t").first();
        obj.translations = c(".def-body.ddef_b.ddef_b-t").first().children(".trans.dtrans").text().split(",").map(elem => elem.trim());
        obj.exampleSpan = c(".examp.dexamp").first().children(".eg.deg").text();
        obj.exampleTrans = c(".examp.dexamp").first().children(".trans.dtrans.hdb").text();

        returning.definitions.push(obj);

    });

    return returning;

    

};


module.exports = {
    getDefinitions
};