const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: wxContext.OPENID,
        page: '/pages/index/main',
        data: {
          date4: {
            value:'12月22日 08:45'
          },
          thing2: {
            value: '28路'
          },
          thing1: {
            value: '200米'
          },
          thing3: {
            value: '台东路'
          },
          thing5:{
              value:'你好，公交即将到达，请注意出门时间！'
          }
        },
        templateId:'VHgVCRPbHrILy--JCeOwBi18Vmtu8To1JLhm1nKXYDs',
        miniprogramState: 'developer'
      })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
