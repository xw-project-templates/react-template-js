const path = require("path");
const { NodeSSH } = require("node-ssh");
const options = require("./config");

const appDir = process.cwd();
const ssh = new NodeSSH();

const outputPath = path.resolve(appDir, "build");

const connectServer = async () => {
  await ssh.connect({
    host: options.host,
    port: options.port,
    username: options.username,
    password: options.password,
  });
  console.log("连接成功~");
};

const uploadFiles = async (localPath, serverDir) => {
  const status = await ssh.putDirectory(localPath, serverDir, {
    recursive: true,
    concurrency: 10, // 进程数
  });
  console.log("传送到服务器:", status ? "成功" : "失败");
};


const deploy = async () => {
  // 1. 连接我们的服务器(ssh连接)
  await connectServer();

  // 2. 删除原来目录中的内容
  const serverDir = options.removePath;
  await ssh.execCommand(`rm -rf ${serverDir}/*`);

  // 3. 上传文件到服务器
  await uploadFiles(outputPath, serverDir);

  // 4. 关闭ssh
  ssh.dispose();
};

deploy();
