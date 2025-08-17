import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

global.express = express
global.app = express()
