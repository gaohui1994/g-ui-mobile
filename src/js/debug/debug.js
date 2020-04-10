;
(function() {
	let config = window.location.href && window.location.href.urlFormat()
	// 开启调试模式
	if(config && config.debug == "true") {
		let loadScript = function(url) {
			let script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url
			let tmp = document.getElementsByTagName("head")[0];
			tmp.appendChild(script);
			script.onload = function() {
				window.eruda && window.eruda.init();
				
				console.log(navigator.userAgent)
				console.log("----设备测试----", window.navigator)
				console.log(navigator.getUserMedia)
				console.log(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
			}
		}
		// 建议将相关文件缓存在自己的服务器
		loadScript("https://cdn.bootcss.com/eruda/2.2.0/eruda.js")
		clearTimeout(timer)
		var timer = setTimeout(function() {
			if(!window.eruda) {
				loadScript("https://cdnjs.cloudflare.com/ajax/libs/eruda/2.2.0/eruda.js")
			}
			clearTimeout(timer)
		}, 1000 * 10) // 10s加载不出来, 重新加载另一个cdn
	}
})();