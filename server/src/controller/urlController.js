import Url from '../models/urlModel.js';
import shortid from 'shortid';

export const checkUrlCode = async (req, res) => {
    try {
        const urlCode = req.body.urlCode;
        const url = await Url.findOne({urlCode});
        if(url){
            res.status(200).json({status: false, message: 'Url code is already in use, Try another one.'})
        }else {
            res.status(200).json({status: true});
        }
    } catch (error) {
        return res.status(500).json({status: false,  message:`Internal Server Error: ${error.message}` })
    }
}

 export const createShortUrl = async (req, res) => {
    try {
        if( Object.keys(req.body).length === 0) return res.status(400).json({stauts: false, message: 'enter the data in body'});

        const {longUrl, urlCode} = req.body;

        if(!longUrl || !urlCode) {
            return res.status(400).json({status: false, message: 'Provide the complete details' });
        }

        let url = await Url.findOne({longUrl})
        if(url) {
            return res.status(200).json({status: true, message: 'Short url already created', data: url})
        }else {
            
       // if longurl is not present
       const baseUrl = 'http://localhost:5000';
       const shortUrl = baseUrl +'/'+ urlCode;

        const data = {
            urlCode : urlCode,
            longUrl : longUrl,
            shortUrl : shortUrl
        }

        const newDoc = await Url.create(data)
        const urlDoc = { urlCode : newDoc.urlCode,longUrl:newDoc.longUrl,shortUrl:newDoc.shortUrl}
        return res.status(201).json({status:true,data:urlDoc, message: 'Short Url created'})
        }
        
    } catch (error) {
        return res.status(500).json({status: false, message:`Internal Server Error: ${error.message}`});
    }
}

export const redirect = async(req, res) => {
    try {
        let urlCode = req.params.urlCode;
        if(!shortid.isValid(urlCode)) return res.stauts(400).json({status: false, message:'Bad request'})        

        const url = await Url.findOne({urlCode});
        if(!url) return res.status(404).json({status: false, message: `No Url is present for this ${urlCode}`})
        return res.redirect(url.longUrl);

    } catch (error) {
        return res.status(500).send({status: false, message: `Internal Server Error: ${error.message}`})
    }
}