import * as angularBundlerIssues from './angularBundlerIssues.mdx'
import * as initialization from './initialize.mdx'
import * as runTheApp from './runTheApp.mdx'
import * as login from './login.mdx'
import * as logout from './logout.mdx'
import * as blockchainCalls from './blockchainCalls.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as walletAggregatorOnly from '../../../../commonSteps/walletAggregatorOnly.mdx'
import * as installation from './installation.mdx'
import * as config from './config.mdx'
import { toSteps } from '../../../../utils'

const STEPS = toSteps({
  angularBundlerIssues,
  installation,
  initialization,
  runTheApp,
  config,
  registerApp,
  walletAggregatorOnly,
  blockchainCalls,
  login,
  logout,
})

export default STEPS
