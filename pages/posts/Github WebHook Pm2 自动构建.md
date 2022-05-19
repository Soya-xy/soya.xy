---
title: Github WebHook Pm2 自动构建Nuxt3
date: 2022-05-16 18:06:36
thumbnail: /images/nav-github.png
tags: ['git', 'nuxt3', 'hook']
---

## Github WebHook

利用`Github WebHook`可以实现 push 提交自动构建，构建完成后自动发布到线上。

start.sh{.filename}

```shell
#!/bin/bash
echo ""
#输出当前时间
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "Start"

#git项目路径 就是你服务器网站允许的地址
gitPath="/www/wwwroot/blog/soya.xy"
#git 网址
gitHttp="https://github.com/Soya-xy/soya.xy.git"
pmName="blog"
echo "Web站点路径：$gitPath"

#判断项目路径是否存在
if [ -d "$gitPath" ]; then
        cd $gitPath
        #判断是否存在git目录
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                sudo git clone $gitHttp gittemp
                sudo mv gittemp/.git .
                sudo rm -rf gittemp
        fi
        echo "拉取最新的项目文件"
        # 这里是清理脚本创建导致修改，无法pull
        sudo git restore .
        # 清理后开始拉取最新的项目文件
        sudo git pull
        echo "拉取结束End"

        echo "设置目录权限"
        sudo chmod -R 777 ~/.pm2
        sudo chown -R www:www $gitPath
        #这里是自定义的配置，我这里有yarn和npm去安装包，然后直接删掉应用重启，如果是vue的话
        sudo yarn build
        #可以在PM2之前插入npm run build去打包后重启（反正都是自定义了自己看看）
        echo "pm2 删除上个应用"
        sudo pm2 delete $pmName
        echo "pm2启动新应用"
        sudo pm2 start .output/server/index.mjs --name $pmName
        exit
else
        echo "该项目路径不存在"
                echo "新建项目目录"
        mkdir $gitPath
        cd $gitPath
        #判断是否存在git目录
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                sudo git clone $gitHttp gittemp
                sudo mv gittemp/.git .
                sudo rm -rf gittemp
        fi
        echo "拉取最新的项目文件"
        sudo git reset --hard origin/master
        sudo git pull
        echo "设置目录权限"
        sudo chown -R www:www $gitPath
        echo "End"
        exit
fi

```

deploy.js{.filename}

```js
const http = require('http')
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/webhook', secret: 'cs123123' })

function RunCmd(cmd, args, cb) {
  const spawn = require('child_process').spawn
  const child = spawn(cmd, args)
  const result = ''
  child.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  child.stdout.on('end', () => {
    cb('Run Over')
  })
}

http
  .createServer((req, res) => {
    handler(req, res, () => {
      res.statusCode = 404
      res.end('no such location')
    })
  })
  .listen(7777)

handler.on('error', (err) => {
  console.error('Error:', err.message)
})

handler.on('push', (event) => {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref,
  )
  const shpath = './blog-start.sh'
  RunCmd('sh', [shpath], (result) => {
    console.log(result)
  })
})

handler.on('issues', (event) => {
  console.log(
    'Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title,
  )
})
```
