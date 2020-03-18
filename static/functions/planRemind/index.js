const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: wxContext.OPENID,
        page: '/pages/plan/main',
        data: {
          thing1: {
            value: event.thing
          },
          time2:{
              value:event.time
          }
        },
        templateId:'cEGIIOgbX_V-IiTbYL1LKl9A9AWBC5WUE91Frkbn9gM',
        miniprogramState: 'developer'
      })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
