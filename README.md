# hexo-author
generate the article's author from github config, when multiple people maintain a blog.

```markdown
---
author: XXX
email: XXX@XXX.com
... other things
---
```

### how to use
```bash
npm i --save hexo-author
```

### if you want to get some info from github api

> you can set it on `_config.yml`

#### Two ways to use:

```yml
gitinfo:
  - avatar_url
  - html_url
```

```yml
gitinfo:
  avatar_url: aliasAvatar
  html_url: aliasUrl
```

### propertys

```
https://api.github.com/users/<username>
```

```javascript
module.exports = [
  'login',
  'id',
  'avatar_url',
  'gravatar_id',
  'url',
  'html_url',
  'followers_url',
  'following_url',
  'gists_url',
  'starred_url',
  'subscriptions_url',
  'organizations_url',
  'repos_url',
  'events_url',
  'received_events_url',
  'type',
  'site_admin',
  'name',
  'company',
  'blog',
  'location',
  'email',
  'hireable',
  'bio',
  'public_repos',
  'public_gists',
  'followers',
  'following',
  'created_at',
  'updated_at'
]
```
