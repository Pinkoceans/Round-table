export const freeProviders = [
  {
    id: 'groq',
    name: 'Groq (免费)',
    description: '免费使用，速度快，支持 Llama 系列模型',
    models: [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B (推荐)' },
      { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B' },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B (快速)' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
    ],
    baseUrl: 'https://api.groq.com/openai/v1',
    requiresApiKey: true,
    getApiKeyUrl: 'https://console.groq.com/keys',
    free: true,
  },
  {
    id: 'together',
    name: 'Together AI (免费额度)',
    description: '注册即送 $1 免费额度，支持多种开源模型',
    models: [
      { id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', name: 'Llama 3.3 70B (推荐)' },
      { id: 'meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo', name: 'Llama 3.2 90B Vision' },
      { id: 'Qwen/Qwen2.5-72B-Instruct-Turbo', name: 'Qwen 2.5 72B' },
    ],
    baseUrl: 'https://api.together.xyz/v1',
    requiresApiKey: true,
    getApiKeyUrl: 'https://api.together.xyz/settings/api-keys',
    free: true,
  },
  {
    id: 'openrouter',
    name: 'OpenRouter (免费模型)',
    description: '聚合多个 AI 服务商，部分模型免费',
    models: [
      { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (免费)' },
      { id: 'google/gemma-2-9b-it:free', name: 'Gemma 2 9B (免费)' },
      { id: 'qwen/qwen-2-7b-instruct:free', name: 'Qwen 2 7B (免费)' },
    ],
    baseUrl: 'https://openrouter.ai/api/v1',
    requiresApiKey: true,
    getApiKeyUrl: 'https://openrouter.ai/keys',
    free: true,
  },
];

export const paidProviders = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT 系列模型，需要付费',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o (推荐)' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini (便宜)' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo (便宜)' },
    ],
    baseUrl: 'https://api.openai.com/v1',
    requiresApiKey: true,
    getApiKeyUrl: 'https://platform.openai.com/api-keys',
    free: false,
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    description: 'Claude 系列模型，需要付费',
    models: [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (推荐)' },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (便宜)' },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
    ],
    baseUrl: 'https://api.anthropic.com/v1',
    requiresApiKey: true,
    getApiKeyUrl: 'https://console.anthropic.com/settings/keys',
    free: false,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: '国产大模型，价格便宜',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat (推荐)' },
      { id: 'deepseek-coder', name: 'DeepSeek Coder' },
    ],
    baseUrl: 'https://api.deepseek.com/v1',
    requiresApiKey: true,
    getApiKeyUrl: 'https://platform.deepseek.com/api_keys',
    free: false,
  },
];

export const allProviders = [...freeProviders, ...paidProviders];

export function getProviderById(id) {
  return allProviders.find(p => p.id === id);
}

export function getProviderModels(providerId) {
  const provider = getProviderById(providerId);
  return provider ? provider.models : [];
}
