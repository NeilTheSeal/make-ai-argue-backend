import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

console.log(process.env)

global.express = express
global.app = express()
