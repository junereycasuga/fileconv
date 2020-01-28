const fs = require('fs')
const path = require('path')
const parser = require('xml2json')
const { argv } = require('yargs')

const { input } = argv

if (!input) {
  console.error('Please specify an input')
  process.exit(1)
}

fs.readFile(input, (err, data) => {
  const parsedJSON = parser.toJson(data)
  
  fs.writeFile(path.join(__dirname, 'converted.json'), parsedJSON, () => {
    console.log('Your XML file has been converted to JSON and saved us converted.json')
    process.exit(0)
  })
})
