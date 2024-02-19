import axios from 'axios'
import { Config } from 'src/config'
import { Errors } from 'src/constants'

export const postChat = async (prompt: string) => {
  try {
    const response = await axios.post(`${Config.BE_URL}/chat-with-gemini`, {
      modelType: 'chat',
      prompt: prompt
    })
    if (!response?.data?.result) throw new Error('No response')

    return response
  } catch (error) {
    return { data: { result: Errors.notUnderstand } }
  }
}
