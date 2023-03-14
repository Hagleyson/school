import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/dependent', 'Dependent/DependentController')
})
  .prefix('v1')
  .middleware('auth')
