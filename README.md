# socksman is the Socks Manager
Store and manage socks5-proxy lists for modules that requires socks5 for work

Example:
--------

```javascript
const socksman = require('socksman')

const FILE_SOCKS = 'socks.txt'

var sman = new socksman({
	socksFile: FILE_SOCKS,
})

console.log(sman.getCircle())
console.log(sman.getCircle())
console.log(sman.getRandom())

// Result:
// { host: '212.237.1.204', port: '18889' }
// { host: '212.237.1.50', port: '18889' }
// { host: '5.249.1.172', port: 18889 }
```
