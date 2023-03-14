import Route from '@ioc:Adonis/Core/Route'

import './routes/sessions/index'
import './routes/user/index'
import './routes/passwords/index'
import './routes/teacher/index'

Route.get('/', async () => {
  return { hello: 'world' }
}).prefix('v1')
