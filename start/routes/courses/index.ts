import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/courses', 'Courses/CoursesController')
})
  .prefix('v1')
  .middleware('auth')

Route.patch('/course_disable/:id', 'Courses/CoursesController.disableCourse')
  .prefix('v1')
  .middleware('auth')
