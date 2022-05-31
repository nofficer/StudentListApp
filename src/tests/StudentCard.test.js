import { render, screen } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import StudentCard from '../components/StudentCard'

test('If a tag is entered and submitted it is displayed on the student card', async () => {
  render(<StudentCard />);

})
