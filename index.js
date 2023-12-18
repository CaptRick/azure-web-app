const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// app.get('/', (req, res) => {
//   res.send('Hello, Azure!');
// });

const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=azurewebappstorage1;AccountKey=4xorNCdRBEl491N0UppjPGB7nfGC57LsVl/PxXYIWpDpbe0plsE7RE+O+tcB5arpEe3Wj9X9nGgo+AStrjtL3Q==;BlobEndpoint=https://azurewebappstorage1.blob.core.windows.net/;FileEndpoint=https://azurewebappstorage1.file.core.windows.net/;QueueEndpoint=https://azurewebappstorage1.queue.core.windows.net/;TableEndpoint=https://azurewebappstorage1.table.core.windows.net/";
const containerName = 'static';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
