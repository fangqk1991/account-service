import { MyAccountServer } from '../../demo/services/MyAccountServer'

describe('Test AccountFeeds.test.ts', () => {
  it(`Account.getPageResult`, async () => {
    const pageResult = await MyAccountServer.Account.getPageResult()
    console.info(pageResult)
  })

  it(`FullAccount.getPageResult`, async () => {
    const pageResult = await MyAccountServer.FullAccount.getPageResult()
    console.info(pageResult)
  })
})
