const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const multer = require('multer');
const upload = require('../middleware/upload'); // Import the Multer configuration

router.post('/:id/update', upload.single('photo'), async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send('Admin not found');

        admin.town = req.body.town || admin.town;
        admin.age = req.body.age || admin.age;
        admin.about= req.body.about||admin.about;

        if (req.file) {
            admin.photoUrl = `/uploads/${req.file.filename}`;
        }

        await admin.save();

        res.send(admin); // Send back the updated admin data
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/', async(req, res)=>{
    console.log(req);
    try{
        const admins = await Admin.find();
        res.json(admins);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const admin = await Admin.findById(req.params.id);
        res.json(admin);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/', async(req, res)=>{
    const { name, key, email, encryptionkey, about, password } = req.body;
    const admin = new Admin(
        {
            name , 
            key,
            email, 
            encryptionkey, 
            about, 
            password
        }
    )
    try{
        const newadmin = await admin.save();
        res.status(201).json(newadmin);
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

router.put('/:id', async(req, res)=>{
    try{
        const updateAdmin = await Admin.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json(updateAdmin);
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const response = await Admin.findByIdAndDelete(req.params.id);
        res.status(201).json(response);
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

router.post('/login', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    try{
        const response = await Admin.findOne({email});
        console.log(response);
        if(response){
            if(password === response.password){
                res.status(200).json({status: "success", response});
            }
            else{
                res.status(201).json({status: "incorrect password"});
            }
        } else{
            console.log("Pass");
            res.status(201).json({status: "admin not found"});
        }
    } catch{
        res.status(200).json({status: "error with login"});
    }
});

module.exports = router;