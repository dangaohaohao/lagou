const map = {
  http: require('http'),
  https: require('https'),
}

module.exports = ({host, port, protocol = 'http'})=>{
  return (req, res, next)=>{
    map[protocol].request({
      hostname: host,
      port,
      path: req.originalUrl,
      method: 'GET'
    }, (response)=>{
      // 获得数据的content-type， content-length
      res.setHeader('content-type', response.headers['content-type']);
      res.setHeader('content-length', response.headers['content-length'] || '');
  
      response.on('data', (bf)=>{
        res.write(bf);
      })
      response.on('end', ()=>{
        res.end();
      })
  
    }).end();
  }
}