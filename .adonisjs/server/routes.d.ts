import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'countries.index': { paramsTuple?: []; params?: {} }
    'countries.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'tracks.index': { paramsTuple?: []; params?: {} }
    'tracks.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'user.me': { paramsTuple?: []; params?: {} }
    'user.update': { paramsTuple?: []; params?: {} }
    'user.delete': { paramsTuple?: []; params?: {} }
    'vehicles.index': { paramsTuple?: []; params?: {} }
    'vehicles.store': { paramsTuple?: []; params?: {} }
    'vehicles.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'vehicles.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'vehicles.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'trackdays.index': { paramsTuple?: []; params?: {} }
    'trackdays.store': { paramsTuple?: []; params?: {} }
    'trackdays.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'trackdays.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'trackdays.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'maintenances.index': { paramsTuple?: []; params?: {} }
    'maintenances.store': { paramsTuple?: []; params?: {} }
    'maintenances.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'maintenances.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'maintenances.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'tracks.store': { paramsTuple?: []; params?: {} }
    'tracks.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'tracks.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'countries.store': { paramsTuple?: []; params?: {} }
    'countries.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'countries.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin_users.index': { paramsTuple?: []; params?: {} }
    'admin_users.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin_users.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin_users.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'mailer.send': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'countries.index': { paramsTuple?: []; params?: {} }
    'countries.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'tracks.index': { paramsTuple?: []; params?: {} }
    'tracks.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'user.me': { paramsTuple?: []; params?: {} }
    'vehicles.index': { paramsTuple?: []; params?: {} }
    'vehicles.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'trackdays.index': { paramsTuple?: []; params?: {} }
    'trackdays.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'maintenances.index': { paramsTuple?: []; params?: {} }
    'maintenances.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin_users.index': { paramsTuple?: []; params?: {} }
    'admin_users.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
  }
  HEAD: {
    'countries.index': { paramsTuple?: []; params?: {} }
    'countries.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'tracks.index': { paramsTuple?: []; params?: {} }
    'tracks.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'user.me': { paramsTuple?: []; params?: {} }
    'vehicles.index': { paramsTuple?: []; params?: {} }
    'vehicles.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'trackdays.index': { paramsTuple?: []; params?: {} }
    'trackdays.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'maintenances.index': { paramsTuple?: []; params?: {} }
    'maintenances.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin_users.index': { paramsTuple?: []; params?: {} }
    'admin_users.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'vehicles.store': { paramsTuple?: []; params?: {} }
    'trackdays.store': { paramsTuple?: []; params?: {} }
    'maintenances.store': { paramsTuple?: []; params?: {} }
    'tracks.store': { paramsTuple?: []; params?: {} }
    'countries.store': { paramsTuple?: []; params?: {} }
    'mailer.send': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'user.update': { paramsTuple?: []; params?: {} }
    'vehicles.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'trackdays.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'maintenances.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'tracks.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'countries.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin_users.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
  }
  DELETE: {
    'user.delete': { paramsTuple?: []; params?: {} }
    'vehicles.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'trackdays.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'maintenances.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'tracks.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'countries.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin_users.destroy': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
  }
  PATCH: {
    'vehicles.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'trackdays.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'maintenances.update': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}