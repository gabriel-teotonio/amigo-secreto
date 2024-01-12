import { Router } from "express";
import * as events from '../controllers/events'
import * as people from '../controllers/people'

const router = Router()

router.get("/events/:id", events.getEvent)
router.get("/events/:id_event/search", people.searchPerson)

export default router