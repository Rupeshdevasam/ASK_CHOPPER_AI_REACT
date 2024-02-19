// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import themeConfig from 'src/configs/themeConfig'
import styles from 'src/styles/navbar.module.css'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  const audio = new Audio('/sounds/dog_bark.mp3')

  const [imageHovered, setImageHovered] = useState(false)

  const playBarkSound = () => {
    if (audio.duration > 0 && !audio.paused) {
      //Its playing...do your job
    } else {
      audio.play()
    }
    setImageHovered(true)
  }

  const stopBarkSound = () => {
    if (audio.duration > 0 && !audio.paused) {
      audio.pause()
    }
    setImageHovered(false)
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}

        <ModeToggler settings={settings} saveSettings={saveSettings} />
      </Box>
      <div className='tw-flex tw-items-end'>
        <img
          onMouseOver={playBarkSound}
          onMouseOut={stopBarkSound}
          className={styles['nav-logo']}
          src={imageHovered ? '/images/angry_rotty.png' : '/images/cute-rotty-anim.png'}
          alt='logo'
          width={60}
          height={60}
        />
        <div className={`tw-font-[monospace] tw-font-bold tw-text-[1.6rem] ${styles.title}`}>
          <span className='tw-text-[red]'>A</span>
          <span className='tw-text-[red]'>s</span>
          <span className='tw-text-[red]'>k_</span>
          {themeConfig.templateName.split('').map((letter, index) => (
            <span className='tw-text-[gray]' key={index}>
              {letter}
            </span>
          ))}

          <span className='tw-text-[red]'>_AI</span>
          <span className='tw-text-[red]'>&#33;</span>
        </div>
      </div>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
