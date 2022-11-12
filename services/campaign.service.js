const Campaign = require('../models/campaign.model');

async function add(data) {
    try {
        const campaign = new Campaign({data});
        await campaign.save();
    }
    catch(err) {
        throw new Error(err.message);
    }
}

async function update(id, data) {
    try {
        const campaign = await Campaign.findOneAndUpdate({_id:id}, {status:data})
        if(!campaign) 
            throw new Error(`Campaign with id:${id} not found`)
    }
    catch(err) {
        throw new Error(err.message);
    }
}

async function _delete(id) {
    try{
        await Campaign.findOneAndDelete(id)
    }
    catch(err) {
        throw new Error(err.message);
    }
}

async function getAll(platform, n) {
    try {
        const campaigns = await Campaign.find((typeof platform === 'undefined')?{}:{platform}, (typeof n === 'undefined')?{}:{
            dateEnd: 
            {
                $gte: new Date((new Date().getTime() - (n * 24 * 60 * 60 * 1000)))
            }
        }).populate('Product')
        if(campaigns.length===0) {
            throw new Error('No Campaign Found')
        }
        return campaigns;
    }
    catch(err) {
        throw new Error(err.message)
    }
}


module.exports = {
    add,
    update,
    _delete,
    getAll
};