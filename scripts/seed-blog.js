const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

// We have to extract the data or just import it if using ts-node.
// Since we have ts-node installed (usually with nextjs), we can just write a .ts file.
