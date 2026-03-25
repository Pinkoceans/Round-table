// Netlify Function: 发送短信验证码
// 注意：这是示例代码，实际使用需要配置短信服务商

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { phone, action } = JSON.parse(event.body);

    if (!phone || phone.length !== 11) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '请输入正确的手机号' })
      };
    }

    // 生成 6 位验证码
    const code = Math.random().toString().slice(2, 8);

    if (action === 'send') {
      // TODO: 集成真实的短信服务
      // 方案 1: 阿里云短信
      // const result = await sendAliyunSMS(phone, code);
      
      // 方案 2: 腾讯云短信
      // const result = await sendTencentSMS(phone, code);
      
      // 临时方案：返回验证码（仅用于测试）
      console.log(`发送给 ${phone} 的验证码：${code}`);
      
      // 存储验证码到内存/数据库（临时存储在内存中）
      // 实际应该使用 Redis 或数据库
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 分钟有效期
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: '验证码已发送（测试环境，验证码将在控制台输出）',
          code: code, // 测试环境返回验证码，生产环境应该删除
          expiresAt
        })
      };
    }

    if (action === 'verify') {
      const { code: inputCode } = JSON.parse(event.body);
      
      // TODO: 从存储中获取验证码并验证
      // const storedCode = await getStoredCode(phone);
      // if (storedCode === inputCode) { ... }
      
      // 临时方案：接受任何 6 位数字
      if (inputCode && inputCode.length === 6) {
        return {
          statusCode: 200,
          body: JSON.stringify({ valid: true })
        };
      }
      
      return {
        statusCode: 400,
        body: JSON.stringify({ valid: false, error: '验证码错误' })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: '无效的操作' })
    };
  } catch (error) {
    console.error('SMS function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// 阿里云短信发送函数（示例）
async function sendAliyunSMS(phone, code) {
  // 需要安装 @alicloud/dysmsapi20170525
  // npm install @alicloud/dysmsapi20170525 @alicloud/openapi-client
  /*
  const Config = require('@alicloud/openapi-client').default;
  const Dysmsapi20170525 = require('@alicloud/dysmsapi20170525').default;
  
  const config = new Config({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  });
  config.endpoint = 'dysmsapi.aliyuncs.com';
  
  const client = new Dysmsapi20170525(config);
  
  const params = new Dysmsapi20170525.SendSmsRequest({
    phoneNumbers: phone,
    signName: process.env.ALIYUN_SMS_SIGN_NAME,
    templateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE,
    templateParam: JSON.stringify({ code })
  });
  
  return await client.sendSms(params);
  */
}

// 腾讯云短信发送函数（示例）
async function sendTencentSMS(phone, code) {
  // 需要安装 tencentcloud-sdk-nodejs
  // npm install tencentcloud-sdk-nodejs
  /*
  const tencentcloud = require('tencentcloud-sdk-nodejs');
  const SmsClient = tencentcloud.sms.v20210111.Client;
  
  const client = new SmsClient({
    credential: {
      secretId: process.env.TENCENT_SECRET_ID,
      secretKey: process.env.TENCENT_SECRET_KEY
    },
    region: 'ap-guangzhou',
    profile: {
      httpProfile: {
        endpoint: 'sms.tencentcloudapi.com'
      }
    }
  });
  
  const params = {
    PhoneNumberSet: [`+86${phone}`],
    SmsSdkAppId: process.env.TENCENT_SMS_APP_ID,
    SignName: process.env.TENCENT_SMS_SIGN_NAME,
    TemplateId: process.env.TENCENT_SMS_TEMPLATE_ID,
    TemplateParamSet: [code]
  };
  
  return await client.SendSms(params);
  */
}
