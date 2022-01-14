import {Router} from 'express';

const router = Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {
  res.render('index', {title: 'Express'});
});

module.exports = router;
