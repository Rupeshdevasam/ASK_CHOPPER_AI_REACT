import { Avatar, AvatarGroup, Button, TextField, Tooltip } from '@mui/material'
import { useRef, useState } from 'react'
import Icon from 'src/@core/components/icon'
import Message from 'src/components/Message'
import { Errors } from 'src/constants'
import { postChat } from 'src/services/GeminiAPI'
import Styles from 'src/styles/chat.module.css'

const Chat = () => {
  const [conversationContext, setConversationContext] = useState<any>([])
  const [currentMessages, setCurrentMessages] = useState<any>([])
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef: any = useRef()

  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }

  const sendPrompt = async () => {
    if (prompt.length === 0) return
    let currentMessagesTemp = [...currentMessages]
    currentMessagesTemp = [...currentMessagesTemp, { role: 'user', parts: prompt }]
    setCurrentMessages(currentMessagesTemp)
    setPrompt('')
    setIsLoading(true)
    setTimeout(scrollToBottom, 100)
    const input = prompt
    const apiResponse = await postChat(input)
    const response = apiResponse.data.result
    setConversationContext([...conversationContext, [input, response]])
    currentMessagesTemp = [...currentMessagesTemp, { role: 'model', parts: response }]
    setIsLoading(false)
    setCurrentMessages(currentMessagesTemp)
    setTimeout(scrollToBottom, 100)
  }

  return (
    <div className='tw-relative tw-flex tw-flex-col tw-gap-[20px] tw-justify-between tw-items-center tw-h-full'>
      {/* CHAT */}
      <div className={`tw-flex tw-flex-col tw-gap-[15px] tw-w-full tw-h-full tw-mb-[70px]`}>
        {currentMessages.map((message: any, index: number) => (
          <Message
            key={index}
            isReceived={message.role === 'model'}
            error={message.parts === Errors.notUnderstand}
            message={message.parts}
          />
        ))}
        {isLoading && <Message isLoading={true} isReceived={true} />}
      </div>

      {/* Input */}
      <div
        className={`tw-flex tw-w-full tw-fixed tw-m-[20px] tw-max-w-[1440px] tw-bottom-[0px] tw-z-2 tw-items-center tw-gap-[10px] ${Styles.inputWrapper}`}
      >
        <AvatarGroup className='pull-up' max={1}>
          <Tooltip title='Rupesh Devasam'>
            <Avatar alt='Rupesh Devasam' sx={{ width: 50, height: 50 }} src='/images/avatars/1.png' />
          </Tooltip>
        </AvatarGroup>
        <div className='tw-relative tw-flex tw-w-full'>
          <TextField
            fullWidth
            id='color-standard'
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            label='Chat'
            color='success'
            tabIndex={0}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') {
                sendPrompt()
              }
            }}
          />
          <span className='tw-absolute tw-right-[10px] tw-top-[50%] tw--translate-y-2/4'>
            <Button
              size='medium'
              className='tw-h-[40px]'
              variant='contained'
              endIcon={<Icon icon='tabler:send' />}
              onClick={sendPrompt}
            >
              Send
            </Button>
          </span>
        </div>
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}

// Chat.acl = {
//   action: 'read',
//   subject: 'acl-page'
// }
Chat.guestGuard = true
export default Chat
