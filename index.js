'use strict'

/**
 * set github info into hexo post
 */

const child_process = require('child_process')
const fs = require('fs')
const property = require('./config/property')

if (typeof hexo !== 'undefined') {
  hexo.on('new', function (post) {
    let lines = post.content.split('\n')
    let username = getText(child_process.execSync('git config user.name'))
    let email = getText(child_process.execSync('git config user.email'))

    let {gitinfo} = this.config

    // request github api
    if (gitinfo && gitinfo.length) {
      let gitInfoData = getText(child_process.execSync(`curl https://api.github.com/users/${username}`))
      if (gitInfoData) {
        gitInfoData = JSON.parse(gitInfoData)

        gitinfo.forEach(item => {
          if (property.includes(item)) {
            let {[item]: val} = gitInfoData
            lines.splice(1, 0, `${item}: ${val}`)
          }
        })
      }
    }

    // default option, use git config user.*
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
