const fs = require('fs');
let content = fs.readFileSync('src/components/services/ServiceDetailClient.tsx', 'utf8');
content = content.replace(/\\\${/g, '${');
fs.writeFileSync('src/components/services/ServiceDetailClient.tsx', content);

let content2 = fs.readFileSync('src/components/home/sections/ServicesSection.tsx', 'utf8');
content2 = content2.replace(/\\\${/g, '${');
fs.writeFileSync('src/components/home/sections/ServicesSection.tsx', content2);
