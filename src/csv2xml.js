const fs = require('fs')
const path = require('path')
const csvParser = require('csv-parser')
const xmlBuilder = require('xmlbuilder')
const { argv } = require('yargs')

const { input } = argv

if (!input) {
  console.error('Please specify an input')
  process.exit(1)
}

fs.createReadStream(input)
  .pipe(csvParser())
  .on('data', (data => {
    const xml = xmlBuilder.create(data).end({ 
      pretty: true
    })

    fs.writeFile(path.join(__dirname, 'converted.xml'), xml, () => {
      console.log('Your CSV file has been converted to XML and saved as converted.xml')
      process.exit(0)
    })
  }))
