import { Container } from 'inversify'
import { TYPES } from './types'
import config from '../../config'
import controllerProvider from './controller'
// import fbProvider from './fb'
import serviceProvider from './service'
import lang from '../../lang/en'

// config
const container = new Container({ skipBaseClassChecks: true })
container.bind(TYPES.Config).toConstantValue(config)
container.bind(TYPES.Lang).toConstantValue(lang)

// firebase
// fbProvider(container)

// modal
serviceProvider(container)

// controller
controllerProvider(container)

export { container }
