import * as getUserInfo from '../../../../commonSteps/getUserInfo.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as allowlist from './allowlist.mdx'
import { toSteps } from '../../../../utils'
import * as blockchainCalls from './blockchainCalls.mdx'
import * as initialization from './initialize.mdx'
import * as installation from './installation.mdx'
import * as login from './login.mdx'
import * as logout from './logout.mdx'
import * as runTheApp from './runTheApp.mdx'

const STEPS = toSteps({
  installation,
  registerApp,
  allowlist,
  initialization,
  runTheApp,
  login,
  getUserInfo,
  blockchainCalls,
  logout,
})

export default STEPS
