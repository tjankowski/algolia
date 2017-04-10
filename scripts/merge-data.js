const fs = require('fs');
const csv = require('csvtojson');
const keyBy = require('lodash').keyBy;
const argv = require('yargs')
    .usage('Merges JSON objects from CSV file and JSON file by objectID property.\nUsage: $0 <path-to-csv-file> <path-to-json-file> [path-to-result-file]')
    .example('$0 data.csv data.json merged-data.json', 'Merges data from 2 files and saves it to merged-data.json.')
    .example('$0 data.csv data.json > merged-data.json', 'Merges data from 2 files, returns stream which can be saved to file.')
    .help('h')
    .alias('h', 'help')
    .demand(2)
    .argv;

const [csvPath, jsonPath, resultPath] = argv._;

if (!fs.existsSync(csvPath)) {
    console.error(`File "${csvPath}" doesn\'t exists.`);
    process.exit(-1);
}

if (!fs.existsSync(jsonPath)) {
    console.error(`File "${jsonPath}" doesn\'t exists.`);
    process.exit(-1);
}


const data = JSON.parse(fs.readFileSync(jsonPath));
const index = keyBy(data, 'objectID');

const csvParserOptions = {
    delimiter: ';',
    trim: true,
    checkType: true
};

let result = [];
csv(csvParserOptions)
    .fromFile(csvPath)
    .on('json', (obj) => {
        const merged = Object.assign(
            {},
            obj,
            {
                food_type: obj.food_type.split('/').map((type) => type.trim())
            },
            index[obj.objectID]
        );
        result = [...result, merged];
    })
    .on('done', (error) => {
        if (error) {
            console.error(error);
            process.exit(-1);
        }
        if (resultPath) {
            fs.writeFileSync(resultPath, JSON.stringify(result));
        }
        process.stdout.write(JSON.stringify(result));
    });

