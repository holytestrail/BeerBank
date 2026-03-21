import Dexie from 'dexie'

export const db = new Dexie('beerbankDB')

// Define tables here, e.g.:
// db.version(1).stores({
//   beers: '++id, name, type'
// })