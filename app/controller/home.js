const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {ctx,app} = this;
    ctx.body = 'xhn';
  }

  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.query; // 获取注册需要的参数
    // const username = '7777'
    // const password = '33333'
    const userInfo = await ctx.service.user.getUserByName({username:username}) // 获取用户信息
    // console.log('查询用户：',username)
    // console.log(userInfo.dataValues)
    // console.log(userInfo.length)
      // 判断是否已经存在
    if (userInfo.length) {
        ctx.body = {
          code: 500,
          msg: '账户名已被注册，请重新输入',
          data: null
        }
        return
      }
// 调用 service 方法，将数据存入数据库。
    const result = await ctx.service.user.register({
    username:username,
    password:password,
    });
  
    if (result) {
    ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null
    }
    } else {
    ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
    }
    }
    }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.query;
    console.log('-------------')
    console.log(username,password)
    console.log('-------------')
    const userInfo = await ctx.service.user.getUserByName({username:username});
    // console.log(userInfo[0])
    if (!userInfo || !userInfo.length) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null,
      };
      return;
    }
    if (userInfo.length && password !== userInfo[0].dataValues.password) {
      ctx.body = {
        code: 500,
        msg: '密码错误',
        data: null,
      };
      return;
    }
    const token = app.jwt.sign({id:userInfo[0].dataValues.id,
      username:userInfo[0].dataValues.username,
      exp:Math.floor(Date.now() / 1000) + (24 * 60 * 60)},app.config.jwt.secret);
      console.log('token-------------------')
      console.log(token)
      console.log('token-------------------')
    ctx.body = {
      code: 200,
      message: '登录成功',
      token: 
        token
    };
}

  async delete(){
    const { ctx, app } = this;
    const { username, password } = ctx.request.query;
    const userInfo = await ctx.service.user.getUserByName({username:username});
    if (!userInfo || !userInfo.length) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null,
      };
      return;
    }
    if (userInfo.length && password !== userInfo[0].dataValues.password) {
      ctx.body = {
        code: 500,
        msg: '密码错误',
        data: null,
      };
      return;
    }

    const deleteUserInfo = await ctx.service.user.deleteUserByName({username:username});
    console.log('删除数据----------')
    console.log(deleteUserInfo)

    ctx.body = {
      code: 200,
      message: '删除成功',
      data: 
        null
      ,
    };
  }
  async alterPassword(){
    const { ctx, app } = this;
    const { username, password, newPassword } = ctx.request.query;
    const userInfo = await ctx.service.user.getUserByName({username:username});
    if (!userInfo || !userInfo.length) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null,
      };
      return;
    }
    if (userInfo.length && password !== userInfo[0].dataValues.password) {
      ctx.body = {
        code: 500,
        msg: '密码错误',
        data: null,
      };
      return;
    }

    const updataUserInfo = await ctx.service.user.alterPassword({username:username, newPassword:newPassword});

    ctx.body = {
      code: 200,
      message: '修改密码成功',
      data: 
        null
      ,
    };
  }

}

module.exports = HomeController;