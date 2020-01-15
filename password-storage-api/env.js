const fs = require('fs')

const filename = `.env.development`

if (fs.existsSync(filename)){
    require('dotenv-expand')(
        require('dotenv-safe').config({
            path: filename,
            example: '.env.example',
            allowEmptyValues: true
        })
    )
}