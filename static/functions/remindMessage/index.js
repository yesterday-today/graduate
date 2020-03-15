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
            value:event.time
          },
          thing2: {
            value: event.line
          },
          thing1: {
            value: event.distance
          },
          thing3: {
            value: event.station
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
