let execFile = require('child_process').execFile;

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
	// 执行文件的 复制
	let fs = require('fs');
	// 读取file目录下的所有的文件目录
	fs.readdirSync('src').forEach((file) => {
		if(file.includes('.html')) {
			let source = fs.createReadStream('./src/' + file);
			let target = fs.createWriteStream('./dist/' + file);
			source.pipe(target);
		}
	})
	
	console.log("文件复制成功")

})