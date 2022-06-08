const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require("./src/router/user")
const querystring = require('querystring')
// 用于处理postData
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method != "POST") {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        if (req.method === "POST") {
            let postData = ''
            req.on('data', chunk => {
                postData += chunk.toString()
            })
            req.on('end', () => {
                if (!postData) {
                    resolve({})
                    return
                }
                resolve(JSON.parse(postData))
            })
        }
    })
    return promise
}
const serverHandle = (req, res) => {
    const url = req.url
    req.path = url.split('?')[0]
    // 处理postData
    getPostData(req).then(postData => {
        req.body = postData
        // 解析query
        req.query = querystring.parse(url.split('?')[1])
        // 设置返回格式
        res.setHeader('Content-type', 'application/json')
        // 处理blog路由
        const blogResult=handleBlogRouter(req,res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        res.writeHead(404, {
            "Content-type": "text/plain"
        })
        res.write("404 not found")
        res.end()
    })
}
module.exports = serverHandle


// env:process.env.NODE_ENV