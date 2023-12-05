import {queries} from '@testing-library/dom'
import {commands} from '../'

const queryNames = Object.keys(queries).filter(q => /^find/.test(q))

test('exports expected commands', () => {
  expect(commands).toMatchObject(expect.any(Array))
  const sortedQueryNames = queryNames.sort()
  const sortedCommandNames = commands.map(({name}) => name).sort()
  expect(sortedCommandNames).toEqual(sortedQueryNames)
  commands.forEach(command =>
    expect(command).toMatchObject({
      name: expect.any(String),
      // We get a new function that wraps the respective query from `dom-testing-library`.
      // The commands themselves will be tested separately in the Cypress end-to-end tests.
      command: expect.any(Function),
    }),
  )
})
