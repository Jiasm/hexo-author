'use strict'

/**
 * set github info into hexo post
 */

const child_process = require('child_process')
const fs = require('fs')

if (typeof hexo !== 'undefined') {
  hexo.on('new', function (post) {
    let lines = post.content.split('\n')
    let username = getText(child_process.execSync('git config user.name'))
    let email = getText(child_process.execSync('git config user.email'))

    let {gitinfo} = this.config

    // request github api
    if (gitinfo) {
      let gitInfoData = getText(child_process.execSync(`curl https://api.github.com/users/${username}`))
      if (gitInfoData) {
        gitInfoData = JSON.parse(gitInfoData)
        let property = Object.keys(gitInfoData)

        // typeof Array
        if (Array.isArray(gitinfo) && gitinfo.length) {
          gitinfo.forEach(item => {
            if (property.includes(item)) {
              let {[item]: val} = gitInfoData
              lines.splice(1, 0, `${item}: ${val}`)
            }
          })
        } else if (typeof gitinfo === 'object' && Object.keys(gitinfo).length) {
          // typeof Object
          let infoList = []

          // convert to Array
          Object.keys(gitinfo).forEach(item => {
            infoList.push({
              key: item,
              alias: gitinfo[item] || item
            })
          })

          infoList.forEach(({key, alias}) => {
            if (property.includes(key)) {
              let {[key]: val} = gitInfoData
              lines.splice(1, 0, `${alias}: ${val}`)
            }
          })
        }
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
