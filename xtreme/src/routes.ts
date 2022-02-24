import express from "express";
import Dig from "./dig";

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/:domain',  async function (req, res) {
    const domain = req.params['domain'];
    const dig = new Dig(domain);
    const dmark:string = await dig.getDMARC();
    const mx:string = await dig.getMX();
    console.log(mx);
    res.send({mx,dmark})
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds')
})

export default router
