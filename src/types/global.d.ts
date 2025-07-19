import type _express from 'express'
import type { Express } from 'express'

declare global {
  // eslint-disable-next-line vars-on-top
  var app: Express
  // eslint-disable-next-line vars-on-top
  var express: typeof _express
}

export {}
