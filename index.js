'use strict'

/**
 * 给post添加默认的作者和邮箱。
 * 暂时取值来自github config
 */

const child_process = require('child_process')
const fs = require('fs')

if (typeof hexo !== 'undefined') {
  hexo.on('new', (post) => {
    let lines = post.content.split('\n')
    let username = getText(child_process.execSync('git config user.name'))
    let email = getText(child_process.execSync('git config user.email'))

    // 如果有username 并且可以通过API获取到信息 则把头像也塞进去
    if (username) {
      let gitInfo = getText(child_process.execSync(`curl https://api.github.com/users/${username}`))
      if (gitInfo) {
        gitInfo = JSON.parse(gitInfo)

        let avatar = gitInfo.avatar_url
        let github = gitInfo.html_url
        lines.splice(1, 0, 'avatar: ' + avatar)
        lines.splice(1, 0, 'github: ' + github)
      }
    }

    lines.splice(1, 0, 'email: ' + email)
    lines.splice(1, 0, 'author: ' + username)

    post.content = lines.join('\n')
    if (post.path !== false) {
      fs.writeFile(post.path, post.content)
    }
  })

  function getText (buffer) {
    return buffer ? buffer.toString().replace(/\r?\n?/g, '') : 'unknown'
  }
} else {
  console.log('hexo is not defined')
}
