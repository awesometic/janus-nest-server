import {Router} from 'express';

const router = Router();

/* GET users listing. */
router.get('/', function(req: any, res: any, next: any) {
  res.send('respond with a resource');
});

module.exports = router;
