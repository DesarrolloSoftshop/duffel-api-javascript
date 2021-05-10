import nock from 'nock'
import { Client } from '../../Client'
import { Airlines } from './Airlines'
import { mockAirline } from './mockAirline'

describe('airlines', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single airline', async () => {
    nock(/(.*)/).get(`/air/airlines/${mockAirline.id}`).reply(200, { data: mockAirline })

    const response = await new Airlines(new Client({ token: 'mockToken' })).get(mockAirline.id)
    expect(response.data?.id).toBe(mockAirline.id)
  })

  test('should get all airlines', async () => {
    nock(/(.*)/)
      .get(`/air/airlines?limit=1`)
      .reply(200, { data: [mockAirline], meta: { limit: 1, before: null, after: null } })

    const response = new Airlines(new Client({ token: 'mockToken' })).list({ queryParams: { limit: 1 } })
    for await (const page of response) {
      expect(page.data).toHaveLength(1)
      expect(page.data![0].id).toBe(mockAirline.id)
    }
  })
})