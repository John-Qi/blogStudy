const {loginCheck} =require('../controller/user')
const {SuccessModel,ErrorModel}=require('../model/resModel')
const handleUserRouter =(req,res) =>{
    const method=req.method
    if (method === "POST" && req.path === "/api/user/login") {
        const {
            username,
            password
        } = req.body
        const result = loginCheck(username, password)
        return result.then(data => {
            if (data.username) {
                    return new SuccessModel('登录成功')
            }else {
                return new ErrorModel('密码或用户名错误')
            }
        })

    }
}
module.exports =handleUserRouter