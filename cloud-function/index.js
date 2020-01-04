const Wiki = require('wikijs').default
const wiki = Wiki()
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const regex = /wiki: ?["']?([[A-Za-z0-9\s]+)["'\s]?/gi

exports.fromTwilio = async (req, res) => {
    const twiml = new MessagingResponse();
    if (req.body.Body) {
        if (req.body.Body.match(regex)) {
            const matches = regex.exec(req.body.Body)
            const searchTerm = matches[1]
            const page = await wiki.find(searchTerm)
            const summary = await page.summary()
            twiml.message(`${page.url()}:\n ${summary}`)
            console.log(`'${searchTerm}' | ${req.body.From} | ${page.url()}`)
        } else {
            twiml.message('Syntax - wiki:"search term"')
        }
        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        res.end(twiml.toString());
    } else {
        console.log('Invalid request')
        res.status(400)
        res.end('Invalid request')
    }
};