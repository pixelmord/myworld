# Regular Expressions

// Last modified: 2020/04/22 08:09:23

## Web regex

```javascript
const values = {
  email: 'john@doe.me',
  url: 'https://example.com',
};
/* EMAIL REGEX: */
!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email);

/* URL REGEX: */
!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url);
```
