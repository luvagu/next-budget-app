import { HeroContainer } from '@/components/shared'
import { BanknotesIcon as CashIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'

function Hero({ user }) {
	const { t } = useTranslation()

	return (
		<HeroContainer>
			<CashIcon className='h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-600' />
			<h2 className='inline-flex flex-col text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 text-center lg:text-left'>
				<span>{t('hero_welcome_header')}</span>
				<span className='text-blue-600 text-xl sm:text-2xl'>
					{t(user ? 'hero_welcome_message' : 'hero_welcome_message_guest')}
				</span>
			</h2>
		</HeroContainer>
	)
}

export default Hero
