'use strict'

/**
 * 给post添加默认的作者和邮箱。
 * 暂时取值来自github config
 */

const child_process = require('child_process')
const fs = require('fs')

hexo.on('new', (post) => {
  let lines = post.content.split('\n')
  let username = getText(child_process.execSync('git config user.name'))
  let email = getText(child_process.execSync('git config user.email'))

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
