var nespresso = require('../models/nespresso'); 
 
// List of all nespressos 
exports.nespresso_list = function(req, res) { 
    res.send('NOT IMPLEMENTED: nespresso list'); 
}; 
 
// for a specific nespresso. 
exports.nespresso_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: nespresso detail: ' + req.params.id); 
}; 
 
// Handle nespresso create on POST. 
exports.nespresso_create_post = function(req, res) { 
    res.send('NOT IMPLEMENTED: nespresso create POST'); 
}; 
 
// Handle nespresso delete form on DELETE. 
exports.nespresso_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: nespresso delete DELETE ' + req.params.id); 
}; 
 
// Handle nespresso update form on PUT. 
exports.nespresso_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: nespresso update PUT' + req.params.id); 
}; 

// List of all nespressos 
exports.nespresso_list = async function(req, res) { 
    try{ 
        thenespressos = await nespresso.find(); 
        res.send(thenespressos); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// VIEWS 
// Handle a show all view 
exports.nespresso_view_all_Page = async function(req, res) { 
    try{ 
        thenespressos = await nespresso.find(); 
        res.render('nespresso', { title: 'nespresso Search Results', results: thenespressos }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// Handle nespresso create on POST. 
exports.nespresso_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new nespresso(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"nespresso_type":"goat", "cost":12, "cost":"large"} 
    document.nespresso_type = req.body.nespresso_type; 
    document.cost = req.body.cost; 
    document.price = req.body.price; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// for a specific nespresso. 
exports.nespresso_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await nespresso.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 

// Handle nespresso update form on PUT. 
exports.nespresso_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await nespresso.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.nespresso_type)  
               toUpdate.nespresso_type = req.body.nespresso_type; 
        if(req.body.country) toUpdate.country = req.body.country; 
        if(req.body.cost) toUpdate.cost = req.body.cost; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 

// Handle nespresso delete on DELETE. 
exports.nespresso_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await nespresso.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
}; 
 
 
 // Handle a show one view with id specified by query 
 exports.nespresso_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await nespresso.findById( req.query.id) 
        res.render('nespressodetail',  
{ title: 'nespresso Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for creating a nespresso. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.nespresso_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('nespressocreate', { title: 'nespresso Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for updating a nespresso. 
// query provides the id 
exports.nespresso_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await nespresso.findById(req.query.id) 
        res.render('nespressoupdate', { title: 'nespresso Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle a delete one view with id from query 
exports.nespresso_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await nespresso.findById(req.query.id) 
        res.render('nespressodelete', { title: 'nespresso Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
};