let execFile = require('child_process').execFile
let fs = require('fs')
let path = require('path')
let task = (command, cb) => {
	let childProcess = execFile(command, {
		stdio: 'inherit',
		shell: true,
		cwd: __dirname,
	});
	childProcess.stdout && childProcess.stdout.on("data", (data) => {
		console.log(data);
	});
	childProcess.stderr && childProcess.stderr.on('err', (err) => {
		console.log(err);
	});
	childProcess.on('exit', (code) => {
		console.log(`exit code is ${code} ----> success`);
		if(cb) cb()
	});
}

task('webpack --progress --color', () => {
	// 读取file目录下的所有的html文件, 输出到dist目录
	let files = fs.readdirSync('src')
	files.forEach((file) => {
		if(file.includes('.html')) {
			let source = fs.createReadStream('./src/' + file);
			let target = fs.createWriteStream('./dist/' + file);
			source.pipe(target);
		}
	})

	// 将所有的html文件名存档, 备用
	let filesNameStr = JSON.parse(JSON.stringify(files)).map(ele => '/' + ele + '\n').join("")
	fs.writeFile(path.join(__dirname, 'dist', 'html-file-name.txt'), filesNameStr, function(error) {
		error ? console.log(error) : console.log("写入成功")
	})
	fs.writeFile(path.join(__dirname, 'src', 'html-file-name.txt'), filesNameStr, function(error) {
		error ? console.log(error) : console.log("写入成功")
	})

	// 图片文件夹不存在, 创建, 创建完成之后写入图片
	let exist = fs.existsSync("dist/img")
	if(!exist) {
		fs.mkdirSync("dist/img")
	}
	fs.readdirSync('src/img').forEach((file) => {
		let source = fs.createReadStream('src/img/' + file);
		let target = fs.createWriteStream('dist/img/' + file);
		source.pipe(target);
	})

})