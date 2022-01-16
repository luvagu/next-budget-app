import Button from './shared/Button'
import Stack from './shared/Stack'

function Header() {
	return (
		<Stack direction='horizontal' extraClass='gap-2 mb-4'>
			<h1 className='text-3xl font-semibold mr-auto'>Budgets</h1>
			<Button>Add Budget</Button>
			<Button variant='blue-outline'>Add Expense</Button>
		</Stack>
	)
}

export default Header
