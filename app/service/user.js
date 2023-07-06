const Service = require('egg').Service;

class UserService extends Service {
  // 通过用户名获取用户信息
  async getUserByName(params) {
    const { app,ctx} = this;
      try {
        // console.log('params',params)
        const result = await ctx.model.User.findAll({where:params});
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
  }

  async register(params) {
    const { app,ctx} = this;
    try {
      const result = await ctx.model.User.create(params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteUserByName(params) {
    const { app,ctx} = this;
    try {
      const result = await ctx.model.User.destroy({where:params});
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async alterPassword(params) {
    const { app,ctx} = this;
    try {
      const {username , newPassword} = params
      const user = await ctx.model.User.findAll({where:{username:username}});
      if (!user) {
        ctx.status = 404;
        return;
      }
      await user.update({password:newPassword })
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;