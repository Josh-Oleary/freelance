import express from 'express'
import bp from 'body-parser'
import users from './routes/users.js'
import auth from './routes/auth.js'
import profiles from './routes/profiles.js'
import jobs from './routes/jobs.js'

const port = 3000
const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/api/', auth)
app.use('/api/jobs', jobs)
app.use('/api/profiles', profiles)
app.use('/api/users', users)

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})
