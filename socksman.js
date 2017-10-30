const fs = require('fs')
const Random = require('random-js')

function socksman(config)
{
	this.socksFile = config.socksFile || null
	this.circleCnt = 0
	this.socksList = []

	this.random = new Random(Random.engines.browserCrypto)

	this.init()
}

socksman.prototype.init = function()
{
	let self = this
	let srcSocksArr = []
	let srcSocksObj = {}

	if (self.socksFile) {
		srcSocksArr = fs.readFileSync(self.socksFile).toString().split("\n")
		srcSocksArr.forEach(function(socks){
			if (socks.length > 5) 
				srcSocksObj[socks] = 1
		})

		self.socksList = Object.keys(srcSocksObj)

		if ( self.count() == 0 ) {
			let error = new Error;
			error.code = 'ENOSOCKS'
			error.message = 'socksman(): SOCKS list is empty'

			throw error
		}
	}
}

socksman.prototype.count = function(){
	return this.socksList.length
}

socksman.prototype.getCircle = function(){
	let self = this

	let proxyStr = self.socksList[ self.circleCnt % self.count() ]

	self.circleCnt++
	
	let proxyHost =  proxyStr.split(':')[0]
	let proxyPort = proxyStr.split(':')[1]

	return { host: proxyHost, port: proxyPort }
}

socksman.prototype.getRandom = function(){
	let self = this
	let randomDigit = self.random.integer( 0, self.count()-1 )

	let proxyStr = self.socksList[randomDigit]
	
	let proxyHost =  proxyStr.split(':')[0]
	let proxyPort = +proxyStr.split(':')[1]

	return { host: proxyHost, port: proxyPort }
}

module.exports = socksman
