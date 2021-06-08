import {Router} from 'express'

import * as videoController from './videos.controller'
const router=Router();


router.get('/videos',videoController.getVideos)

router.get('/videos/:id',videoController.getVideo)


router.post('/videos',videoController.createVideo)

router.delete('/videos/:id',videoController.deleteVideos)

router.put('/videos/:id',videoController.updateVideos)


export default router;