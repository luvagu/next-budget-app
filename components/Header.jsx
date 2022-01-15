import Button from './Button'
import Stack from './Stack'

function Header() {
	return (
		<Stack direction='horizontal' extraClass='gap-2 mb-4'>
			<h1 className='mr-auto text-2xl'>Budgets</h1>
			<Button>Add Budget</Button>
			<Button variant='outlined'>Add Expense</Button>
		</Stack>
	)
}

export default Header
