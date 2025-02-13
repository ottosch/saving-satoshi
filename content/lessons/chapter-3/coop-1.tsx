'use client'

import { useTranslations, useSaveAndProceed } from 'hooks'
import { Title } from 'ui'
import { Button } from 'shared'
import Avatar from 'components/Avatar'
import { useAuthContext } from 'providers/AuthProvider'
import { useMediaQuery } from 'hooks'
import { useEffect } from 'react'
import ProfileChip, { ProfileChipVariant } from 'components/ProfileChip'
import Image from 'next/image'
import { cssVarThemeChange } from 'lib/themeSelector'

export const metadata = {
  title: 'chapter_three.coop_one.title',
  key: 'CH3COO1',
}

export default function Coop1({ lang }) {
  const { account } = useAuthContext()
  const t = useTranslations(lang)

  const saveAndProceed = useSaveAndProceed()
  const isSmallScreen = useMediaQuery({ width: 767 })
  const players = [
    {
      username: 'You',
      avatar: account?.avatar,
    },
    {
      username: 'Mining Maniacs',
      avatar: '/assets/avatars/2.png',
    },
    {
      username: 'Coin Crunchers',
      avatar: '/assets/avatars/4.png',
    },
    {
      username: 'Hash Hoppers',
      avatar: '/assets/avatars/3.png',
    },
  ]

  useEffect(() => {
    cssVarThemeChange({
      '--CH3SOL1-bg': '#411e4f',
      '--CH3SOL1-gradient-start': '#3C1843',
      '--CH3SOL1-gradient-stop': '#45235a',
    })
  }, [])

  return (
    <div className="flex flex-col justify-center justify-items-center gap-[30px] md:my-auto md:flex-row">
      <div className="ml-[15px] mr-[15px] mt-[30px] flex h-fit flex-col items-center gap-y-2.5 border-2 border-dotted border-white/25 p-3.5 md:order-last md:ml-0 md:mt-0">
        <div className="mx-[5px] mb-[10px] flex gap-x-2.5 p-[5px]">
          <Image
            className="rounded-full"
            src="/assets/images/chapter-1-holocat-cropped.jpg"
            alt=""
            width={26}
            height={26}
          />
          <Title>HoloCat Pool</Title>
        </div>
        <div className="fade-in grid grid-cols-2">
          {players.map((profile, i) => (
            <div
              key={i}
              className="flex h-[145px] w-[160px] flex-col pb-5 md:h-[160px] md:w-[190px]"
            >
              <div className="-mb-2 flex flex-col items-center">
                <Avatar
                  avatar={profile.avatar}
                  size={isSmallScreen ? 75 : 100}
                />
                <ProfileChip
                  className="relative -top-4"
                  image="/assets/images/chapter-1-holocat-cropped.jpg"
                  variant={ProfileChipVariant.Ranking}
                  value={i + 1}
                />
              </div>
              <div className="text-center font-nunito text-base font-semibold text-white">
                {profile.username}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`mb-5 flex w-full items-center px-[15px] transition-opacity md:mx-0 md:mb-0 md:mt-0 md:w-1/2 md:max-w-[405px] md:pl-[15px] md:pr-0 ${
          true ? 'fade-in' : 'fade-out'
        }`}
      >
        <div className="font-nunito text-white">
          <Title>{t('chapter_three.coop_one.heading')}</Title>
          <div className="mt-2 text-lg">
            {t('chapter_three.coop_one.paragraph_one')}
          </div>
          <div className="mt-8 text-lg">
            {t('chapter_three.coop_one.paragraph_two')}
          </div>
          <div className="mt-8 text-lg">
            {t('chapter_three.coop_one.paragraph_three')}
          </div>
          <Button onClick={saveAndProceed} classes="mt-10 max-md:w-full">
            {t('shared.next')}
          </Button>
        </div>
      </div>
    </div>
  )
}
