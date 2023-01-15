export default function Feed(xml) {
  return(
    'mixcloud user not found'
  )
}

export async function getServerSideProps({req,res,query}) {
  const { slug } = query;

  const apiUrl = 'https://api.mixcloud.com/' + slug + '/feed'
  const response = await fetch(apiUrl);
  const json = await response.json();

  if (response.ok) {
    const filteredData = json['data'].filter(item => item['type'] === 'upload');
    let xml = '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">\n';
    xml += '<channel>\n';
    xml += '<title>\n' + '<![CDATA[ ' + json['name'] + ' ]]>' + '</title>\n';
    xml += '<description>\n' + '<![CDATA[ ' + json['name'] + ' ]]>' + '</description>\n';
    xml += '<link>\n' + 'https://mixcloud.com' + '</link>\n';
    xml += '<atom:link href="https://mixcloud.com" rel="self" type="application/rss+xml" />\n';
    for (let key in filteredData) {
      if (filteredData.hasOwnProperty(key)) {
        const pubDate = new Date( filteredData[key].created_time ).toUTCString();
        xml += '<item>\n';
        xml += '<title>\n' + '<![CDATA[ ' + filteredData[key].cloudcasts[0].name + ' ]]>' + '</title>\n';
        xml += '<description>\n' + filteredData[key].cloudcasts[0].name + '</description>\n';
        xml += '<pubDate>\n' + pubDate + '</pubDate>\n';
        xml += '<link>\n' + filteredData[key].url + '</link>\n';
        xml += '<guid isPermaLink="true">\n' + filteredData[key].url + '</guid>\n';
        xml += '</item>\n';
      }
    }
    xml += '</channel>\n';
    xml += '</rss>';
  
    res.setHeader('Content-Type', 'text/xml')
    res.write(xml)
    res.end()
  }

  return {
    props: {}
  }
}
