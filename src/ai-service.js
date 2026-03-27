// AI 服务模块 - 支持 12 家主流 AI 服务商

// 生成系统提示词（增强版 - 支持多角色互动）
function generateSystemPrompt(character, conversationHistory = [], settings = {}) {
  const { interactive = true, useNames = true, otherCharacters = [] } = settings;
  
  let prompt = `你正在扮演${character.name}，${character.identity}。

性格特点：${character.personality}
背景信息：${character.background}
说话风格：${character.speakingStyle}

请完全代入这个角色，用符合${character.name}身份、性格和说话风格的方式回应。
${character.isHistorical ? `注意：${character.name}是历史人物，请基于其生前的思想和智慧来回应。` : ''}`;

  // 如果是互动模式，添加对话历史和其他角色信息
  if (interactive && conversationHistory.length > 0) {
    prompt += `

【重要】这是一个圆桌讨论场景，你会看到其他参与者的发言。
你可以：
1. 回应或补充前面某位参与者的观点
2. 提出不同的见解
3. 提出问题引导讨论深入
4. 对其他参与者的观点表示赞同或反对`;

    if (useNames && otherCharacters.length > 0) {
      const characterNames = otherCharacters.map(c => c.name).join('、');
      prompt += `

当前参与讨论的其他成员：${characterNames}
你可以在发言时称呼他们的名字，例如"${characterNames.split('、')[0]} 说得很好..."`;
    }
  }

  prompt += `

记住：
1. 保持角色的一致性，完全代入${character.name}的身份
2. 展现${character.name}独特的思维方式和智慧
3. 用符合角色身份的语言风格交流
4. 发言长度适中（50-200 字），不要过长
5. 可以用括号表达情绪或动作，如：（微笑着）、（沉思片刻）、（点头赞同）
6. 要有互动性，积极回应前面的发言`;

  return prompt;
}

// OpenAI API 调用
async function callOpenAI(character, messages, config, conversationHistory = [], settings = {}) {
  const systemPrompt = generateSystemPrompt(character, conversationHistory, settings);
  
  // 构建包含所有角色发言的对话历史
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: `${msg.senderName || (msg.role === 'user' ? '用户' : character.name)}: ${msg.content}`,
    })),
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Anthropic API 调用
async function callAnthropic(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = messages.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content,
  }));

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 2000,
      system: systemPrompt,
      messages: formattedMessages,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Anthropic API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// Google Gemini API 调用
async function callGemini(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = messages.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${config.model}:generateContent?key=${config.apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: formattedMessages,
        generationConfig: {
          temperature: config.temperature || 0.7,
          maxOutputTokens: 2000,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gemini API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// xAI (Grok) API 调用
async function callXAI(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`xAI API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// DeepSeek API 调用
async function callDeepSeek(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`DeepSeek API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Qwen (阿里) API 调用
async function callQwen(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      input: {
        messages: formattedMessages,
      },
      parameters: {
        temperature: config.temperature || 0.7,
        max_tokens: 2000,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Qwen API 错误：${error.message || response.statusText}`);
  }

  const data = await response.json();
  return data.output?.choices?.[0]?.message?.content || data.output?.text;
}

// Moonshot (Kimi) API 调用
async function callMoonshot(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Moonshot API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Zhipu (智谱) API 调用
async function callZhipu(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Zhipu API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Baidu (文心一言) API 调用
async function callBaidu(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = messages.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content,
  }));

  const response = await fetch(
    `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/bot/chat/completions?access_token=${config.apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: formattedMessages,
        system: systemPrompt,
        temperature: config.temperature || 0.7,
        max_output_tokens: 2000,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Baidu API 错误：${error.error_msg || response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}

// iFlytek (讯飞星火) API 调用
async function callIFlytek(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://spark-api-open.xf-yun.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`iFlytek API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// MiniMax API 调用
async function callMiniMax(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  // MiniMax 推荐使用 PROMPT 模式或直接使用 system 消息
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      top_p: 0.9,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`MiniMax API 错误：${error.message || error.msg || response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || data.response || '';
}

// Doubao (字节) API 调用
async function callDoubao(character, messages, config) {
  const systemPrompt = generateSystemPrompt(character);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Doubao API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Hugging Face Inference API 调用（免费）
async function callHuggingFace(character, messages, config, conversationHistory = [], settings = {}) {
  const systemPrompt = generateSystemPrompt(character, conversationHistory, settings);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  // 使用 Hugging Face Inference API
  const model = config.model || 'mistralai/Mistral-7B-Instruct-v0.2';
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(`Hugging Face API 错误：${error.error || error.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// Ollama 本地 API 调用（完全免费，本地运行）
async function callOllama(character, messages, config, conversationHistory = [], settings = {}) {
  const systemPrompt = generateSystemPrompt(character, conversationHistory, settings);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  // Ollama 默认运行在本地 11434 端口
  const baseUrl = config.baseUrl || 'http://localhost:11434';
  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model || 'llama2',
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text().catch(() => response.statusText);
    throw new Error(`Ollama 错误：${error}。请确保 Ollama 已安装并运行：ollama serve`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// Groq API 调用（有免费额度）
async function callGroq(character, messages, config, conversationHistory = [], settings = {}) {
  const systemPrompt = generateSystemPrompt(character, conversationHistory, settings);
  
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'llama3-70b-8192',
      messages: formattedMessages,
      temperature: config.temperature || 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(`Groq API 错误：${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// 主调用函数：根据配置选择对应的 API 提供商（支持多角色互动）
export async function callAI(character, messages, config, conversationHistory = [], settings = {}) {
  if (!config || !config.apiKey) {
    throw new Error('未配置 API Key');
  }

  try {
    switch (config.provider) {
      case 'anthropic':
        return await callAnthropic(character, messages, config, conversationHistory, settings);
      case 'google':
        return await callGemini(character, messages, config, conversationHistory, settings);
      case 'xai':
        return await callXAI(character, messages, config, conversationHistory, settings);
      case 'deepseek':
        return await callDeepSeek(character, messages, config, conversationHistory, settings);
      case 'qwen':
        return await callQwen(character, messages, config, conversationHistory, settings);
      case 'moonshot':
        return await callMoonshot(character, messages, config, conversationHistory, settings);
      case 'zhipu':
        return await callZhipu(character, messages, config, conversationHistory, settings);
      case 'baidu':
        return await callBaidu(character, messages, config, conversationHistory, settings);
      case 'iflytek':
        return await callIFlytek(character, messages, config, conversationHistory, settings);
      case 'minimax':
        return await callMiniMax(character, messages, config, conversationHistory, settings);
      case 'doubao':
        return await callDoubao(character, messages, config, conversationHistory, settings);
      case 'huggingface':
        return await callHuggingFace(character, messages, config, conversationHistory, settings);
      case 'ollama':
        return await callOllama(character, messages, config, conversationHistory, settings);
      case 'groq':
        return await callGroq(character, messages, config, conversationHistory, settings);
      case 'openai':
      default:
        return await callOpenAI(character, messages, config, conversationHistory, settings);
    }
  } catch (error) {
    console.error(`调用${character.name}的 AI 服务失败:`, error);
    throw error;
  }
}
