# hexo-author
generate the article's author from github config, when multiple people maintain a blog.

```markdown
---
author: XXX
email: XXX@XXX.com
avatar: XXXXXXX
... other things
---
```

email&author from `git config user<name|email>`

avatar from `api.github.com/users/<username>`

### how to use
```bash
npm i --save hexo-author
```
