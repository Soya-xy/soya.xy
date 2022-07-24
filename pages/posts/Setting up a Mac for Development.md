---
title: Setting up a Mac for Development
date: 2022-07-23 11:17:29
highlighted: true
thumbnail: https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/apple.png
---

昨天忘记备份直接升级了`13.0 Beta版(22A5295i)`导致各种软件都不能正常使用，所以我需要备份一下。
并且可以记录一下我对我的MacBook Pro的常用软件集齐配置。

# 起步
作为国内的开发者，第一款软件我认为必定是`Clash`或者其他的代理软件。

- [Clash](https://github.com/Fndroid/clash_for_windows_pkg)
- [Homebrew](#Homebrew)
- [Shell](#Shell)
- [Node](#Node)
- [SSH](#SSH)
- [Soft](#Soft)



# Homebrew
Homebrew它是一个软件包管理器，可以帮助我们安装软件包，并且可以自动更新软件包。

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## 常用软件
参考[taniarascia](https://www.taniarascia.com/setting-up-a-brand-new-mac-for-development/#shell)
```bash
## Shell Programs
brew install \
  git \
  bat \
  exa \
  tldr \
  fzf &&

# GUI programs
brew install --cask \
  visual-studio-code \
  google-chrome \
  iterm2 \
  docker \
  discord \
  postgres \
  bear \
```


# Shell
在MAC上我推荐使用 `zsh`，因为 `zsh` 是一个强大的 shell，它支持命令行参数，能够更好的管理系统，更好的使用系统，更好的维护系统。

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

软件方面搭配 [ITerm2](https://www.iterm2.com/)

主题方面选择[P10K](https://github.com/romkatv/powerlevel10k)

附上截图![ITerm2](https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/WeChat70251dcbc758ba2a32b85d129c9eb6b1.png)

背景图![background-image](https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/WeChat70251dcbc758ba2a32b85d129c9eb6b1.png)

字体我选择 `MesloLGS NF`

其他个性化配置可以参考其他文章

## alias

```bash
alias nio="ni --prefer-offline"
alias myserve="ssh root@150.158.90.60"
alias d="docker-compose"
alias tnew="tmux new -s"
alias tlog="tmux attach-session -t"
alias nd="nr dev"
alias s="nr start"
alias b="nr build"
alias bw="nr build --watch"
alias r="nr"
alias ga='git add'
alias gs='git status'
alias gcm='git commit -m'
alias gcam='git add -A && git commit -m'
alias gp='git push'
alias gpl='git pull --rebase'
alias gc='git clone'


# 自动生成.gitignore
ignore() {
  if [ -f ".gitignore" ]; then
    echo "gitignore已存在"
    return
  fi
  echo "...正在生成.gitignore"
  touch .gitignore                                                                                                                                # 创建文件
  echo "*.DS_Store  \nnode_modules \n*.log \nidea/ \n*.local \n.DS_Store \ndist \n.cache \n.idea \nlogs \n&-debug.log \n*-error.log" >>.gitignore # 添加内容
}

#设置代理
function proxy_on() {

    export http_proxy="http://127.0.0.1:7890"
    export https_proxy=$http_proxy
    export all_proxy="socks5://127.0.0.1:7890" # or this line
    echo -e "已开启代理"
}

function proxy_off(){
    unset http_proxy
    unset https_proxy
    unset all_proxy
    unset no_proxy
    echo -e "已关闭代理"
}
```

## Plugins
```bash
# git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

## Exports
```bash
#GOLANG
export GOROOT=/usr/local/go 
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin
export GOPROXY=https://goproxy.cn,direct
export GOPRIVATE=gitee.com

# HomeBrew
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
export PATH="/usr/local/bin:$PATH"
export PATH="/usr/local/sbin:$PATH"

# VOLTA
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

# Node
Node管理工具 我使用的是 [Volta](https://volta.sh/)
```bash
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node

# start using Node
node
```


# SSH

生成秘钥
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
将其加入到GitHub/SSH上
```bash
Host myserve
  HostName 150.158.90.60
  User root

Host github.com
port 443 
HostName ssh.github.com
IdentityFile ~/.ssh/id_rsa

Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa

```


# Soft

以下是个人常用软件
大部分软件可以通过[MacWk](https://macwk.com/)搜索到
> 截图 -> iShot
> 翻译 -> [Bob](https://github.com/ripperhe/Bob)
> 搜索 -> [Alfred](https://www.alfredapp.com/) [UTool](http://www.u.tools/)
> 播放器 -> [IINA](https://iina.io/)

## 效率工具

- `Thor`  快捷键启动工具
- `自动切换输入法Lite`  不同软件配置不同输入法    
- `Keka` 压缩工具
- `Karabiner` 键盘自定义
- `Fig` 终端可视化提示
- `iTerm2` 终端
- `Termius` SSH+FPT工具
- `Lemon` Clean my mac x 替代品
- `Open VPN` VPN代理工具
- `Motrix` 下载工具
- `MenubarX` 摸鱼神器 菜单栏打开网页
- `Hide Bar` 隐藏菜单栏  [DownLoad](https://github.com/dwarvesf/hidden)
- `GIPHY CAPTURE` 视频转GIF
- `iHosts` host修改工具
- `Mounty` 挂载NFTS工具  [DownLoad](https://mounty.app/)

## 浏览器拓展

- `FeHelper` 前端工具箱集合
- `Go Home` 下班倒计时 (Github 搜索  go-home-vue)
- `Save All Resources` 保存所有资源，仿站用
- `Google 翻译` 翻译工具 
