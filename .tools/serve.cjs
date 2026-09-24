const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain','.xml':'application/xml'};
http.createServer((request,response)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url,'http://localhost').pathname); } catch {response.writeHead(400);response.end();return;}
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){response.writeHead(403);response.end();return;}
  fs.readFile(file,(error,data)=>{
    if(error){response.writeHead(404);response.end('Not found');return;}
    response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
    response.end(data);
  });
}).listen(4175,'127.0.0.1',()=>console.log('Revenue Rescue preview: http://127.0.0.1:4175'));
