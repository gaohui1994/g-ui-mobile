String.prototype.urlFormat = function() {
	try {
		// let arr = location.href.split("?").length>1 && location.href.split("?")[1].split("&")
		let arr = (this.split("?").length > 1 && location.href.split("?")[1].split("&")) || []
		let appInfo = {}
		arr.forEach((ele) => {
			appInfo[ele.split("=")[0]] = ele.split("=")[1]
		})
		return appInfo
	} catch(e) {
		console.log(e)
		return false
	}
}