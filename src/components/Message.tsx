import Styles from '../styles/message.module.css'

import { useTheme } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'

const Message = ({ isReceived = false, message = 'No data found!', error = false, isLoading = false }) => {
  const theme = useTheme()
  const auth = useAuth()
  const [loading, setLoading] = useState('...')

  const getMessageBg = () => {
    if (isLoading) {
      return {
        background: '',
        color: theme.palette.background.default
      }
    }
    if (isReceived)
      return {
        background: theme.palette.success.main,
        color: theme.palette.background.default
      }

    if (error) {
      return {
        background: 'red',
        color: theme.palette.background.paper
      }
    }

    return {
      background: theme.palette.primary.main,
      color: theme.palette.background.paper
    }
  }

  useEffect(() => {
    setInterval(() => {
      if (loading === '...') setLoading('')
      else setLoading(loading + '.')
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const getShowName = () => {
    if (isReceived) {
      return 'Chopper'
    } else {
      return auth.user?.username
    }
  }

  return (
    <div className={`tw-flex tw-max-w-[50%] tw-gap-[10px] ${!isReceived ? 'tw-self-end' : ''}`}>
      <div id='icon' className={`${isReceived ? 'tw-order-0' : 'tw-order-1'}`}>
        <AvatarGroup className='pull-up' max={1}>
          <Tooltip title={getShowName()}>
            <Avatar
              alt={getShowName()}
              sx={{ width: 36, height: 36 }}
              src={isReceived ? '/images/cute-rotty-anim.png' : '/images/avatars/1.png'}
            />
          </Tooltip>
        </AvatarGroup>
      </div>
      <div
        className={`tw-flex tw-w-fit tw-items-center tw-rounded-[6px] tw-p-[10px]  ${
          !isReceived ? 'tw-self-end' : ''
        } ${getMessageBg()}`}
        style={{
          background: getMessageBg().background,
          color: getMessageBg().color
        }}
      >
        {isLoading ? (
          <span className={`tw-text-[1.4rem] ${Styles.loader}`} style={{ fontWeight: 'bolder' }}>
            {'   '}
          </span>
        ) : (
          message
        )}
      </div>
    </div>
  )
}

export default Message
