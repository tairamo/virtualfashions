const admin = require('firebase-admin')

import { Container } from 'inversify'
import { TYPES } from './types'

export default (container: Container) => {
  const config: any = container.get(TYPES.Config)

  admin.initializeApp({
    credentials: {
      client_email: config.fb.clientemail,
      private_key: config.fb.privatekey
    },
    projectId: config.fb.projectid,
    databaseURL: `https://${config.fb.db}.firebaseio.com`,
    serviceAccountId: config.fb.serviceaccountid
  })

  const database = admin.database()
  const fireStore = admin.firestore()
  // const bucket = admin.storage().bucket(config.fb.bucket);
  const auth = admin.auth()

  // firebase
  container.bind(TYPES.FirebaseAdmin).toConstantValue(admin)
  container.bind(TYPES.FirebaseAuth).toConstantValue(auth)
  container.bind(TYPES.FirebaseDb).toConstantValue(database)
  container.bind(TYPES.FireStore).toConstantValue(fireStore)
  // container.bind(TYPES.Bucket).toConstantValue(bucket);

  return container
}
