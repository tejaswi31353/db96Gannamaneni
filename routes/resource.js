var express = require('express'); 
var router = express.Router(); 
 
// Require controller modules. 
var api_controller = require('../controllers/api'); 
var nespresso_controller = require('../controllers/nespresso'); 
 
/// API ROUTE /// 
 
// GET resources base. 
router.get('/resource', api_controller.api); 
 
/// nespresso ROUTES /// 
 
// POST request for creating a nespresso.  
router.post('/resource/nespressos', nespresso_controller.nespresso_create_post); 
 
// DELETE request to delete nespresso. 
router.delete('/resource/nespressos/:id', nespresso_controller.nespresso_delete); 
 
// PUT request to update nespresso. 
router.put('/resource/nespressos/:id', 
nespresso_controller.nespresso_update_put); 
 
// GET request for one nespresso. 
router.get('/resource/nespressos/:id', nespresso_controller.nespresso_detail); 
 
// GET request for list of all nespresso items. 
router.get('/resource/nespressos', nespresso_controller.nespresso_list); 
 
module.exports = router;