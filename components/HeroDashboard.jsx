import { ShieldExclamationIcon } from '@heroicons/react/24/outline'
import { HeroContainer } from '@/components/shared'
import { useTranslation } from 'next-i18next'

function HeroDashboard() {
	const { t } = useTranslation()

	return (
		<HeroContainer>
			<ShieldExclamationIcon className='h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-yellow-600' />
			<h2 className='inline-flex flex-col text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 text-center lg:text-left'>
				<span>{t('hero_dashboard_opps')}</span>
				<span className='text-gray-600 text-xl sm:text-2xl'>
					{t('hero_dashboard_no_budgets_message')}
				</span>
				<span className='text-blue-600 text-xl sm:text-2xl'>
					{t('hero_dashboard_add_budgets_message')}
				</span>
			</h2>
		</HeroContainer>
	)
}

export default HeroDashboard
