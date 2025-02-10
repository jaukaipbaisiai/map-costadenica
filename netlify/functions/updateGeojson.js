const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const newGeojsonData = JSON.parse(event.body);
        const filePath = path.join(__dirname, '../../assets/data/lots.geojson');

        fs.writeFileSync(filePath, JSON.stringify(newGeojsonData, null, 4));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'GeoJSON updated successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update GeoJSON' }),
        };
    }
};
